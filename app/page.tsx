"use client";

import React, { useState, useEffect } from "react";
import { Dumbbell, Phone, MapPin, Clock, Play, X, Check, Users, TrendingUp, LogOut, User, QrCode, ScanLine, Printer, Package, Plus, Minus, ArrowRightLeft, Trash2, RotateCcw, Calendar, CreditCard, FileText, Download, Award, Gift, Share2, Trophy, Star, Copy, Flame, IndianRupee, BadgePercent, UserPlus, PhoneCall, Edit } from "lucide-react";
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
    const [copiedCode, setCopiedCode] = useState(false);

    // Member Dashboard Tabs
    const [memberTab, setMemberTab] = useState<"overview" | "history">("overview");

    // Owner Dashboard Tabs
    const [ownerTab, setOwnerTab] = useState<"attendance" | "members" | "revenue" | "inventory">("attendance");

    // Add Supplement Modal State
    const [isAddSuppOpen, setIsAddSuppOpen] = useState(false);
    const [newSuppName, setNewSuppName] = useState("");
    const [newSuppCategory, setNewSuppCategory] = useState("Whey Protein");
    const [newSuppPrice, setNewSuppPrice] = useState("");
    const [newSuppStock, setNewSuppStock] = useState("");

    // Add Member Modal State
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberPhone, setNewMemberPhone] = useState("");
    const [newMemberPlan, setNewMemberPlan] = useState("Monthly Pass");
    const [newMemberStartDate, setNewMemberStartDate] = useState("");
    const [newMemberExpiryDate, setNewMemberExpiryDate] = useState("");
    const [newMemberAmount, setNewMemberAmount] = useState("");
    const [newMemberAttendance, setNewMemberAttendance] = useState("");

    // Monthly Report PDF Modal State
    const [isReportOpen, setIsReportOpen] = useState(false);

    // All Gym Members Directory
    const [allGymMembers, setAllGymMembers] = useState([
        { id: 1, name: "Kakarlamudi Michael Jatin", phone: "+91 9949461105", plan: "Quarterly Pass (3 Mos)", expiry: "15 Nov 2026", status: "Active" },
        { id: 2, name: "Rahul Sharma", phone: "+91 9876543210", plan: "Half-Yearly Pass (6 Mos)", expiry: "01 Feb 2027", status: "Active" },
        { id: 3, name: "Priya Varma", phone: "+91 9123456789", plan: "Monthly Pass (1 Mo)", expiry: "10 Oct 2026", status: "Active" },
    ]);

    // Member Personal Data
    const [memberData, setMemberData] = useState({
        memberId: "HT-2026-098",
        membershipType: "Quarterly Pass (3 Mos)",
        daysAttended: 19,
        totalDays: 90,
        expiryDate: "15 Nov 2026",
        lastCheckIn: "Today, 6:45 AM (IN)",
    });

    // Rewards & Referral State
    const [rewardsData, setRewardsData] = useState({
        attendancePercent: 85,
        unlocked90: false,
        unlocked100: false,
        referralCode: "MIKE2026",
        friendsReferred: 2,
        referralEarnings: 200,
        currentStreak: 7,
    });

    // Eligible Members for Discounts
    const [eligibleMembers, setEligibleMembers] = useState([
        { id: 1, name: "Kakarlamudi Michael Jatin", memberId: "HT-2026-098", attendance: 90, plan: "Quarterly", fee: 3200, discount: 30, reason: "90% Attendance", referral: 0 },
        { id: 2, name: "Rahul Sharma", memberId: "HT-2026-045", attendance: 100, plan: "Monthly", fee: 1200, discount: 50, reason: "100% Attendance", referral: 0 },
        { id: 3, name: "Priya Varma", memberId: "HT-2026-112", attendance: 78, plan: "Half-Yearly", fee: 6000, discount: 200, reason: "2 Referrals", referral: 2 },
        { id: 4, name: "Suresh Kumar", memberId: "HT-2026-078", attendance: 95, plan: "Quarterly", fee: 3200, discount: 30, reason: "95% Attendance", referral: 0 },
        { id: 5, name: "Anitha Reddy", memberId: "HT-2026-056", attendance: 88, plan: "Monthly", fee: 1200, discount: 100, reason: "1 Referral", referral: 1 },
    ]);

    // Members List (with full details)
    const [membersList, setMembersList] = useState([
        { id: 1, memberId: "HT-2026-098", name: "Kakarlamudi Michael Jatin", phone: "9949461105", plan: "Quarterly Pass", startDate: "15 Aug 2026", expiryDate: "15 Nov 2026", amount: 3200, attendance: 90, referralCode: "MIKE2026", status: "Active" },
        { id: 2, memberId: "HT-2026-045", name: "Rahul Sharma", phone: "9876543210", plan: "Monthly Pass", startDate: "01 Sep 2026", expiryDate: "01 Oct 2026", amount: 1200, attendance: 100, referralCode: "RAHU2026", status: "Active" },
        { id: 3, memberId: "HT-2026-112", name: "Priya Varma", phone: "9123456780", plan: "Half-Yearly Pass", startDate: "10 Jun 2026", expiryDate: "10 Dec 2026", amount: 6000, attendance: 78, referralCode: "PRIY2026", status: "Active" },
        { id: 4, memberId: "HT-2026-078", name: "Suresh Kumar", phone: "9988776655", plan: "Quarterly Pass", startDate: "20 Jul 2026", expiryDate: "20 Oct 2026", amount: 3200, attendance: 95, referralCode: "SURE2026", status: "Active" },
        { id: 5, memberId: "HT-2026-056", name: "Anitha Reddy", phone: "9871234560", plan: "Monthly Pass", startDate: "05 Sep 2026", expiryDate: "05 Oct 2026", amount: 1200, attendance: 88, referralCode: "ANIT2026", status: "Active" },
        { id: 6, memberId: "HT-2026-023", name: "Vikram Singh", phone: "9701234567", plan: "Yearly Pass", startDate: "01 Jan 2026", expiryDate: "01 Jan 2027", amount: 10000, attendance: 82, referralCode: "VIKR2026", status: "Active" },
    ]);

    // Supplement Stack
    const [supplements, setSupplements] = useState([
        { id: 1, name: "Nakpro Whey Protein Isolate", category: "Whey Protein", stock: 12, price: "₹1,899", status: "In Stock" },
        { id: 2, name: "As-Is-It One Whey Protein", category: "Whey Protein", stock: 5, price: "₹1,650", status: "Low Stock" },
        { id: 3, name: "Creatine Monohydrate 250g", category: "Creatine", stock: 18, price: "₹899", status: "In Stock" },
        { id: 4, name: "Omega-3 Fish Oil Softgels", category: "Pre-Workouts", stock: 25, price: "₹650", status: "In Stock" },
    ]);

    // Live Attendees
    const [liveAttendees, setLiveAttendees] = useState([
        { name: "Kakarlamudi Michael Jatin", time: "06:45 AM", type: "IN", status: "Inside Gym" },
        { name: "Rahul Sharma", time: "07:15 AM", type: "IN", status: "Inside Gym" },
        { name: "Priya Varma", time: "08:00 AM", type: "OUT", status: "Checked Out" },
    ]);

    // Revenue Logs
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

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(rewardsData.referralCode);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    // Monthly Report Print
    const handlePrintReport = () => {
        setIsReportOpen(true);
        setTimeout(() => {
            window.print();
        }, 500);
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

    const generateMemberId = () => {
        const nextNum = membersList.length + 1;
        return `HT-2026-${String(nextNum).padStart(3, "0")}`;
    };

    const generateReferralCode = (name: string, phone: string) => {
        const namePart = name.replace(/\s/g, "").substring(0, 4).toUpperCase() || "MEMB";
        const phonePart = phone.slice(-2) || "00";
        return `${namePart}${phonePart}`;
    };

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        const newMemberId = generateMemberId();
        const newReferralCode = generateReferralCode(newMemberName, newMemberPhone);
        const amountNum = parseInt(newMemberAmount) || 0;
        const attendanceNum = parseInt(newMemberAttendance) || 0;

        const newMember = {
            id: Date.now(),
            memberId: newMemberId,
            name: newMemberName,
            phone: newMemberPhone,
            plan: newMemberPlan,
            startDate: newMemberStartDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            expiryDate: newMemberExpiryDate,
            amount: amountNum,
            attendance: attendanceNum,
            referralCode: newReferralCode,
            status: "Active",
        };

        setMembersList(prev => [newMember, ...prev]);
        setNewMemberName("");
        setNewMemberPhone("");
        setNewMemberPlan("Monthly Pass");
        setNewMemberStartDate("");
        setNewMemberExpiryDate("");
        setNewMemberAmount("");
        setNewMemberAttendance("");
        setIsAddMemberOpen(false);
    };

    const deleteMember = (id: number) => {
        setMembersList(prev => prev.filter(m => m.id !== id));
    };

    const resetAttendanceLog = () => {
        if (confirm("Are you sure you want to reset today's attendance feed?")) {
            setLiveAttendees([]);
            alert("Attendance feed has been reset successfully.");
        }
    };

    const currentlyInsideCount = liveAttendees.filter(a => a.type === 'IN').length;
    const isGymCrowded = currentlyInsideCount >= 5;

    const totalPendingDiscounts = eligibleMembers.reduce((sum, m) => sum + m.discount, 0);
    const totalExpectedRevenue = eligibleMembers.reduce((sum, m) => sum + (m.fee - m.discount), 0);
    const totalMembers = membersList.length;

    const totalRevenue = revenueLogs.reduce((sum, txn) => {
        const amt = parseInt(txn.amount.replace(/[₹,]/g, "")) || 0;
        return sum + amt;
    }, 0);

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
                                <button onClick={() => router.push("/login")} className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition">Login</button>
                                <button onClick={() => setIsTrialOpen(true)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest transition">Sign Up</button>
                            </>
                        )}
                        <a href="tel:9949461105" className="bg-zinc-100 hover:bg-white text-black font-bold px-5 py-2.5 rounded-none text-xs uppercase tracking-widest transition flex items-center gap-2">
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
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-mono">Gym Owner Control Panel</span>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Master Admin & Management</h2>
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <button
                                            onClick={handlePrintReport}
                                            className="bg-white text-black hover:bg-zinc-200 text-xs px-3 py-2 font-mono flex items-center gap-1.5 transition font-bold"
                                        >
                                            <FileText className="h-3.5 w-3.5" /> Monthly Report
                                        </button>
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

                                {/* Tabs */}
                                <div className="flex gap-6 border-b border-zinc-800 overflow-x-auto pb-1">
                                    <button onClick={() => setOwnerTab("attendance")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'attendance' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>Attendance & Gateway QR</button>
                                    <button onClick={() => setOwnerTab("members")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'members' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>All Members Directory ({allGymMembers.length})</button>
                                    <button onClick={() => setOwnerTab("revenue")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'revenue' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>Revenue & UPI Records</button>
                                    <button onClick={() => setOwnerTab("inventory")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${ownerTab === 'inventory' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>Supplement Stack Inventory</button>
                                </div>

                                {/* TAB 1: ATTENDANCE */}
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
                                            </div>
                                            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                                                {liveAttendees.map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-3 text-xs">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`h-2 w-2 rounded-full ${item.type === 'IN' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                                            <span className="font-bold text-white">{item.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 font-mono text-zinc-400">
                                                            <span>{item.time}</span>
                                                            <span className={`px-2 py-0.5 border ${item.type === 'IN' ? 'text-emerald-400 bg-emerald-950 border-emerald-900' : 'text-orange-400 bg-orange-950 border-orange-900'}`}>{item.type} PASS</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: MEMBERS DIRECTORY */}
                                {ownerTab === "members" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <Users className="h-4 w-4 text-emerald-400" /> Members Directory & Phone Numbers
                                            </h3>
                                            <button onClick={() => setIsAddMemberOpen(true)} className="bg-white text-black font-bold px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5">
                                                <Plus className="h-3.5 w-3.5" /> Add Member
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs text-zinc-400 font-mono">
                                                <thead className="border-b border-zinc-800 text-zinc-200 uppercase">
                                                    <tr>
                                                        <th className="py-3 px-4">Member Name</th>
                                                        <th className="py-3 px-4">Phone</th>
                                                        <th className="py-3 px-4">Plan</th>
                                                        <th className="py-3 px-4">Expiry</th>
                                                        <th className="py-3 px-4">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allGymMembers.map((m) => (
                                                        <tr key={m.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                                                            <td className="py-3 px-4 text-white font-bold">{m.name}</td>
                                                            <td className="py-3 px-4 text-emerald-400 font-bold flex items-center gap-1.5"><Phone className="h-3 w-3" /> {m.phone}</td>
                                                            <td className="py-3 px-4">{m.plan}</td>
                                                            <td className="py-3 px-4">{m.expiry}</td>
                                                            <td className="py-3 px-4"><span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-900">{m.status}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: REVENUE */}
                                {ownerTab === "revenue" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-emerald-400" /> Revenue & UPI Records
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

                                {/* TAB 4: INVENTORY */}
                                {ownerTab === "inventory" && (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <Package className="h-4 w-4 text-emerald-400" /> Supplement Stack Inventory Manager
                                            </h3>
                                            <button onClick={() => setIsAddSuppOpen(true)} className="bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5">
                                                <Plus className="h-3.5 w-3.5" /> Add New Supplement
                                            </button>
                                        </div>

                                        {["Whey Protein", "Creatine", "Pre-Workouts", "Mass Gainer"].map((cat) => {
                                            const catItems = supplements.filter(s => s.category === cat);
                                            if (catItems.length === 0) return null;
                                            return (
                                                <div key={cat} className="mb-6 last:mb-0">
                                                    <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3 border-b border-zinc-900 pb-1">🔥 {cat} Category</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        {catItems.map(item => (
                                                            <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-between">
                                                                <div>
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${item.status === "Low Stock" ? "bg-red-950 border-red-800 text-red-400" : "bg-emerald-950 border-emerald-900 text-emerald-400"}`}>{item.status}</span>
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
                            /* MEMBER PORTAL */
                            <div className="space-y-8">
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

                                {/* Member Tabs */}
                                <div className="flex gap-6 border-b border-zinc-800 mb-8 pb-1">
                                    <button onClick={() => setMemberTab("overview")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${memberTab === 'overview' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>Overview & QR Scanner</button>
                                    <button onClick={() => setMemberTab("history")} className={`pb-3 text-sm md:text-base uppercase font-mono tracking-wider transition font-black ${memberTab === 'history' ? 'border-b-2 border-white text-white' : 'text-red-600 hover:text-red-500'}`}>Attendance History</button>
                                </div>

                                {memberTab === "overview" ? (
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
                                            <div className="mt-6 pt-4 border-t border-zinc-900 text-xs text-emerald-400 font-mono">Status: Active Gym Member ✅</div>
                                        </div>

                                        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center justify-between">
                                            <div>
                                                <span className="text-xs text-zinc-300 uppercase tracking-widest font-bold block mb-1">Scan Master Entrance QR</span>
                                                <p className="text-[11px] text-zinc-500 mb-3">Select IN when entering or OUT when leaving</p>
                                                <div className="flex gap-2 justify-center mb-3">
                                                    <button onClick={() => setCheckInType("IN")} className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'IN' ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>Check-IN</button>
                                                    <button onClick={() => setCheckInType("OUT")} className={`px-4 py-1.5 text-xs font-bold uppercase ${checkInType === 'OUT' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>Check-OUT</button>
                                                </div>
                                                <div className="bg-white p-2 inline-block shadow-lg">
                                                    <div className="w-24 h-24 bg-zinc-950 flex flex-col items-center justify-center text-white p-2">
                                                        <ScanLine className="h-7 w-7 text-emerald-400 animate-bounce mb-1" />
                                                        <span className="text-[9px] font-mono">MASTER QR</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mt-3">
                                                <button onClick={() => simulateMasterQRScan(checkInType)} className={`w-full font-bold py-2.5 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${checkInType === 'IN' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}>
                                                    <ArrowRightLeft className="h-4 w-4" /> Simulate Scan ({checkInType} Pass)
                                                </button>
                                                {scanStatus && <p className="text-[10px] text-emerald-400 mt-2 font-mono bg-emerald-950/40 border border-emerald-900 p-1.5">{scanStatus}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-950 border border-zinc-800 p-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-emerald-400" /> Your Complete Attendance Logbook
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { date: "17 Sep 2026", time: "06:45 AM", status: "Present (IN)" },
                                                { date: "16 Sep 2026", time: "07:00 AM", status: "Present (IN)" },
                                                { date: "15 Sep 2026", time: "Rest Day", status: "Absent (Rest)" },
                                                { date: "14 Sep 2026", time: "06:30 AM", status: "Present (IN)" },
                                            ].map((log, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 text-xs font-mono">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`h-2.5 w-2.5 rounded-full ${log.status.includes('Present') ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                        <span className="text-white font-bold">{log.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-zinc-400">{log.time}</span>
                                                        <span className={`px-2.5 py-1 border ${log.status.includes('Present') ? 'text-emerald-400 bg-emerald-950 border-emerald-900' : 'text-red-400 bg-red-950 border-red-900'}`}>{log.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* REWARDS & REFERRALS SECTION */}
                                <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Trophy className="h-6 w-6 text-amber-400" />
                                        <div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Rewards & Referrals</h3>
                                            <p className="text-xs text-zinc-400">Stay consistent, earn discounts, and refer friends!</p>
                                        </div>
                                    </div>

                                    <div className="mb-8 bg-zinc-950 border border-zinc-800 p-6">
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono block mb-1">Your Attendance Streak</span>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-4xl font-black text-white">{rewardsData.attendancePercent}%</span>
                                                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-400" /> {rewardsData.currentStreak} day streak</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-900 px-3 py-1">
                                                {rewardsData.attendancePercent >= 90 ? "DISCOUNT UNLOCKED 🎉" : `Need ${90 - rewardsData.attendancePercent}% more for ₹30 off`}
                                            </span>
                                        </div>
                                        <div className="relative w-full h-4 bg-zinc-900 border border-zinc-800 overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-500 transition-all duration-1000" style={{ width: `${rewardsData.attendancePercent}%` }}></div>
                                            <div className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-amber-400"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2">
                                            <span>0%</span>
                                            <span className="text-amber-400">▲ 90% (₹30 OFF)</span>
                                            <span>100% (₹50 OFF)</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="border p-6 bg-zinc-950 border-zinc-800">
                                            <Award className="h-8 w-8 mb-3 text-zinc-600" />
                                            <span className="text-xs font-mono text-zinc-400 uppercase block">Tier 1</span>
                                            <h4 className="text-lg font-black text-white mt-1">90% Attendance</h4>
                                            <p className="text-2xl font-black text-amber-400 mt-2">₹30 OFF</p>
                                            <p className="text-[11px] text-zinc-500 mt-3">Attend 90% of your membership days.</p>
                                        </div>
                                        <div className="border p-6 bg-zinc-950 border-zinc-800">
                                            <Trophy className="h-8 w-8 mb-3 text-zinc-600" />
                                            <span className="text-xs font-mono text-zinc-400 uppercase block">Tier 2</span>
                                            <h4 className="text-lg font-black text-white mt-1">100% Attendance</h4>
                                            <p className="text-2xl font-black text-amber-400 mt-2">₹50 OFF</p>
                                            <p className="text-[11px] text-zinc-500 mt-3">Perfect attendance reward.</p>
                                        </div>
                                        <div className="bg-zinc-950 border border-zinc-800 p-6">
                                            <Gift className="h-8 w-8 text-pink-400 mb-3" />
                                            <span className="text-xs font-mono text-zinc-400 uppercase block">Refer & Earn</span>
                                            <h4 className="text-lg font-black text-white mt-1">Invite Friends</h4>
                                            <p className="text-2xl font-black text-pink-400 mt-2">₹100 OFF</p>
                                            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 mt-4">
                                                <code className="flex-1 text-sm font-mono font-bold text-white tracking-widest pl-2">{rewardsData.referralCode}</code>
                                                <button className="bg-white text-black px-3 py-1.5 text-[10px] font-black uppercase hover:bg-zinc-200 transition flex items-center gap-1"><Copy className="h-3 w-3" /> Copy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* HERO SECTION */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
                <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover z-0 filter brightness-50 contrast-125">
                    <source src="/gym-tour.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/60 to-[#0f1012]/40 z-10" />
                <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
                    <span className="inline-block bg-zinc-800/80 backdrop-blur-md border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 mb-6">Nellore's Premier Strength Facility</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none mb-6">Transform Your Body At <br /><span className="text-zinc-400">Hitech Gym Studio</span></h1>
                    <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg font-light mb-8">Heavy strength training, cardio, and expert coaching under one roof in Saluchinthala.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => setIsTrialOpen(true)} className="bg-white hover:bg-zinc-200 text-black font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition">Book Free Trial Session</button>
                        <button onClick={() => setIsVideoOpen(true)} className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition flex items-center gap-2"><Play className="h-4 w-4 fill-white" /> Watch 3D Tour</button>
                    </div>
                </div>
            </section>

            {/* STUDIO GALLERY */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Take a look inside</h2>
                    <p className="text-3xl font-black text-white tracking-tight uppercase">Studio Gallery</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryItems.map((item) => (
                        <div key={item.id} onClick={() => setSelectedImg(item.img)} className="relative h-64 bg-zinc-900 border border-zinc-800/80 overflow-hidden cursor-pointer group">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
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
                    <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Affordable plans</h2>
                    <p className="text-3xl font-black text-white tracking-tight uppercase">Membership Packages</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Monthly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹1,200 <span className="text-xs font-normal text-zinc-500">/ mo</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Full Equipment Access</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Trainer Guidance</li>
                            </ul>
                        </div>
                        <button onClick={() => handleUpiPayment("Monthly Pass", 1200)} className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition">Join Monthly (UPI)</button>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-200 p-8 flex flex-col justify-between relative">
                        <span className="absolute -top-3 right-6 bg-white text-black text-[10px] font-black uppercase px-3 py-1">Most Popular</span>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quarterly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹3,200 <span className="text-xs font-normal text-zinc-500">/ 3 mos</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-white" /> Everything in Monthly</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-white" /> Personalized Chart</li>
                            </ul>
                        </div>
                        <button onClick={() => handleUpiPayment("Quarterly Pass", 3200)} className="mt-8 text-center bg-white hover:bg-zinc-200 text-black font-bold py-3 text-xs uppercase tracking-widest transition">Join Quarterly (UPI)</button>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Half-Yearly Pass</h3>
                            <p className="text-4xl font-black text-white mt-4">₹6,000 <span className="text-xs font-normal text-zinc-500">/ 6 mos</span></p>
                            <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Priority Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-400" /> Diet & Meal Plan</li>
                            </ul>
                        </div>
                        <button onClick={() => handleUpiPayment("Half-Yearly Pass", 6000)} className="mt-8 text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition">Join Half-Yearly (UPI)</button>
                    </div>
                </div>
            </section>

            {/* LIVE CROWD STATUS */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                    <div>
                        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-400" /> Live Studio Crowd Status</h2>
                        <p className="text-3xl font-black text-white tracking-tight uppercase">Gym Capacity: {isGymCrowded ? <span className="text-red-500">FILLED 🔥</span> : <span className="text-emerald-400">NORMAL</span>}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-300 mt-4 md:mt-0">Active Inside: <strong className="text-white">{currentlyInsideCount}</strong></div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-8">
                    <div className="h-48 flex items-end justify-between gap-2 md:gap-4 pt-8">
                        {peakHours.map((hour, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                                <div style={{ height: `${hour.busy}%` }} className={`w-full max-w-[32px] ${hour.busy > 80 ? "bg-white" : hour.busy > 50 ? "bg-zinc-500" : "bg-zinc-700"}`} />
                                <span className="text-[10px] text-zinc-500 mt-3 font-mono uppercase">{hour.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PUBLIC SUPPLEMENTS */}
            <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/60">
                <div className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">Premium Supplements Available</h2>
                    <p className="text-3xl font-black text-white tracking-tight uppercase">Supplement Stack</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2"><Package className="h-4 w-4 text-emerald-400" /> Supplement Stack Inventory</h3>
                    {["Whey Protein", "Creatine", "Pre-Workouts", "Mass Gainer"].map((cat) => {
                        const catItems = supplements.filter(s => s.category === cat);
                        if (catItems.length === 0) return null;
                        return (
                            <div key={cat} className="mb-6 last:mb-0">
                                <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3 border-b border-zinc-900 pb-1">🔥 {cat}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {catItems.map(item => (
                                        <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${item.status === "Low Stock" ? "bg-red-950 border-red-800 text-red-400" : "bg-emerald-950 border-emerald-900 text-emerald-400"}`}>{item.status}</span>
                                                <span className="text-xs font-mono font-bold text-zinc-300">{item.price}</span>
                                            </div>
                                            <h4 className="text-xs font-bold text-white mb-3">{item.name}</h4>
                                            <div className="pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-400">Stock: <strong className="text-white">{item.stock}</strong></div>
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
                        <p className="text-xs leading-relaxed text-zinc-500">Saluchinthala, Kovvur Mandal, Nellore District, AP.</p>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Clock className="h-4 w-4" /> Operating Hours</h4>
                        <p className="text-xs text-zinc-300">Morning: <strong>5:30 AM – 9:00 AM</strong></p>
                        <p className="text-xs text-zinc-300 mt-2">Evening: <strong>6:00 PM – 9:00 PM</strong></p>
                    </div>
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin className="h-4 w-4" /> Contact</h4>
                        <p className="text-xs text-zinc-300">Saluchinthala, Nellore District, AP</p>
                        <p className="text-xs text-white font-bold mt-3">Phone: +91 9949461105</p>
                    </div>
                </div>
                <div className="mb-12 w-full h-80 border border-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.0991238050988!2d79.97993307527172!3d14.478997185993062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c8d000c6b10bb%3A0x5dfd90e086e33e5!2sHi-Tech%20GYM%20Studio!5e0!3m2!1sen!2sin!4v1790073159277!5m2!1sen!2sin"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Hi-Tech GYM Studio Location"
                    ></iframe>
                </div>
                <div className="pt-8 border-t border-zinc-800/60 text-center text-[11px] text-zinc-600">© {new Date().getFullYear()} Hitech Gym Studio. All rights reserved.</div>
            </footer>

            {/* Add Supplement Modal */}
            {isAddSuppOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full relative">
                        <button onClick={() => setIsAddSuppOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Add New Supplement</h3>
                        <p className="text-xs text-zinc-400 mb-6">Add new stock item to inventory.</p>
                        <form onSubmit={handleAddSupplement} className="space-y-4">
                            <input type="text" placeholder="Supplement Name" value={newSuppName} onChange={(e) => setNewSuppName(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-400" />
                            <select value={newSuppCategory} onChange={(e) => setNewSuppCategory(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white">
                                <option value="Whey Protein">Whey Protein</option>
                                <option value="Creatine">Creatine</option>
                                <option value="Pre-Workouts">Pre-Workouts</option>
                                <option value="Mass Gainer">Mass Gainer</option>
                            </select>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Price" value={newSuppPrice} onChange={(e) => setNewSuppPrice(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                                <input type="number" placeholder="Stock" value={newSuppStock} onChange={(e) => setNewSuppStock(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            </div>
                            <button type="submit" className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition">Save to Inventory</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {isAddMemberOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-lg w-full relative my-8">
                        <button onClick={() => setIsAddMemberOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
                        <div className="flex items-center gap-3 mb-2">
                            <UserPlus className="h-6 w-6 text-blue-400" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Add New Member</h3>
                        </div>
                        <p className="text-xs text-zinc-400 mb-6">Add existing or new member details.</p>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Member Name" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                                <input type="tel" placeholder="Phone" value={newMemberPhone} onChange={(e) => setNewMemberPhone(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            </div>
                            <select value={newMemberPlan} onChange={(e) => setNewMemberPlan(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white">
                                <option value="Monthly Pass">Monthly Pass</option>
                                <option value="Quarterly Pass">Quarterly Pass</option>
                                <option value="Half-Yearly Pass">Half-Yearly Pass</option>
                                <option value="Yearly Pass">Yearly Pass</option>
                            </select>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" value={newMemberStartDate} onChange={(e) => setNewMemberStartDate(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                                <input type="date" value={newMemberExpiryDate} onChange={(e) => setNewMemberExpiryDate(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Amount Paid" value={newMemberAmount} onChange={(e) => setNewMemberAmount(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                                <input type="number" placeholder="Attendance %" value={newMemberAttendance} onChange={(e) => setNewMemberAttendance(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            </div>
                            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-emerald-500 transition">Save Member</button>
                        </form>
                    </div>
                </div>
            )}

            {/* MONTHLY REPORT PDF MODAL */}
            {isReportOpen && (
                <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
                    <style>{`@media print { @page { size: A4; margin: 15mm; } body { background: white !important; } .no-print { display: none !important; } }`}</style>
                    <div className="no-print sticky top-0 bg-zinc-900 text-white p-4 flex justify-between items-center z-10">
                        <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2"><FileText className="h-4 w-4" /> Monthly Report Preview</span>
                        <div className="flex gap-2">
                            <button onClick={() => window.print()} className="bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> Save as PDF / Print</button>
                            <button onClick={() => setIsReportOpen(false)} className="bg-zinc-700 text-white font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-600 transition">Close</button>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto p-10 text-zinc-900 bg-white">
                        <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-6 mb-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <Dumbbell className="h-8 w-8 text-zinc-900" />
                                    <h1 className="text-3xl font-black uppercase tracking-wider">Hitech Gym Studio</h1>
                                </div>
                                <p className="text-xs text-zinc-600 mt-2">Saluchinthala, Kovvur Mandal, Nellore District, AP</p>
                                <p className="text-xs text-zinc-600">Phone: +91 9949461105</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-black uppercase">Monthly Report</h2>
                                <p className="text-xs text-zinc-600 mt-1">Generated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
                                <p className="text-xs text-zinc-600">Time: {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="border-2 border-zinc-900 p-3">
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Total Members</p>
                                <p className="text-2xl font-black">{allGymMembers.length}</p>
                            </div>
                            <div className="border-2 border-zinc-900 p-3">
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Active</p>
                                <p className="text-2xl font-black">{allGymMembers.filter(m => m.status === "Active").length}</p>
                            </div>
                            <div className="border-2 border-zinc-900 p-3">
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Revenue</p>
                                <p className="text-2xl font-black">₹{totalRevenue.toLocaleString("en-IN")}</p>
                            </div>
                            <div className="border-2 border-zinc-900 p-3">
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Pending Discounts</p>
                                <p className="text-2xl font-black">₹{totalPendingDiscounts}</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-black uppercase border-b-2 border-zinc-900 pb-2 mb-4">Member Contact Directory</h3>
                        <table className="w-full text-left text-[11px] mb-8">
                            <thead>
                                <tr className="border-b-2 border-zinc-900 font-black uppercase">
                                    <th className="py-2 px-2">#</th>
                                    <th className="py-2 px-2">Name</th>
                                    <th className="py-2 px-2">Phone</th>
                                    <th className="py-2 px-2">Plan</th>
                                    <th className="py-2 px-2">Expiry</th>
                                    <th className="py-2 px-2 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allGymMembers.map((m, idx) => (
                                    <tr key={m.id} className="border-b border-zinc-300">
                                        <td className="py-2 px-2">{idx + 1}</td>
                                        <td className="py-2 px-2 font-bold">{m.name}</td>
                                        <td className="py-2 px-2 font-mono">{m.phone}</td>
                                        <td className="py-2 px-2">{m.plan}</td>
                                        <td className="py-2 px-2 font-mono">{m.expiry}</td>
                                        <td className="py-2 px-2 text-center">{m.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3 className="text-lg font-black uppercase border-b-2 border-zinc-900 pb-2 mb-4">Revenue Records</h3>
                        <table className="w-full text-left text-[11px] mb-8">
                            <thead>
                                <tr className="border-b-2 border-zinc-900 font-black uppercase">
                                    <th className="py-2 px-2">Member</th>
                                    <th className="py-2 px-2">Package</th>
                                    <th className="py-2 px-2">Amount</th>
                                    <th className="py-2 px-2">Date</th>
                                    <th className="py-2 px-2">Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueLogs.map((txn) => (
                                    <tr key={txn.id} className="border-b border-zinc-300">
                                        <td className="py-2 px-2 font-bold">{txn.name}</td>
                                        <td className="py-2 px-2">{txn.package}</td>
                                        <td className="py-2 px-2 font-mono">{txn.amount}</td>
                                        <td className="py-2 px-2 font-mono">{txn.date}</td>
                                        <td className="py-2 px-2">{txn.mode}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-zinc-900 font-black">
                                    <td className="py-2 px-2" colSpan={2}>TOTAL REVENUE</td>
                                    <td className="py-2 px-2 font-mono">₹{totalRevenue.toLocaleString("en-IN")}</td>
                                    <td className="py-2 px-2" colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="mt-12 pt-6 border-t-2 border-zinc-900">
                            <div className="flex justify-between text-xs">
                                <div>
                                    <p className="font-black uppercase mb-8">Owner Signature</p>
                                    <p className="border-t border-zinc-900 w-48 pt-1">Prasad (Owner)</p>
                                </div>
                                <div className="text-right text-[10px] text-zinc-500">
                                    <p>This is a computer-generated report.</p>
                                    <p>© {new Date().getFullYear()} Hitech Gym Studio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Image Modal */}
            {selectedImg && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
                    <button className="absolute top-6 right-6 text-white hover:text-zinc-400"><X className="h-8 w-8" /></button>
                    <img src={selectedImg} alt="Expanded view" className="max-w-full max-h-[90vh] object-contain border border-zinc-800" />
                </div>
            )}

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                    <div className="max-w-4xl w-full relative">
                        <button onClick={() => setIsVideoOpen(false)} className="absolute -top-12 right-0 text-white"><X className="h-8 w-8" /></button>
                        <div className="aspect-video bg-black border border-zinc-800">
                            <video controls autoPlay className="w-full h-full object-cover">
                                <source src="/gym-tour.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* Trial Modal */}
            {isTrialOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full relative">
                        <button onClick={() => setIsTrialOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Free Trial Session</h3>
                        <p className="text-xs text-zinc-400 mb-6">Enter details to claim your pass.</p>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Trial Booked Successfully!"); setIsTrialOpen(false); }} className="space-y-4">
                            <input type="text" placeholder="Full Name" required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            <input type="tel" placeholder="Phone Number" required className="w-full bg-zinc-950 border border-zinc-800 p-3 text-xs text-white" />
                            <button type="submit" className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-zinc-200 transition">Confirm Booking</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}