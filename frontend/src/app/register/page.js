'use client'
import {useState} from "react";
import Link from "next/link";

export default function Register(){
    const [name, setname] = useState("");
    const [email, setemail]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfim] = useState("");

    const registerHandler = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username:name,email, password}),
            });


            const data = await response.json();
            if(!response.ok){
                alert(data.message || "Registration Failed");
                return;
            }

            localStorage.setItem("token", data.token);
            alert("Registered successfully. Token saved!");

        }catch(error){
            console.log(error);
            alert("Internal Server Error");
        }

    };
    return(
        <div>
            <h2> Register </h2>

            <form onSubmit={registerHandler}>

                <label htmlFor="name"> Full Name:</label> <br /> 
                <input 
                type="text" 
                id="name" 
                value = {name}
                onChange={(e) => setname(e.target.value)}
                required 
                /> <br /><br />

                <label htmlFor="email"> Email: </label><br />
                <input type="text"
                 id="email" 
                 value = {email}
                 onChange={(e) => setemail(e.target.value)}
                 required 
                 /> <br /><br />

                <label htmlFor="password"> password: </label><br />
                <input type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                /> <br /><br />

                <label htmlFor="confirmPassword">Confirm Password:</label><br />
                <input type="password"
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfim(e.target.value)}
                required 
                /><br /><br />
                 
                <button type ="submit">Register</button>

            </form>
            <p>
                Already have an account? <Link href="/login">Login</Link>
            </p>


            
        </div>
    )
}