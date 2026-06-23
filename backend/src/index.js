import dns from "node:dns";
// Force Node.js to use public DNS servers. This bypasses the querySrv ECONNREFUSED bug entirely!
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import job from "./lib/cron.js"; // ⚠️ Make sure the file path matches your project structure!


import clerkWebhook from "./webhooks/clerk.webhooks.js"
import authRoutes from "./routes/auth.route.js"

import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express";

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use("/api/webhooks/clerk", express.raw({type:"application/json"}),clerkWebhook)

app.use(express.json())
app.use(cors({origin:FRONTEND_URL, credentials:true}))
app.use(clerkMiddleware());

app.get("/health", (req,res) => {
    res.status(200).json({ok: true});
});

app.use("/api/auth", authRoutes)

// if the public directory exists, serve the static files

if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))

    app.get("/{*any}", (req,res,next) =>{
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    })
}


app.listen(PORT, () => {
    connectDB();
    console.log("Server is up and running on PORT:", PORT);

    if(process.env.NODE_ENV === "production")
        job.start();
});