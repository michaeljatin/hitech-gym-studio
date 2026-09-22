"use client";

import Link from "next/link";
import { Dumbbell, Clock, MapPin, Phone, Mail, Globe, Share2, AtSign } from "lucide-react";
import SupplementDashboard from "../components/SupplementDashboard"; // Corrected relative path

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-black">
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Dumbbell className="h-8 w-8 text-emerald-400" />
                        <span className="text-xl font-bold tracking-wider uppercase">Hitech Gym Studio</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                        <Link href="#" className="hover:text-emerald-400 transition">Home</Link>
                        <Link href="#membership" className="hover:text-emerald-400 transition">Membership</Link>
                        <Link href="#gallery" className="hover:text-emerald-400 transition">Gallery</Link>
                        <Link href="#supplements" className="bg-emerald-500 text-black px-4 py-2 rounded font-bold hover:bg-emerald-400 transition">
                            Supplement Store
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center px-4 pt-20">
                <div className="absolute inset-0 bg-[url('/gym-1.jpg')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">Welcome to Hitech Gym Studio</p>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                        Transform Your Body <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">At Hitech Gym Studio</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Heavy strength training, cardio, and expert coaching under one roof in Kishkindha.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button className="bg-white text-black font-bold px-8 py-4 uppercase tracking-widest hover:bg-zinc-200 transition">Book Free Trial</button>
                        <button className="border border-zinc-700 text-white font-bold px-8 py-4 uppercase tracking-widest hover:bg-zinc-900 transition">Watch Tour Video</button>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-24 bg-zinc-950 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2">Take A Look Inside</p>
                        <h2 className="text-4xl font-black uppercase tracking-tight">Studio Gallery</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {["gym-1.jpg", "gym-2.jpg", "gym-3.jpg", "gym-4.jpg", "gym-5.jpg", "gym-6.jpg", "gym-7.jpg"].map((img, i) => (
                            <div key={i} className="relative group overflow-hidden h-64">
                                <img src={`/${img}`} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Section */}
            <section id="membership" className="py-24 bg-black px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2">Membership Packages</p>
                        <h2 className="text-4xl font-black uppercase tracking-tight">Choose Your Plan</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="border border-zinc-800 p-8 space-y-6 hover:border-emerald-500 transition">
                            <h3 className="text-xl font-bold uppercase">Strength Plan</h3>
                            <div className="text-4xl font-black">₹1,200<span className="text-sm text-zinc-500 font-normal">/month</span></div>
                            <button className="w-full border border-zinc-700 py-3 uppercase text-sm font-bold hover:bg-zinc-900 transition">Join Monthly</button>
                        </div>
                        <div className="border-2 border-emerald-500 p-8 space-y-6 relative bg-zinc-950">
                            <h3 className="text-xl font-bold uppercase text-emerald-400">Optimal Plan</h3>
                            <div className="text-4xl font-black">₹3,200<span className="text-sm text-zinc-500 font-normal">/3 months</span></div>
                            <button className="w-full bg-emerald-500 text-black py-3 uppercase text-sm font-bold hover:bg-emerald-400 transition">Join Quarterly</button>
                        </div>
                        <div className="border border-zinc-800 p-8 space-y-6 hover:border-emerald-500 transition">
                            <h3 className="text-xl font-bold uppercase">Beast Mode</h3>
                            <div className="text-4xl font-black">₹6,000<span className="text-sm text-zinc-500 font-normal">/6 months</span></div>
                            <button className="w-full border border-zinc-700 py-3 uppercase text-sm font-bold hover:bg-zinc-900 transition">Join Half-Yearly</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gym Capacity Section */}
            <section className="py-24 bg-zinc-950 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Gym Capacity: <span className="text-emerald-400">Normal (Spacious)</span></h2>
                    <div className="flex items-end justify-center gap-4 h-48 mt-12">
                        {[30, 45, 60, 40, 35, 55, 70, 50].map((height, i) => (
                            <div key={i} className="w-12 bg-zinc-800 relative">
                                <div className="absolute bottom-0 w-full bg-emerald-500" style={{ height: `${height}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= SUPPLEMENT DASHBOARD SECTION ================= */}
            <section id="supplements" className="py-24 bg-black px-6 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2">Inventory Management</p>
                        <h2 className="text-4xl font-black uppercase tracking-tight">Supplement Stack Command Center</h2>
                    </div>
                    <SupplementDashboard />
                </div>
            </section>
            {/* ================================================================= */}

            {/* Footer */}<SupplementDashboard />
            <footer className="bg-black border-t border-zinc-800 py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-6 w-6 text-emerald-400" />
                            <span className="text-lg font-bold tracking-wider uppercase">Hitech Gym Studio</span>
                        </div>
                        <p className="text-zinc-500 text-sm">Kishkindha's premier strength facility.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-wider text-sm">Opening Hours</h4>
                        <div className="text-zinc-500 text-sm space-y-2">
                            <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon - Sat: 6:00 AM - 10:00 PM</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-wider text-sm">Location & Contact</h4>
                        <div className="text-zinc-500 text-sm space-y-2">
                            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Fitness Street, Kishkindha</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600">
                    <p>© 2026 Hitech Gym Studio. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Globe className="h-4 w-4 hover:text-emerald-400 cursor-pointer" />
                        <Share2 className="h-4 w-4 hover:text-emerald-400 cursor-pointer" />
                        <AtSign className="h-4 w-4 hover:text-emerald-400 cursor-pointer" />
                    </div>
                </div>
            </footer>
        </div>
    );
}