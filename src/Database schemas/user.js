import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"provide email"],
        unique:true
    },
    username:{
        type:String,
        required:[true,"provide unique username"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"provide password"],
    },
    messages: [
        {
          text: { 
            type: String, 
            required: true 
          },
          timestamp: { 
            type: Date, 
            default: Date.now 
          }
        }
      ]
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;