export interface SignupResponse {
    userId: string;
    name: string;
    email: string;
    role: "student" | "recruiter";
    token?: string;
}