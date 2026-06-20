import { unique } from "drizzle-orm/gel-core";
import { timestamp } from "drizzle-orm/mysql-core";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkID:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type:String,
        required: true,
    },
    profilePic: {
        type:String,
        default:"",
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema)

export default User;