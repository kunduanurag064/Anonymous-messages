"use client"
import { useRouter } from 'next/navigation';
import logo from './image/anymsg.png';
import settinglogo from './image/setting logo.png';
import deletelogo from './image/delete.png';
import Link from 'next/link';
import React, { useState,useEffect} from 'react';
import './pagestyle.css';
import axios from "axios";
import toast from 'react-hot-toast';


export default function Home() {


  const [msgdata,setmsgdata] = useState([]);
  const [theme,settheme] = useState('dark-theme');
  const router = useRouter();

  const deleteMsgItem = async (data)=>{
    //console.log(localStorage.getItem('userid'));
    await axios.post('/api/users/deletemssg',{myid:localStorage.getItem('userid'),msgid:data._id});
    fetchData();
  }

  const LogOut = async ()=>{
    const responsedata = await axios.get('api/users/logout');
        //console.log(responsedata);
        toast.success("logout successful!");
        router.push("login");

  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const changeTheme = ()=>{
    if(theme==='dark-theme'){
      settheme('light-theme');

    }
    else{
      settheme('dark-theme');
    }
  }

  const fetchData = async ()=>{
    const response = await axios.post('/api/users/getmessage',{_id:localStorage.getItem('userid')});
    setmsgdata(response.data.mssgdata);
    // console.log(msgdata);
  }


  useEffect(()=>{
  },[theme])

  return (
    <>

    <div className="logodiv">
      <Link href="/">
        <img
              src={logo.src}
              alt="web logo" width="150px" height="100px"
        />
      </Link>
      <div style={{float:"right",margin:"10px"}}>
      <img
              src={settinglogo.src}
              alt="setting" height="50" width={50} style={{cursor:"pointer"}}
              className="settings-logo" onClick={toggleMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="options-menu">
          <ul>
            <li><Link href="/">Profile</Link></li>
            <li><a onClick={changeTheme}>{theme}</a></li>
            <li><a onClick={LogOut}>Logout</a></li>
          </ul>
        </div>
      )}
    </div>
    
        <div style={{color:"mediumseagreen",marginTop:"50px",marginBottom:"50px"}}>
          <center><h1>Fetch messages</h1></center>
        </div>
        <div className='fetch-button'>
          <button className='fetch-button1' onClick={fetchData}>fetch</button>
        </div>

        {msgdata.length<1 ? <h1>No Messages Yet!</h1>:""}
        <div className='my-messages'>
          {msgdata.map((data, index) => (
          <div key={index} className='item'>
            <div >{data.text}</div>
            <div style={{margin:"6px",padding:"5px",backgroundColor:"whitesmoke"}}>Mssg Date: {data.timestamp.slice(0, 10)}</div> 
            <div style={{bottom:"0",right:"0",position:"relative"}}><img src={deletelogo.src}
            width={25} height={25} style={{backgroundColor:"red",cursor:"pointer"}} onClick={()=>deleteMsgItem(data)}/></div>
          </div>
          ))}
        </div>


    </>
  );
}
