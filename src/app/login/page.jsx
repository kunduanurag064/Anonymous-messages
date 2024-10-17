"use client"
import './login.css';
import React from 'react';
import Link from 'next/link';
import Signup from '../signup/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';



function Login() {

    const router = useRouter();
    const loginaction = async (e)=>{
        e.preventDefault;
        try {
            const usersigndata = await axios.post("api/users/login",user);
            localStorage.setItem('userid',usersigndata.data.id);
            router.push("/");
            
        } catch (error) {
            console.log(error+"here is some errors in login page");
        }
    }

    const [user,setuser] = React.useState({
        email:'',
        password:''
    })


    return (
        <>
            <div className="container">
                <div className="logincontainer">
                    <h1 style={{textAlign:"center",color:"GrayText",padding:"15px"}}>Login</h1>

                    <div className='inputlogin'>
                        <form action={loginaction} >
                        <label htmlFor="email">Email Address : </label>
                        <input type='email' value={user.email} required placeholder='email address' 
                        onChange={(e)=>setuser({...user,email:e.target.value})} className='inputclass'/>

                        <br/><br/>

                        <label htmlFor="password">Password : </label>
                        <input type='password' value={user.password} required placeholder='password' 
                        onChange={(e)=>setuser({...user,password:e.target.value})} className='inputclass'/>
                        <input type='submit' className='submitbutton'/>
                        </form>
                    </div>

                    <p className='footerlogin'>forget password? <Link href="/">click here</Link></p>

                    <div className='footerlogin'>
                        Don't have an account? <Link href="/signup">create One</Link>
                    </div>

                </div>
            </div>
        </>
    );

}


export default Login;