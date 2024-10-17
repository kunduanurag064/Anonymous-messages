import { NextResponse } from "next/server";
import User from "@/Database schemas/user";

export async function POST(req){
    const reqBody = await req.json();
    const {myid,msgid} = reqBody;
    console.log(myid+" "+msgid);
    const result = await User.updateOne(
        { _id: myid },
        { $pull: { messages: { _id: msgid } } }
      );
  
      if (result) {
        console.log('message removed successfully.');
        return NextResponse.json({message:"message deleted"},{status:200});
      } else {
        console.log('No message found with that ID.');
        return NextResponse.json({message:"message not deleted"},{status:400});
      }


}