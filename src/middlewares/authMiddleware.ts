import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface JwtPayloadWithUserId {
    userId: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({error: 'Access denied'});

    // Extract token after "Bearer"
    // const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({error: 'No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadWithUserId;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export default verifyToken