// pages/login.js
"use client";
import { useState } from "react";
import { loginUser } from "@/fetching/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(email, password);
            console.log(res);
            localStorage.setItem("token", res.token);
            router.push("/");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <div className="w-full max-w-xs p-5 mx-auto mt-5 bg-gray-600 rounded-lg shadow-xl">
                <h1 className="text-3xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label htmlFor="email" className="block text-gray-300">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3 bg-gray-700 text-gray-200"
                        />
                        <label
                            htmlFor="password"
                            className="block text-gray-300"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="border rounded-md w-full py-2 px-3 bg-gray-700 text-gray-200"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full hover:from-blue-500 hover:to-blue-700 focus:ring-blue-400 focus:ring-2 focus:outline-none focus:border-blue-400"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>
        </div>
    );
}
