"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, ArrowLeft, Lock, Mail, User } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", name || "Member");
        if (email.includes("owner")) {
            localStorage.setItem("userRole", "owner");
        } else {
            localStorage.setItem("userRole", "member");
        }
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#0f1012] text-zinc-100 flex flex-col justify-center items-center p-6">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 relative">
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-6 left-6 text-zinc-400 hover:text-white flex items-center gap-1 text-xs uppercase tracking-wider"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </button>

                <div className="text-center mt-6 mb-8">
                    <Dumbbell className="h-10 w-10 text-white mx-auto mb-3" />
                    <h1 className="text-2xl font-black uppercase tracking-wider text-white">Hitech Gym Studio</h1>
                    <p className="text-xs text-zinc-400 mt-1">Member & Owner Portal Login</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Your Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 text-xs text-white focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                            <input
                                type="email"
                                placeholder="owner@hitech.com (for owner dashboard)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 text-xs text-white focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 text-xs text-white focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition mt-2"
                    >
                        Login to Account
                    </button>
                </form>

                <p className="text-[11px] text-zinc-500 text-center mt-6">
                    Tip: Use <strong className="text-zinc-300">owner@hitech.com</strong> to unlock the Supplement Inventory & Owner Admin Panel.
                </p>
            </div>
        </div>
    );
}
