import express from "express";
import User from "../models/user.model.js";
import { verifyWebhook } from "@clerk/backend/webhooks";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!signingSecret) {
      res.status(503).json({ message: "Webhook secret is not provided" });
      return;
    }

    // 1. Get the raw payload exactly as it arrived
    const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body);
    
    // 2. Extract the exact Svix headers Clerk requires
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // 3. Verify the webhook with the raw payload and headers
    const evt = await verifyWebhook(payload, headers, { signingSecret });
    
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const u = evt.data;

      const email = 
        u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ??
        u.email_addresses?.[0]?.email_address;

      const fullName = 
        [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email?.split("@")[0];

      // 4. Updated to 'clerkID' to match your exact Mongoose Schema
      await User.findOneAndUpdate(
        { clerkID: u.id }, 
        { clerkID: u.id, email, fullName, profilePic: u.image_url },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    }

    if (evt.type === "user.deleted") {
      // 5. Updated to 'clerkID' here too
      if (evt.data.id) await User.findOneAndDelete({ clerkID: evt.data.id });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error in Clerk webhook:", error);
    res.status(400).json({ message: "Webhook verification failed" });
  }
});

export default router;