import mongoose from "mongoose"
import {Schema, Document }  from "mongoose"

export type Role = 'student' | 'recruiter'

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    interests?: string[];
    goals?: string[];
    profileCompleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    vector?: number[];
}

const userSchema = new Schema<IUser>({
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
    vector: {
        type: [Number],
        default: [],
        required: false
    }
}, {
        timestamps: true
    })

const UserModel = mongoose.model<IUser>("User", userSchema)   

export default UserModel

