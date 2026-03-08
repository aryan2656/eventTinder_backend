import { Request, Response } from "express";
import UserModel  from "../models/dao/user.model.js"
import { SignupRequest } from "../models/request/auth.requests.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthController {

    // Validate email and password 
    validateData = (userData: SignupRequest) : boolean  => {
        const { name, email, password, role } = userData

        // regex for email and password
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(email.match(emailRegex)){
            if(password.match(passwordRegex)){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
    
    // signup function is called whenever new user register 
    signup = async (userData: SignupRequest) => {

    const { name, email, password, role } = userData

    // First validates data like email and password
    if(this.validateData(userData)){
    try{
        
        // check for duplicate user in database
        const oldUser = await UserModel.findOne({email}) 

        console.log("Response from database: ", oldUser)
        // if yes, return and ask to log in
        if(oldUser) 
            return { status: 400, message: "Email is alredy in use!", success: false}

        // convert password into hash using bcrypt
        const saltRound = 10
        const hash = await bcrypt.hash(password,saltRound)

        // if not, then create a user with that email
        const createdUser = await UserModel.create({
            name:name, 
            email: email,
            password: hash, 
            role: role })

        return {
        status: 201,
        message: "User signup successful",
        data: {
            id: createdUser._id,
            name: name,
            email: email,
            role: role,
        },
        success: true
        }

    }catch(error : any){
        console.log("Error: ", error)
        return {
            status: 500,
            message: "Internal server error",
            success: false,
            error: error
        };
    }
    }else{
        return {
            status: 400,
            message: "Validation failed",
            success: false
        }
        }
    }

     // signIn method is called when user wants to access their account
    signIn = async (userData: SignupRequest) => {
        const {name, email, password, role} = userData

        // validate data
        if(this.validateData(userData)){
            try{

                // check user's existence in database
                const user = await UserModel.findOne({email}).select("+password");

                console.log("User: ", user)

                if(user){
                    // compare password
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        return { status: 401, success: false, message: "Invalid credentials" };
                    }

                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {expiresIn: '2h'})

                    console.log("ismatch: ", isMatch)

                    return {
                        status: 200,
                        success: true,
                        message: "Login successful",
                        data: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        },
                        token: token
                    }
                }else{
                    return {
                        status: 400,
                        success: false,
                        message: "User not found"
                    }
                }

            }catch(error){
                return { status: 500, success: false, message: "Internal server error" };
            }

        }else{
            return {
                status: 400,
                success: false,
                message: "Validation failed"
            }
        }

    }
}  

const authController = new AuthController();
export default authController