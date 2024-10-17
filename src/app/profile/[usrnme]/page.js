"use client";

import { useState, useEffect } from 'react';
import axios from "axios";
import logo from '../../image/anymsg.png';
import './pagestyle.css';
import { useRouter } from 'next/navigation';

const Messageboxuser = ({username}) => {
    const router = useRouter();
    const [yourmessage,setmssg] = useState('');

    const sendMsg = async ()=>{
        const response = await axios.post('/api/users/addmessage',{mymessage:yourmessage,username:username});
        if(response){
            alert("your message sent successfully!");
            window.location.reload();
        }
    }

    return (
        <>
        
            <div style={{width:"100%",backgroundColor:"aquamarine",height:"100px"}}>
                <img src={logo.src} alt='logo image'  width={100} height={100}/>
            </div>

            <h1 style={{textAlign:"center",margin:"15px"}}>Sending message to : {username}</h1>

            <div className='container'>
                <div>
                    <input type='text' maxLength={70} required placeholder='type your message here' className='input-message' onChange={(e)=>setmssg(e.target.value)}/>
                </div>
                <button className='send-the-mssg' onClick={sendMsg}>Send ...</button>
            </div>
            <h1>Below is your mssg. Please check!</h1>
            <h2>{yourmessage}</h2>
        </>
    );
};

const Notfound = ({ username }) => {
    return (
        <>
            <h1>No User Found With : {username}</h1>
        </>
    );
};

const UserProfile = ({ params }) => {
    const [isUserFound, setIsUserFound] = useState(null); 

    useEffect(() => {
        const checkUserProfile = async () => {
            try {
                const response = await axios.post('/api/users/username', { username: params.usrnme });
                if (response.data) {
                    setIsUserFound(true);
                } else {
                    setIsUserFound(false);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setIsUserFound(false);
            }
        };

        checkUserProfile();
    }, [params.usrnme]);

    if (isUserFound === null) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {isUserFound ? <Messageboxuser username={params.usrnme}/> : <Notfound username={params.usrnme} />}
        </>
    );
};

export default UserProfile;
