import mongoose from "mongoose";
import { Document } from "mongoose";
export type Role = 'student' | 'recruiter';
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
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map