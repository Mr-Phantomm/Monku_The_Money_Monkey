'use client'
import { useState } from "react";
export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const RegisterHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.msg || "Registration Failed");
                return;
            }
            localStorage.getItem("token", data.token);
            setUserName('');
            setEEmail('');
            setPassword('');
            alert("Registration Completed");
        } catch (err) {
            console.log(err);
            alert("Internal Server Error");
        }
    }

    return (
        <div>
            <form onSubmit={RegisterHandler}>
                <label htmlFor="username" >UserName</label>
                <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}