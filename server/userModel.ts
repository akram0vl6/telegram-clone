import mongoose, { connections } from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    imageId: String,
    email: { type: String, unique: true },
    // password: {type: String, require: true},
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            _id: String,
            message: String,
            sender: String,
            reciver: String,
            time:Date,
            status: String
        }
    ]
})

export const User = mongoose.model("User", userSchema, "chatgram_users");