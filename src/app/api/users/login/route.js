import ConnectDB from "@/Database/DBconnection";
import { NextResponse } from "next/server";
import User from "@/Database schemas/user";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
require('dotenv').config();

ConnectDB();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"email not found"},{status:400});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Either password or email address is wrong." }, { status: 400 });
        }

        const tokendata  = {
            email:email,
            username:user.username
        }
        // Create token
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY , { expiresIn: "1hr" });

        // Set the cookie
        const response = NextResponse.json({ message: "Login successful",id:user._id});
        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error) {
        console.log("error in login server"+error);
    }
}