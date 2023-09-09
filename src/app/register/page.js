"use client";
import { useState } from "react";
import { createUser } from "@/fetching/register"; 
import { useRouter } from "next/navigation";

function RegistrationForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(name, email, password);
            setMessage("Pengguna berhasil dibuat.");
            router.push("/login");
        } catch (error) {
            setMessage("Gagal membuat pengguna.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <div className="w-full max-w-xs p-5 mx-auto mt-5 bg-gray-600 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold text-gray-200 mb-5">
                    Registrasi
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label htmlFor="name" className="block text-gray-300">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label htmlFor="email" className="block text-gray-300">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label
                            htmlFor="password"
                            className="block text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full hover:from-cyan-500 hover:to-cyan-700 focus:ring-cyan-400 focus:ring-2 focus:outline-none focus:border-cyan-400"
                        >
                            Daftar
                        </button>
                    </div>
                </form>
                {message && <p className="mt-2 text-green-500">{message}</p>}
            </div>
        </div>
    );
}

export default RegistrationForm;
