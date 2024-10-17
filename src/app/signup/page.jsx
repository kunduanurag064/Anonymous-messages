"use client"
import './signup.css';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = ()=> {

    const router = useRouter();

    const signupaction = async () =>{
        var pass = user.password;
        pass = pass.replace(/\s+/g, '');
        if(pass.length<6){
            alert("password length must be equal or greater than 6");
            return ;
        }

        var usern = user.username;
        usern = usern.replace(/\s+/g, '');
        if(usern.length<2){
            alert("user another username");
            return ;
        }
        try {
            const usersigndata = await axios.post("api/users/signup",user);
            console.log(usersigndata);
            router.push("login");
        } catch (error) {
            
        }
        

    }

    const [user,setuser] = React.useState({
        email:'',
        password:'',
        username:''
    })

    return (
        <>
            <div className="container">
                <div className="logincontainer">
                    <h1 style={{textAlign:"center",color:"GrayText",padding:"15px"}}>Signup</h1>

                    <div className='inputlogin'>
                        <form action={signupaction} >
                        <label htmlFor="email">Email Address : </label>
                        <input type='email' value={user.email} required placeholder='email address' 
                        onChange={(e)=>setuser({...user,email:e.target.value})} className='inputclass'/>

                        <br/><br/>

                        <label htmlFor="username">Username : </label>
                        <input type='text' value={user.username} required placeholder='username' 
                        onChange={(e)=>setuser({...user,username:e.target.value})} className='inputclass'/>

                        <br/><br/>

                        <label htmlFor="password">Password : </label>
                        <input type='password' value={user.password} required placeholder='password' 
                        onChange={(e)=>setuser({...user,password:e.target.value})} className='inputclass'/>

                        <input type='submit' className='submitbutton'/>
                        </form>
                    </div>

                    <div className='footerlogin'>
                        Already have an account? <Link href="/login">Login here</Link>
                    </div>

                </div>
            </div>
        </>
    );

}


export default Signup;