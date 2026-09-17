// SEO metadata for app/layout.tsx (server component)
// Add/replace the metadata export in app/layout.tsx with:
//
// import type { Metadata } from "next";
//
// export const metadata: Metadata = {
//   title: "Hitech Gym Studio - Nellore",
//   description:
//     "Premier strength facility in Saluchinthala, Kovvur Mandal, Nellore District. Heavy strength training, cardio, and expert coaching.",
//   verification: {
//     google: "xw7-9mCYEn7Vq2MU6iluYQKlhHeKUPf0u__tLfLdWpw",
//   },
// };

"use client";

import React, { useState, useEffect } from "react";
import { Dumbbell, Phone, MapPin, Clock, Play, X, Check, Users, TrendingUp, LogOut, User, QrCode, ScanLine, Printer, Package, Plus, Minus, ArrowRightLeft, Trash2, RotateCcw, Calendar, CreditCard } from "lucide-react";
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

    // Member Dashboard Tabs ("overview" or "history")
    const [memberTab, setMemberTab] = useState<"overview" | "history">("overview");

    // Owner Dashboard Tabs ("attendance" | "members" | "revenue" | "inventory")
    const [ownerTab, setOwnerTab] = useState<"attendance" | "members" | "revenue" | "inventory">("attendance");

    // Add Supplement Modal State for Owner
    const [isAddSuppOpen, setIsAddSuppOpen] = useState(false);
    const [newSuppName, setNewSuppName] = useState("");
    const [newSuppCategory, setNewSuppCategory] = useState("Whey Protein");
    const [newSuppPrice, setNewSuppPrice] = useState("");
    const [newSuppStock, setNewSuppStock] = useState("");

    // Manual Member Onboarding Modal State for Owner
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberPhone, setNewMemberPhone] = useState("");
    const [newMemberPlan, setNewMemberPlan] = useState("Quarterly Pass (3 Mos)");
    const [newMemberExpiry, setNewMemberExpiry] = useState("15 Dec 2026");

    // All Gym Members Directory (Includes phone numbers & plans)
    const [allGymMembers, setAllGymMembers] = useState([
        { id: 1, name: "Kakarlamudi Michael Jatin", phone: "+91 9949461105", plan: "Quarterly Pass (3 Mos)", expiry: "15 Nov 2026", status: "Active" },
        { id: 2, name: "Rahul Sharma", phone: "+91 9876543210", plan: "Half-Yearly Pass (6 Mos)", expiry: "01 Feb 2027", status: "Active" },
        { id: 3, name: "Priya Varma", phone: "+91 9123456789", plan: "Monthly Pass (1 Mo)", expiry: "10 Oct 2026", status: "Active" },
    ]);

    // Member Personal Data & Subscription Tracking
    const [memberData, setMemberData] = useState({
        memberId: "HT-2026-098",
        membershipType: "Quarterly Pass (3 Mos)",
        daysAttended: 19,
        totalDays: 90,
        expiryDate: "15 Nov 2026",
        lastCheckIn: "Today, 6:45 AM (IN)",
        attendanceHistory: [
            { date: "17 Sep 2026", time: "06:45 AM", status: "Present (IN)" },
            { date: "16 Sep 2026", time: "07:00 AM", status: "Present (IN)" },
            { date: "15 Sep 2026", time: "Rest Day", status: "Absent (Rest)" },
            { date: "14 Sep 2026", time: "06:30 AM", status: "Present (IN)" },
        ]
    });

    const [supplements, setSupplements] = useState([
        { id: 1, name: "Nakpro Whey Protein Isolate", category: "Whey Protein", stock: 12, price: "₹1,899", status: "In Stock" },
        { id: 2, name: "As-Is-It One Whey Protein", category: "Whey Protein", stock: 5, price: "₹1,650", status: "Low Stock" },
        { id: 3, name: "Creatine Monohydrate 250g", category: "Creatine", stock: 18, price: "₹899", status: "In Stock" },
        { id: 4, name: "Omega-3 Fish Oil Softgels", category: "Pre-Workouts", stock: 25, price: "₹650", status: "In Stock" },
    ]);

    const [liveAttendees, setLiveAttendees] = useState([
        { name: "Kakarlamudi Michael Jatin", totalDaysAttended: 19, totalAllowedDays: 90, lastTime: "06:45 AM", type: "IN", status: "Inside Gym" },
        { name: "Rahul Sharma", totalDaysAttended: 42, totalAllowedDays: 90, lastTime: "07:15 AM", type: "IN", status: "Inside Gym" },
        { name: "Priya Varma", totalDaysAttended: 12, totalAllowedDays: 30, lastTime: "08:00 AM", type: "OUT", status: "Checked Out" },
    ]);

    const [revenueLogs, setRevenueLogs] = useState([
        { id: 1, name: "Kakarlamudi Michael Jatin", package: "Quarterly Pass", amount: "₹3,200", date: "15 Jul 2026, 10:30 AM", mode: "UPI (Direct)" },
        { id: 2, name: "Rahul Sharma", package: "Half-Yearly Pass", amount: "₹6,000", date: "01 Aug 2026, 09:15 AM", mode: "UPI (Direct)" },
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

    const handleUpiPayment = (packageName: string, amount: number) => {
        const ownerUpiId = "9949461105@ybl";
        const ownerName = "Hitech Gym Studio";
        const upiIntentUrl = `upi://pay?pa=${ownerUpiId}&pn=${encodeURIComponent(ownerName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(packageName + ' Fee')}`;

        window.location.href = upiIntentUrl;

        const newTxn = {
            id: Date.now(),
            name: userName || "New Member",
            package: packageName,
            amount: `₹${amount.toLocaleString()}`,
            date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mode: "UPI Intent"
        };
        setRevenueLogs(prev => [newTxn, ...prev]);
        alert(`Redirecting to UPI payment for ${packageName} (${amount}). Payment recorded to owner account!`);
    };

    const simulateGymGateQRScan = (type: "IN" | "OUT") => {
        setScanStatus("Validating Gym Entrance Gateway...");
        setTimeout(() => {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const currentName = userName || "Member";

            if (type === "IN") {
                setMemberData(prev => {
                    const updatedDays = prev.daysAttended + 1;
                    const newLog = { date: currentDate, time: currentTime, status: "Present (IN)" };
                    return {
                        ...prev,
                        daysAttended: updatedDays,
                        lastCheckIn: `Today, ${currentTime} (IN)`,
                        attendanceHistory: [newLog, ...prev.attendanceHistory]
                    };
                });
            } else {
                setMemberData(prev => ({
                    ...prev,
                    lastCheckIn: `Today, ${currentTime} (OUT)`
                }));
            }

            setLiveAttendees(prev => {
                const existingIndex = prev.findIndex(item => item.name === currentName);
                const currentAttendedCount = memberData.daysAttended + (type === 'IN' ? 1 : 0);

                if (existingIndex > -1) {
                    const updated = [...prev];
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        totalDaysAttended: currentAttendedCount,
                        lastTime: currentTime,
                        type: type,
                        status: type === 'IN' ? 'Inside Gym' : 'Checked Out'
                    };
                    return updated;
                } else {
                    return [
                        { name: currentName, totalDaysAttended: currentAttendedCount, totalAllowedDays: memberData.totalDays, lastTime: currentTime, type: type, status: type === 'IN' ? 'Inside Gym' : 'Checked Out' },
                        ...prev
                    ];
                }
            });

            setScanStatus(`SUCCESS: ${type} Pass Verified at Gym Gate! Progress Updated.`);
        }, 800);
    };

    const resetAttendanceLog = () => {
        if (confirm("Are you sure you want to reset today's attendance feed?")) {
            setLiveAttendees([]);
            alert("Attendance feed has been reset successfully.");
        }
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

    const handleAddOfflineMember = (e: React.FormEvent) => {
        e.preventDefault();

        const newMemberProfile = {
            id: Date.now(),
            name: newMemberName,
            phone: newMemberPhone,
            plan: newMemberPlan,
            expiry: newMemberExpiry,
            status: "Active"
        };
        setAllGymMembers(prev => [newMemberProfile, ...prev]);

        const newAttendanceEntry = {
            name: newMemberName,
            totalDaysAttended: 0,
            totalAllowedDays: newMemberPlan.includes("Monthly") ? 30 : newMemberPlan.includes("Quarterly") ? 90 : 180,
            lastTime: "Not checked in yet",
            type: "IN" as const,
            status: "Offline Registered"
        };
        setLiveAttendees(prev => [newAttendanceEntry, ...prev]);

        alert(`Successfully registered member ${newMemberName} (${newMemberPhone})! Added to member directory and attendance sheet.`);
        setNewMemberName("");
        setNewMemberPhone("");
        setIsAddMemberOpen(false);
    };

    const currentlyInsideCount = liveAttendees.filter(a => a.type === 'IN').length;
    const isGymCrowded = currentlyInsideCount >= 5;

    const daysRemaining = Math.max(0, memberData.totalDays - memberData.daysAttended);
    const attendancePercentage = Math.min(100, Math.round((memberData.daysAttended / memberData.totalDays) * 100));

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

            {/* Header with Clickable Logo */}
            <nav className="border-b border-zinc-800/80 bg-[#0f1012]/90 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                        <Dumbbell className="h-7 w-7 text-white group-hover:scale-110 transition" />
                        <span className="font-black text-xl tracking-widest text-white uppercase">
                            Hitech <span className="text-zinc-400 font-normal">Gym Studio</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-zinc-400">Gym Status:</span>
                            <strong className={isGymCrowded ? "text-red-400" : "text-emerald-400"}>
                                {currentlyInsideCount} Inside ({isGymCrowded ? "BUSY 🔥" : "NORMAL"})
                            </strong>
                        </div>

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
                            /* GYM OWNER DASHBOARD WITH MULTIPLE TABS */
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-mono">Gym Owner Control Panel</span>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Master Admin & Management</h2>
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <button
                                            onClick={() => setIsAddMemberOpen(true)}
                                            className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs px-3 py-2 font-mono flex items-center gap-1.5 transition"
                                        >
                                            <Plus className="h-3.5 w-3.5" /> Add New / Offline Member
                                        </button>
                                        <button
                                            onClick={resetAttendanceLog}
                                            className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs px-3 py-2 font-mono flex items-center gap-1.5 transition"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5" /> Reset Attendance
                                        </button>
                                    </div>
                                </div>

                                {/* Owner Navigation Tabs: Unselected = Bold Big Red, Selected = White */}
                                <div className="flex gap-6 border-b border-zinc-800 overflow-x-auto pb-1">
                                    <button
                                        onClick={() => setOwnerTab("attendance")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'attendance' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        Attendance & Gateway QR
                                    </button>
                                    <button
                                        onClick={() => setOwnerTab("members")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'members' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        All Gym Members Directory ({allGymMembers.length})
                                    </button>
                                    <button
                                        onClick={() => setOwnerTab("revenue")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'revenue' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        Revenue & UPI Records
                                    </button>
                                    <button
                                        onClick={() => setOwnerTab("inventory")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'inventory' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        Supplement Stack Inventory
                                    </button>
                                </div>

                                {/* TAB 1: ATTENDANCE & GATEWAY QR */}
                                {ownerTab === "attendance" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center justify-between">
                                            <div>
                                                <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-1">Gym Entrance Gateway QR</span>
                                                <p className="text-[11px] text-zinc-500 mb-4">Print & paste at entrance. Members scan for In/Out.</p>
                                                <div className="bg-white p-4 inline-block shadow-xl border-4 border-zinc-900">
                                                    <div className="w-40 h-40 bg-zinc-950 flex flex-col items-center justify-center text-white p-2">
                                                        <QrCode className="h-16 w-16 text-emerald-400 mb-2" />
                                                        <span className="text-[11px] font-mono font-bold tracking-wider">HITECH-GATE-QR</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => window.print()} className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2">
                                                <Printer className="h-4 w-4" /> Print Master QR Code
                                            </button>
                                        </div>

                                        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-emerald-400" /> Master Attendance Sheet ({liveAttendees.length})
                                                </h3>
                                                <span className="text-[11px] text-zinc-500 font-mono">Live In/Out Feed</span>
                                            </div>
                                            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                                                {liveAttendees.map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 text-xs">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`h-2 w-2 rounded-full ${item.type === 'IN' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                                            <div>
                                                                <span className="font-bold text-white block">{item.name}</span>
                                                                <span className="text-[10px] text-zinc-500">Attended: {item.totalDaysAttended} / {item.totalAllowedDays} Days</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 font-mono text-zinc-400">
                                                            <span>{item.lastTime}</span>
                                                            <span className={`px-2 py-0.5 border ${item.type === 'IN' ? 'text-emerald-400 bg-emerald-950 border-emerald-900' : 'text-orange-400 bg-orange-950 border-orange-900'}`}>
                                                                {item.type} PASS
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: ALL GYM MEMBERS & PHONE NUMBERS DIRECTORY */}
                                {ownerTab === "members" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <Users className="h-4 w-4 text-emerald-400" /> Total Gym Members Directory & Phone Numbers
                                            </h3>
                                            <button
                                                onClick={() => setIsAddMemberOpen(true)}
                                                className="bg-white text-black font-bold px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5"
                                            >
                                                <Plus className="h-3.5 w-3.5" /> Add Member
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs text-zinc-400 font-mono">
                                                <thead className="border-b border-zinc-800 text-zinc-200 uppercase">
                                                    <tr>
                                                        <th className="py-3 px-4">Member Name</th>
                                                        <th className="py-3 px-4">Phone Number</th>
                                                        <th className="py-3 px-4">Subscription Plan</th>
                                                        <th className="py-3 px-4">Expiry Date</th>
                                                        <th className="py-3 px-4">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allGymMembers.map((m) => (
                                                        <tr key={m.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                                                            <td className="py-3 px-4 text-white font-bold">{m.name}</td>
                                                            <td className="py-3 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                                                                <Phone className="h-3 w-3" /> {m.phone}
                                                            </td>
                                                            <td className="py-3 px-4">{m.plan}</td>
                                                            <td className="py-3 px-4">{m.expiry}</td>
                                                            <td className="py-3 px-4">
                                                                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900">{m.status}</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: REVENUE & UPI RECORDS */}
                                {ownerTab === "revenue" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-emerald-400" /> Owner Revenue & UPI Payment Records
                                            </h3>
                                            <span className="text-xs text-emerald-400 font-mono">Direct to Owner UPI Account</span>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs text-zinc-400 font-mono">
                                                <thead className="border-b border-zinc-800 text-zinc-200 uppercase">
                                                    <tr>
                                                        <th className="py-3 px-4">Member Name</th>
                                                        <th className="py-3 px-4">Package</th>
                                                        <th className="py-3 px-4">Amount</th>
                                                        <th className="py-3 px-4">Date & Time</th>
                                                        <th className="py-3 px-4">Payment Mode</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {revenueLogs.map((txn) => (
                                                        <tr key={txn.id} className="border-b border-zinc-900">
                                                            <td className="py-3 px-4 text-white font-bold">{txn.name}</td>
                                                            <td className="py-3 px-4">{txn.package}</td>
                                                            <td className="py-3 px-4 text-emerald-400 font-bold">{txn.amount}</td>
                                                            <td className="py-3 px-4">{txn.date}</td>
                                                            <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900">{txn.mode}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 4: SUPPLEMENT INVENTORY */}
                                {ownerTab === "inventory" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <Package className="h-4 w-4 text-emerald-400" /> Supplement Stack Inventory Manager
                                            </h3>
                                            <button
                                                onClick={() => setIsAddSuppOpen(true)}
                                                className="bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5"
                                            >
                                                <Plus className="h-3.5 w-3.5" /> Add New Supplement
                                            </button>
                                        </div>

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
                                                                            <button onClick={() => deleteSupplement(item.id)} className="text-zinc-600 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <h4 className="text-xs font-bold text-white mb-3">{item.name}</h4>
                                                                </div>
                                                                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                                                                    <span className="text-xs font-mono text-zinc-400">Stock: <strong className="text-white">{item.stock}</strong></span>
                                                                    <div className="flex gap-1">
                                                                        <button onClick={() => updateStock(item.id, -1)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5"><Minus className="h-3 w-3" /></button>
                                                                        <button onClick={() => updateStock(item.id, 1)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-1.5"><Plus className="h-3 w-3" /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* MEMBER PORTAL WITH TABS (OVERVIEW & ATTENDANCE HISTORY) */
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-mono">Member Subscription & Progress</span>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Welcome, {userName}! 🔥</h2>
                                    </div>
                                    <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 text-xs flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-zinc-300">ID: {memberData.memberId}</span>
                                    </div>
                                </div>

                                <div className="flex gap-6 border-b border-zinc-800 mb-8 pb-1">
                                    <button
                                        onClick={() => setMemberTab("overview")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${memberTab === 'overview' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        Overview & QR Scanner
                                    </button>
                                    <button
                                        onClick={() => setMemberTab("history")}
                                        className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${memberTab === 'history' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}
                                    >
                                        Attendance History (Present / Absent Dates)
                                    </button>
                                </div>

                                {memberTab === "overview" ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-3">Active Subscription</span>
                                                <h3 className="text-lg font-bold text-white">{memberData.membershipType}</h3>
                                                <p className="text-xs text-zinc-500 mt-1">Expiry Date: {memberData.expiryDate}</p>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between text-xs">
                                                <span className="text-zinc-400">Fee Status:</span>
                                                <span className="text-emerald-400 font-bold uppercase">Paid (No Dues)</span>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-zinc-400 uppercase tracking-widest">Attendance Progress</span>
                                                    <span className="text-xs font-mono font-bold text-emerald-400">{attendancePercentage}% Done</span>
                                                </div>
                                                <h3 className="text-2xl font-black text-white mb-1">
                                                    {memberData.daysAttended} <span className="text-xs font-normal text-zinc-500">/ {memberData.totalDays} Days Attended</span>
                                                </h3>
                                                <p className="text-xs text-emerald-400 font-mono mb-4">
                                                    ✨ You can visit for <strong className="text-white underline">{daysRemaining} more days</strong> under current pass.
                                                </p>
                                                <div className="w-full bg-zinc-900 h-2 border border-zinc-800 overflow-hidden">
                                                    <div style={{ width: `${attendancePercentage}%` }} className="bg-emerald-500 h-full transition-all duration-500" />
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-zinc-900 text-[11px] text-zinc-400 font-mono">
                                                Last Activity: {memberData.lastCheckIn}
                                            </div>
                                        </div>

                                        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center justify-between">
                                            <div>
                                                <span className="text-xs text-zinc-300 uppercase tracking-widest font-bold block mb-1">Scan Gym Gateway QR</span>
                                                <p className="text-[11px] text-zinc-500 mb-3">Must be scanned at physical gym entrance</p>

                                                <div className="flex gap-2 justify-center mb-3">
                                                    <button
                                                        onClick={() => setCheckInType("IN")}
                                                        className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'IN' ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
                                                    >
                                                        Check-IN Pass
                                                    </button>
                                                    <button
                                                        onClick={() => setCheckInType("OUT")}
                                                        className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'OUT' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
                                                    >
                                                        Check-OUT Pass
                                                    </button>
                                                </div>

                                                <div className="bg-white p-2 inline-block shadow-lg">
                                                    <div className="w-24 h-24 bg-zinc-950 flex flex-col items-center justify-center text-white p-2">
                                                        <ScanLine className="h-7 w-7 text-emerald-400 animate-bounce mb-1" />
                                                        <span className="text-[9px] font-mono">GATEWAY QR</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full mt-3">
                                                <button
                                                    onClick={() => simulateGymGateQRScan(checkInType)}
                                                    className={`w-full font-bold py-2.5 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${checkInType === 'IN' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
                                                >
                                                    <ArrowRightLeft className="h-4 w-4" /> Scan Gateway ({checkInType})
                                                </button>
                                                {scanStatus && (
                                                    <p className="text-[10px] mt-2 font-mono p-1.5 border text-emerald-400 bg-emerald-950/40 border-emerald-900">{scanStatus}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-emerald-400" /> Your Complete Attendance Logbook (Present & Absent)
                                        </h3>
                                        <div className="space-y-3">
                                            {memberData.attendanceHistory.map((log, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 text-xs font-mono">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`h-2.5 w-2.5 rounded-full ${log.status.includes('Present') ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                        <span className="text-white font-bold">{log.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-zinc-400">{log.time}</span>
                                                        <span className={`px-2.5 py-1 border ${log.status.includes('Present') ? 'text-emerald-400 bg-emerald-950 border-emerald-900' : 'text-red-400 bg-red-950 border-red-900'}`}>
                                                            {log.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                        Nellore's Premier Strength Facility
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

            {/* MEMBERSHIP PACKAGES WITH UPI PAYMENT INTEGRATION */}
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
                        <button
                            onClick={() => handleUpiPayment("Monthly Pass", 1200)}
                            className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition"
                        >
                            Join Monthly (UPI)
                        </button>
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
                        <button
                            onClick={() => handleUpiPayment("Quarterly Pass", 3200)}
                            className="mt-8 text-center bg-white hover:bg-zinc-200 text-black font-bold py-3 text-xs uppercase tracking-widest transition"
                        >
                            Join Quarterly (UPI)
                        </button>
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
                        <button
                            onClick={() => handleUpiPayment("Half-Yearly Pass", 6000)}
                            className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition"
                        >
                            Join Half-Yearly (UPI)
                        </button>
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
                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-300 mt-4 md:mt-0 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Active Members Inside Right Now: <strong className="text-white text-sm">{currentlyInsideCount}</strong>
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

            {/* Add Existing / New Member Modal */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full relative">
                        <button onClick={() => setIsAddMemberOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Add Member to Directory</h3>
                        <p className="text-xs text-zinc-400 mb-6">Register new or existing offline fee-paid members.</p>

                        <form onSubmit={handleAddOfflineMember} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Member Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ramesh Kumar"
                                    value={newMemberName}
                                    onChange={(e) => setNewMemberName(e.target.value)}
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    value={newMemberPhone}
                                    onChange={(e) => setNewMemberPhone(e.target.value)}
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Assigned Plan</label>
                                <select
                                    value={newMemberPlan}
                                    onChange={(e) => setNewMemberPlan(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                >
                                    <option value="Monthly Pass (1 Mo)">Monthly Pass (1 Mo)</option>
                                    <option value="Quarterly Pass (3 Mos)">Quarterly Pass (3 Mos)</option>
                                    <option value="Half-Yearly Pass (6 Mos)">Half-Yearly Pass (6 Mos)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">Plan Expiry Date</label>
                                <input
                                    type="text"
                                    value={newMemberExpiry}
                                    onChange={(e) => setNewMemberExpiry(e.target.value)}
                                    required
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400"
                                />
                            </div>

                            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-emerald-500 transition mt-2">
                                Save to Gym Directory
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