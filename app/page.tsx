"use client";

import React, { useState, useEffect } from "react";
import { Dumbbell, Phone, MapPin, Clock, Play, X, Check, Users, TrendingUp, LogOut, User, QrCode, ScanLine, Printer, Package, Plus, Minus, ArrowRightLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GymLandingPage() {
    const router = useRouter();
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isTrialOpen, setIsTrialOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("member");
    const [scanStatus, setScanStatus] = useState<string | null>(null);
    const [checkInType, setCheckInType] = useState<"IN" | "OUT">("IN");

    // Add Supplement Modal State for Owner
    const [isAddSuppOpen, setIsAddSuppOpen] = useState(false);
    const [newSuppName, setNewSuppName] = useState("");
    const [newSuppCategory, setNewSuppCategory] = useState("Whey Protein");
    const [newSuppPrice, setNewSuppPrice] = useState("");
    const [newSuppStock, setNewSuppStock] = useState("");

    const [memberData, setMemberData] = useState({
        memberId: "HT-2026-098",
        membershipType: "Quarterly Pass (3 Mos)",
        daysAttended: 19,
        totalDays: 90,
        expiryDate: "15 Nov 2026",
        lastCheckIn: "Today, 6:45 AM (IN)",
    });

    // Supplement Stack Inventory State with Categories
    const [supplements, setSupplements] = useState([
        { id: 1, name: "Nakpro Whey Protein Isolate", category: "Whey Protein", stock: 12, price: "₹1,899", status: "In Stock" },
        { id: 2, name: "As-Is-It One Whey Protein", category: "Whey Protein", stock: 5, price: "₹1,650", status: "Low Stock" },
        { id: 3, name: "Creatine Monohydrate 250g", category: "Creatine", stock: 18, price: "₹899", status: "In Stock" },
        { id: 4, name: "Omega-3 Fish Oil Softgels", category: "Pre-Workouts", stock: 25, price: "₹650", status: "In Stock" },
    ]);

    const [liveAttendees, setLiveAttendees] = useState([
        { name: "Kakarlamudi Michael Jatin", time: "06:45 AM", type: "IN", status: "Inside Gym" },
        { name: "Rahul Sharma", time: "07:15 AM", type: "IN", status: "Inside Gym" },
        { name: "Priya Varma", time: "08:00 AM", type: "OUT", status: "Checked Out" },
    ]);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        const storedName = localStorage.getItem("userName");
        const storedRole = localStorage.getItem("userRole");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
            if (storedName) setUserName(storedName);
            if (storedRole) setUserRole(storedRole);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        setUserName("");
        setUserRole("member");
    };

    const simulateMasterQRScan = (type: "IN" | "OUT") => {
        setScanStatus(`Processing ${type} Scan...`);
        setTimeout(() => {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const currentName = userName || "Member";

            if (type === "IN") {
                setMemberData(prev => ({
                    ...prev,
                    daysAttended: prev.daysAttended + 1,
                    lastCheckIn: `Today, ${currentTime} (IN)`
                }));
            } else {
                setMemberData(prev => ({
                    ...prev,
                    lastCheckIn: `Today, ${currentTime} (OUT)`
                }));
            }

            setLiveAttendees(prev => [
                { name: currentName, time: currentTime, type: type, status: type === "IN" ? "Inside Gym" : "Checked Out" },
                ...prev
            ]);

            setScanStatus(`SUCCESS: ${type} Pass Registered! Owner & Dashboard Updated.`);
        }, 800);
    };

    const updateStock = (id: number, delta: number) => {
        setSupplements(prev => prev.map(item => {
            if (item.id === id) {
                const newStock = Math.max(0, item.stock + delta);
                return { ...item, stock: newStock, status: newStock < 5 ? "Low Stock" : "In Stock" };
            }
            return item;
        }));
    };

    const deleteSupplement = (id: number) => {
        setSupplements(prev => prev.filter(item => item.id !== id));
    };

    const handleAddSupplement = (e: React.FormEvent) => {
        e.preventDefault();
        const stockNum = parseInt(newSuppStock) || 10;
        const newEntry = {
            id: Date.now(),
            name: newSuppName,
            category: newSuppCategory,
            stock: stockNum,
            price: newSuppPrice.includes("₹") ? newSuppPrice : `₹${newSuppPrice}`,
            status: stockNum < 5 ? "Low Stock" : "In Stock"
        };
        setSupplements(prev => [...prev, newEntry]);
        setNewSuppName("");
        setNewSuppPrice("");
        setNewSuppStock("");
        setIsAddSuppOpen(false);
    };

    const currentlyInsideCount = liveAttendees.filter(a => {
        const latestForUser = liveAttendees.find(user => user.name === a.name);
        return latestForUser ? latestForUser.type === 'IN' : false;
    }).length;

    const isGymCrowded = currentlyInsideCount >= 5;

    const peakHours = [
        { time: "5 AM", busy: 30, status: "Normal" },
        { time: "6 AM", busy: 85, status: "Busy" },
        { time: "7 AM", busy: 95, status: "FULL 🔥" },
        { time: "8 AM", busy: 60, status: "Normal" },
        { time: "5 PM", busy: 50, status: "Normal" },
        { time: "6 PM", busy: 90, status: "Busy" },
        { time: "7 PM", busy: 100, status: "FULL 🔥" },
        { time: "8 PM", busy: 80, status: "Busy" },
    ];

    const galleryItems = [
        { id: "1", title: "Main Studio Entrance", img: "/gym-1.jpg" },
        { id: "2", title: "Heavy Dumbbell Station", img: "/gym-2.jpg" },
        { id: "3", title: "Strength & Power Racks", img: "/gym-3.jpg" },
        { id: "4", title: "Workout Floor Area", img: "/gym-4.jpg" },
        { id: "5", title: "Cardio & Leg Station", img: "/gym-5.jpg" },
        { id: "6", title: "Training Equipment", img: "/gym-6.jpg" },
        { id: "7", title: "Free Weights Zone", img: "/gym-7.jpg" },
    ];

    return (
        <div className="min-h-screen bg-[#0f1012] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">

            {/* Header */}
            <nav className="border-b border-zinc-800/80 bg-[#0f1012]/90 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                        <Dumbbell className="h-7 w-7 text-white group-hover:text-zinc-400 transition" />
                        <span className="font-black text-xl tracking-widest text-white uppercase group-hover:text-zinc-300 transition">
                            Hitech <span className="text-zinc-400 font-normal group-hover:text-zinc-500 transition">Gym Studio</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-zinc-300 flex items-center gap-1 uppercase tracking-wider font-mono bg-zinc-900 border border-zinc-800 px-3 py-2">
                                    <User className="h-3.5 w-3.5 text-zinc-400" /> {userName} ({userRole.toUpperCase()})
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest transition flex items-center gap-1.5"
                                >
                                    <LogOut className="h-3.5 w-3.5" /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsTrialOpen(true)}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest transition"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                        <a
                            href="tel:9949461105"
                            className="bg-zinc-100 hover:bg-white text-black font-bold px-5 py-2.5 rounded-none text-xs uppercase tracking-widest transition flex items-center gap-2"
                        >
                            <Phone className="h-4 w-4" /> Call Studio
                        </a>
                    </div>
                </div>
            </nav>

            {/* DASHBOARD */}
            {isLoggedIn && (
                <section className="bg-zinc-900/95 border-b border-zinc-800 py-10 px-6">
                    <div className="max-w-7xl mx-auto">
                        {userRole === "owner" ? (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-mono">Gym Owner Control Panel</span>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Master Admin Dashboard</h2>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-zinc-950 border border-zinc-800 text-xs px-3 py-1 font-mono text-emerald-400">
                                            Currently Inside: <strong>{currentlyInsideCount} Members</strong>
                                        </span>
                                        <span className="bg-red-950 border border-red-800 text-red-300 text-xs px-3 py-1 font-mono">Owner Mode</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center justify-between">
                                        <div>
                                            <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-1">Gym Entrance Master QR (In/Out)</span>
                                            <p className="text-[11px] text-zinc-500 mb-4">Print & paste at entrance. Members scan for In & Out passes.</p>
                                            <div className="bg-white p-4 inline-block shadow-xl border-4 border-zinc-900">
                                                <div className="w-40 h-40 bg-zinc-950 flex flex-col items-center justify-center text-white p-2">
                                                    <QrCode className="h-16 w-16 text-emerald-400 mb-2" />
                                                    <span className="text-[11px] font-mono font-bold tracking-wider">HITECH-IN-OUT-QR</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => window.print()} className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2">
                                            <Printer className="h-4 w-4" /> Print Master QR Code
                                        </button>
                                    </div>

                                    <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Users className="h-4 w-4 text-emerald-400" /> Live In/Out Attendance Feed ({liveAttendees.length})
                                        </h3>
                                        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                                            {liveAttendees.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 text-xs">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`h-2 w-2 rounded-full ${item.type === 'IN' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                                        <span className="font-bold text-white">{item.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 font-mono text-zinc-400">
                                                        <span>{item.time}</span>
                                                        <span className={`px-2 py-0.5 border ${item.type === 'IN' ? 'text-emerald-400 bg-emerald-950 border-emerald-900' : 'text-orange-400 bg-orange-950 border-orange-900'}`}>
                                                            {item.type} PASS
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* MEMBER PORTAL */
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-mono">Member Portal & Progress</span>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Welcome, {userName}! 🔥</h2>
                                    </div>
                                    <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 text-xs flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-zinc-300">ID: {memberData.memberId}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-3">Active Plan</span>
                                            <h3 className="text-lg font-bold text-white">{memberData.membershipType}</h3>
                                            <p className="text-xs text-zinc-500 mt-1">Valid till: {memberData.expiryDate}</p>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between text-xs">
                                            <span className="text-zinc-400">Fee Status:</span>
                                            <span className="text-emerald-400 font-bold uppercase">Paid (No Dues)</span>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-3">Attendance Progress</span>
                                            <h3 className="text-3xl font-black text-white">{memberData.daysAttended} <span className="text-xs font-normal text-zinc-500">/ {memberData.totalDays} Days</span></h3>
                                            <p className="text-xs text-zinc-400 mt-1">Last Action: {memberData.lastCheckIn}</p>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-zinc-900 text-xs text-emerald-400 font-mono">
                                            Status: Active Gym Member ✅
                                        </div>
                                    </div>

                                    {/* In / Out Pass Scanner Simulator */}
                                    <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center justify-between">
                                        <div>
                                            <span className="text-xs text-zinc-300 uppercase tracking-widest font-bold block mb-1">Scan Master Entrance QR</span>
                                            <p className="text-[11px] text-zinc-500 mb-3">Select IN when entering or OUT when leaving gym</p>

                                            <div className="flex gap-2 justify-center mb-3">
                                                <button
                                                    onClick={() => setCheckInType("IN")}
                                                    className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'IN' ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
                                                >
                                                    Check-IN
                                                </button>
                                                <button
                                                    onClick={() => setCheckInType("OUT")}
                                                    className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'OUT' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
                                                >
                                                    Check-OUT
                                                </button>
                                            </div>

                                            <div className="bg-white p-2 inline-block shadow-lg">
                                                <div className="w-24 h-24 bg-zinc-950 flex flex-col items-center justify-center text-white p-2">
                                                    <ScanLine className="h-7 w-7 text-emerald-400 animate-bounce mb-1" />
                                                    <span className="text-[9px] font-mono">MASTER QR</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full mt-3">
                                            <button
                                                onClick={() => simulateMasterQRScan(checkInType)}
                                                className={`w-full font-bold py-2.5 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${checkInType === 'IN' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
                                            >
                                                <ArrowRightLeft className="h-4 w-4" /> Simulate Scan ({checkInType} Pass)
                                            </button>
                                            {scanStatus && (
                                                <p className="text-[10px] text-emerald-400 mt-2 font-mono bg-emerald-950/40 border border-emerald-900 p-1.5">{scanStatus}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* HERO SECTION WITH BACKGROUND VIDEO */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute w-full h-full object-cover z-0 filter brightness-50 contrast-125"
                >
                    <source src="/gym-tour.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/60 to-[#0f1012]/40 z-10" />

                <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
                    <span className="inline-block bg-zinc-800/80 backdrop-blur-md border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 mb-6">
                        Saluchinthala Premier Strength Facility
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none mb-6">
                        Transform Your Body At <br />
                        <span className="text-zinc-400">Hitech Gym Studio</span>
                    </h1>
                    <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg font-light mb-8">
                        Heavy strength training, cardio, and expert coaching under one roof in Saluchinthala. High-quality equipment for maximum results.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setIsTrialOpen(true)}
                            className="bg-white hover:bg-zinc-200 text-black font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition"
                        >
                            Book Free Trial Session
                        </button>
                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition flex items-center gap-2"
                        >
                            <Play className="h-4 w-4 fill-white" /> Watch 3D Tour / Video
                        </button>
                    </div>
                </div>
            </section>

            {/* STUDIO GALLERY */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Take a look inside Hitech Gym Studio</h2>
                        <p className="text-3xl font-black text-white tracking-tight uppercase">Studio Gallery</p>
                    </div>
                    <p className="text-zinc-500 text-xs mt-2 md:mt-0">Click on any image to expand view</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImg(item.img)}
                            className="relative h-64 bg-zinc-900 border border-zinc-800/80 overflow-hidden cursor-pointer group"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 opacity-90 group-hover:opacity-100 transition">
                                <span className="text-xs font-semibold tracking-wider text-white uppercase">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MEMBERSHIP PACKAGES */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="mb-16 text-center">
                    <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Affordable plans tailored to your goals</h2>
                    <p className="text-3xl font-black text-white tracking-tight uppercase">Membership Packages</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Monthly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹1,200 <span className="text-xs font-normal text-zinc-500">/ mo</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Full Equipment Access</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> General Trainer Guidance</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Cardio & Strength Zone</li>
                            </ul>
                        </div>
                        <a href="tel:9949461105" className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition">
                            Join Monthly
                        </a>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-200 p-8 flex flex-col justify-between relative">
                        <span className="absolute -top-3 right-6 bg-white text-black text-[10px] font-black uppercase px-3 py-1">Most Popular</span>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quarterly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹3,200 <span className="text-xs font-normal text-zinc-500">/ 3 mos</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-white" /> Everything in Monthly Plan</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-white" /> Personalized Workout Chart</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-white" /> Basic Diet Guidance</li>
                            </ul>
                        </div>
                        <a href="tel:9949461105" className="mt-8 text-center bg-white hover:bg-zinc-200 text-black font-bold py-3 text-xs uppercase tracking-widest transition">
                            Join Quarterly
                        </a>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Half-Yearly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹6,000 <span className="text-xs font-normal text-zinc-500">/ 6 mos</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Priority Trainer Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Customized Diet & Meal Plan</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Progress Tracking Checks</li>
                            </ul>
                        </div>
                        <a href="tel:9949461105" className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition">
                            Join Half-Yearly
                        </a>
                    </div>
                </div>
            </section>

            {/* LIVE STUDIO CROWD STATUS */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-400" /> Live Studio Crowd Status
                        </h2>
                        <p className="text-3xl font-black text-white tracking-tight uppercase">Gym Capacity: {isGymCrowded ? <span className="text-red-500">FILLED 🔥 (Busy)</span> : <span className="text-emerald-400">NORMAL (Spacious)</span>}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-300 mt-4 md:mt-0">
                        Active Members Inside Right Now: <strong className="text-white">{currentlyInsideCount}</strong>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-8">
                    <div className="h-48 flex items-end justify-between gap-2 md:gap-4 pt-8">
                        {peakHours.map((hour, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                                <div
                                    style={{ height: `${hour.busy}%` }}
                                    className={`w-full max-w-[32px] transition-all duration-300 ${hour.busy > 80 ? "bg-white" : hour.busy > 50 ? "bg-zinc-500" : "bg-zinc-700"}`}
                                />
                                <span className="text-[10px] text-zinc-500 mt-3 font-mono uppercase">{hour.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PUBLIC SUPPLEMENT STACK (Now available on the main page) */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Premium Supplements Available</h2>
                    <p className="text-3xl font-black text-white tracking-tight uppercase">Supplement Stack</p>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Package className="h-4 w-4 text-emerald-400" /> Supplement Stack Inventory
                        </h3>
                        {/* Only show Add button to Owner */}
                        {userRole === "owner" && isLoggedIn && (
                            <button
                                onClick={() => setIsAddSuppOpen(true)}
                                className="bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5"
                            >
                                <Plus className="h-3.5 w-3.5" /> Add New Supplement
                            </button>
                        )}
                    </div>

                    {/* Categorized Display */}
                    {["Whey Protein", "Creatine", "Pre-Workouts", "Mass Gainer"].map((cat) => {
                        const catItems = supplements.filter(s => s.category === cat);
                        if (catItems.length === 0) return null;
                        return (
                            <div key={cat} className="mb-6 last:mb-0">
                                <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3 border-b border-zinc-900 pb-1">
                                    🔥 {cat} Category
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {catItems.map(item => (
                                        <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${item.status === "Low Stock" ? "bg-red-950 border-red-800 text-red-400" : "bg-emerald-950 border-emerald-900 text-emerald-400"}`}>
                                                        {item.status}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-mono font-bold text-zinc-300">{item.price}</span>
                                                        {/* Only show Delete button to Owner */}
                                                        {userRole === "owner" && isLoggedIn && (
                                                            <button onClick={() => deleteSupplement(item.id)} className="text-zinc-600 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                                                        )}
                                                    </div>
                                                </div>
                                                <h4 className="text-xs font-bold text-white mb-3">{item.name}</h4>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                                                <span className="text-xs font-mono text-zinc-400">Stock: <strong className="text-white">{item.stock}</strong></span>

                                                {/* Only show +/- buttons to Owner */}
                                                {userRole === "owner" && isLoggedIn && (
                                                    <div className="flex gap-1">
                                                        <button onClick={() => updateStock(item.id, -1)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5"><Minus className="h-3 w-3" /></button>
                                                        <button onClick={() => updateStock(item.id, 1)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5"><Plus className="h-3 w-3" /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 max-w-7xl mx-auto px-6 text-zinc-400">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Dumbbell className="h-6 w-6 text-white" />
                            <span className="font-black text-lg text-white uppercase tracking-wider">Hitech Gym Studio</span>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-500">
                            Saluchinthala, Kovvur Mandal, Nellore District, AP. Premier facility for strength building and bodybuilding.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Operating Hours
                        </h4>
                        <p className="text-xs text-zinc-300">Morning: <strong>5:30 AM – 9:00 AM</strong></p>
                        <p className="text-xs text-zinc-300 mt-2">Evening: <strong>6:00 PM – 9:00 PM</strong></p>
                    </div>

                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Location & Contact
                        </h4>
                        <p className="text-xs text-zinc-300">Saluchinthala, Nellore District, AP</p>
                        <p className="text-xs text-white font-bold mt-3">Phone: +91 9949461105</p>
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mb-12 w-full h-80 border border-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.0991238050988!2d79.97993307527172!3d14.478997185993062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c8d000c6b10bb%3A0x5dfd90e086e33e5!2sHi-Tech%20GYM%20Studio!5e0!3m2!1sen!2sin!4v1790073159277!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="Hi-Tech GYM Studio Location"
                    ></iframe>
                </div>

                <div className="pt-8 border-t border-zinc-800/60 text-center text-[11px] text-zinc-600">
                    © {new Date().getFullYear()} Hitech Gym Studio. All rights reserved.
                </div>
            </footer>

            {/* Add Supplement Modal for Owner */}
            {isAddSuppOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full relative">
                        <button onClick={() => setIsAddSuppOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Add New Supplement</h3>
                        <p className="text-xs text-zinc-400 mb-6">Categorize and add new stock item to inventory.</p>

                        <form onSubmit={handleAddSupplement} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Supplement Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Optimum Nutrition Gold Standard Whey"
                                    value={newSuppName}
                                    onChange={(e) => setNewSuppName(e.target.value)}
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Select Category</label>
                                <select
                                    value={newSuppCategory}
                                    onChange={(e) => setNewSuppCategory(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                >
                                    <option value="Whey Protein">Whey Protein</option>
                                    <option value="Creatine">Creatine</option>
                                    <option value="Pre-Workouts">Pre-Workouts</option>
                                    <option value="Mass Gainer">Mass Gainer</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Price (₹)</label>
                                    <input
                                        type="text"
                                        placeholder="2,499"
                                        value={newSuppPrice}
                                        onChange={(e) => setNewSuppPrice(e.target.value)}
                                        required
                                        className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Initial Stock</label>
                                    <input
                                        type="number"
                                        placeholder="15"
                                        value={newSuppStock}
                                        onChange={(e) => setNewSuppStock(e.target.value)}
                                        required
                                        className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition mt-2">
                                Save to Inventory
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modals */}
            {selectedImg && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
                    <button className="absolute top-6 right-6 text-white hover:text-zinc-400">
                        <X className="h-8 w-8" />
                    </button>
                    <img src={selectedImg} alt="Expanded view" className="max-w-full max-h-[90vh] object-contain border border-zinc-800" />
                </div>
            )}

            {isVideoOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                    <div className="max-w-4xl w-full relative">
                        <button onClick={() => setIsVideoOpen(false)} className="absolute -top-12 right-0 text-white">
                            <X className="h-8 w-8" />
                        </button>
                        <div className="aspect-video bg-black border border-zinc-800">
                            <video controls autoPlay className="w-full h-full object-cover">
                                <source src="/gym-tour.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {isTrialOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full relative">
                        <button onClick={() => setIsTrialOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Free Trial Session</h3>
                        <p className="text-xs text-zinc-400 mb-6">Enter details to claim your pass at Hitech Gym Studio.</p>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Trial Booked Successfully!"); setIsTrialOpen(false); }} className="space-y-4">
                            <input type="text" placeholder="Full Name" required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400" />
                            <input type="tel" placeholder="Phone Number" required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400" />
                            <button type="submit" className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition">
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}