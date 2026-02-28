import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "recruiter"]
    },
    interests: {
        type: [String],
        default: []
    },
    goals: {
        type: [String],
        default: []
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map