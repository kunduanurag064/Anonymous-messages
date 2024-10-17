import ConnectDB from "@/Database/DBconnection";
import User from "@/Database schemas/user";
import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";


ConnectDB();

export async function POST(req,res){
    try {
        const reqBody = await req.json();
        const { email, username , password } = reqBody;

        const user = await User.findOne({email});
        if(user){
            console.log("email already there");
            return NextResponse.json({ error: "user already registered" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return NextResponse.json({ message: "User saved"},{status:200});

    } catch (error) {
        console.log("there is an error in signup post api server"+error);
    }
}