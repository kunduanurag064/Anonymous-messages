import User from "@/Database schemas/user";
import ConnectDB from "@/Database/DBconnection";
import { NextResponse } from "next/server";

ConnectDB();


export async function POST(req){
    try {
        const reqBody = await req.json();
        const {username,mymessage} = reqBody;
        const user = await User.findOneAndUpdate(
            { username: username },
            { 
              $push: { 
                messages: { text: mymessage} 
              } 
            },
            { new: true }
          );
      
          if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
          }
      
          return NextResponse.json({ message: "Message added", user }, { status: 200 });

    } catch (error) {
        console.log("error in add message server"+error);
        return NextResponse.json({message:"error in adding mssg"},{status:400});
    }
}