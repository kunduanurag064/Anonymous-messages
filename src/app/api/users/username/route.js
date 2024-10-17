import { NextResponse } from "next/server";
import User from "@/Database schemas/user";

export async function POST(req) {
    try {
        const reqBody = await req.json(); 
        const { username } = reqBody; 
        
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 }); 
        }
        
        return NextResponse.json({ message: "User found" }, { status: 200 }); 

    } catch (error) {
        console.error("Error in finding user at /profile/username: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 }); 
    }
}
