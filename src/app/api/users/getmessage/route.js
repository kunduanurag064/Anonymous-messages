import { NextResponse } from "next/server";
import User from "@/Database schemas/user";

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {_id} = reqBody;
        const user = await User.findOne({_id});
        if(user){
            return NextResponse.json({mssgdata:user.messages});
        }

        return NextResponse.json({message:"user not in database"},{status:400});
        } catch (error) {
        console.log("error in getting messages from the database"+error);
    }
}