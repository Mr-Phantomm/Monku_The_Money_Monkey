'use client'
import { useState } from "react";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const loginHandler = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email,password}),
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.msg||"Login Failed ");
                return;
            }
            localStorage.setItem("token",data.token);
            // cookie Implementation left 
            alert(" Login Successful Token Saved ")
            setEmail('');
            setPassword('');

        }catch(err){
            console.log(err);
            alert("Internal Server error");
        }
    }

    return(
    <div>
        <form onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
        </form>
    </div>
    )
}