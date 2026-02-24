'use client'
import {useState} from "react";
export default  function Login(){
    const [email, setemail]= useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/auth/login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email, password}),
            });
            const data = await response.json();
            if(!response.ok){
                alert(data.message || "login Failed");
                return;
            }
            localStorage.setItem("token", data.token);
            alert("Login Successfully Token Saved")
        }catch(error){
            console.log(error);
            alert("Internal server error");
        }
    }
       return(
        <div>
            <h2> Login </h2>

            <form onSubmit={loginHandler} >

                <label htmlFor="email"> Email: </label><br />
                <input type="text" 
                id="email" 
                value ={email}
                onChange={(e) => setemail(e.target.value)} 
                required /> <br /><br />

                <label htmlFor="password"> password: </label><br />
                <input type="password" 
                id="password" 
                value ={password}
                onChange={(e) =>setPassword(e.target.value)} 
                required /> <br /><br />

                 
                <button type ="submit">Login </button>

            </form>
               
        </div>
    )
}