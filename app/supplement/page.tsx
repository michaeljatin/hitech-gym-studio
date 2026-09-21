"use client";

import { useState, useMemo } from "react";
import {
    Package, Plus, Minus, Trash2, Search, Filter,
    AlertTriangle, TrendingUp, DollarSign, RefreshCw, Layers, ShieldCheck
} from "lucide-react";

interface SupplementItem {
    id: number;
    name: string;
    category: "Protein" | "Performance" | "Wellness" | "Pre-Workout";
    sku: string;
    batchNo: string;
    stock: number;
    minThreshold: number;
    costPrice: number;
    sellingPrice: number;
    supplier: string;
}

interface StockLog {
    id: number;
    timestamp: string;
    productName: string;
    action: string;
    quantityChange: number;
}

export default function SupplementDashboard() {
    // State management
    const [supplements, setSupplements] = useState<SupplementItem[]>([
        { id: 1, name: "Whey Protein Isolate 2kg", category: "Protein", sku: "PRO-WHD-01", batchNo: "BATCH-2026-A", stock: 15, minThreshold: 5, costPrice: 1900, sellingPrice: 2499, supplier: "Func Lab Health" },
        { id: 2, name: "Creatine Monohydrate 250g", category: "Performance", sku: "PER-CRE-02", batchNo: "BATCH-2026-B", stock: 8, minThreshold: 4, costPrice: 650, sellingPrice: 899, supplier: "Aiwo Limited" },
        { id: 3, name: "Omega-3 Triple Strength", category: "Wellness", sku: "WEL-OMG-03", batchNo: "BATCH-2025-X", stock: 3, minThreshold: 5, costPrice: 480, sellingPrice: 699, supplier: "Maxcare Wellness" },
        { id: 4, name: "L-Citrulline Malate 200g", category: "Pre-Workout", sku: "PRE-CIT-04", batchNo: "BATCH-2026-C", stock: 0, minThreshold: 3, costPrice: 850, sellingPrice: 1199, supplier: "Kapiva Nutrients" }
    ]);

    const [logs, setLogs] = useState<StockLog[]>([
        { id: 1, timestamp: "Today, 10:30 AM", productName: "Whey Protein Isolate 2kg", action: "Stock Added", quantityChange: 5 },
        { id: 2, timestamp: "Yesterday, 04:15 PM", productName: "Creatine Monohydrate 250g", action: "Sale Recorded", quantityChange: -2 }
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form state for new product
    const [form, setForm] = useState({
        name: "",
        category: "Protein" as const,
        sku: "",
        batchNo: "",
        stock: 10,
        minThreshold: 3,
        costPrice: 1000,
        sellingPrice: 1499,
        supplier: ""
    });

    // Computed metrics
    const totalInventoryValue = useMemo(() => {
        return supplements.reduce((acc, item) => acc + (item.stock * item.sellingPrice), 0);
    }, [supplements]);

    // NEW: Total Stacks (Total quantity of all supplements combined)
    const totalStacks = useMemo(() => {
        return supplements.reduce((acc, item) => acc + item.stock, 0);
    }, [supplements]);

    const lowStockCount = useMemo(() => {
        return supplements.filter(item => item.stock <= item.minThreshold).length;
    }, [supplements]);

    const outOfStockCount = useMemo(() => {
        return supplements.filter(item => item.stock === 0).length;
    }, [supplements]);

    // Filtered items
    const filteredSupplements = useMemo(() => {
        return supplements.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.sku.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
            return matchesSearch && matchesCat;
        });
    }, [supplements, searchQuery, selectedCategory]);

    // Handlers
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.sku) return;

        const newItem: SupplementItem = {
            id: Date.now(),
            ...form
        };

        setSupplements([newItem, ...supplements]);
        setLogs([{
            id: Date.now(),
            timestamp: "Just now",
            productName: form.name,
            action: "New Product Initialized",
            quantityChange: form.stock
        }, ...logs]);

        setIsAddOpen(false);
        setForm({
            name: "",
            category: "Protein",
            sku: "",
            batchNo: "",
            stock: 10,
            minThreshold: 3,
            costPrice: 1000,
            sellingPrice: 1499,
            supplier: ""
        });
    };

    const updateStock = (id: number, delta: number) => {
        setSupplements(supplements.map(item => {
            if (item.id === id) {
                const newStock = Math.max(0, item.stock + delta);
                const diff = newStock - item.stock;
                if (diff !== 0) {
                    setLogs(prev => [{
                        id: Date.now(),
                        timestamp: "Just now",
                        productName: item.name,
                        action: diff > 0 ? "Stock Restocked" : "Stock Dispensed",
                        quantityChange: diff
                    }, ...prev]);
                }
                return { ...item, stock: newStock };
            }
            return item;
        }));
    };

    const deleteProduct = (id: number, name: string) => {
        setSupplements(supplements.filter(item => item.id !== id));
        setLogs(prev => [{
            id: Date.now(),
            timestamp: "Just now",
            productName: name,
            action: "Product Deleted",
            quantityChange: 0
        }, ...prev]);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 font-mono">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <header className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-emerald-400" />
                            <h1 className="text-xl font-bold tracking-wider uppercase">Hitech Gym Studio // Supplement Stack Command Center</h1>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">Real-time inventory valuation, stock threshold monitoring, and fulfillment logs.</p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" /> Add New Supplement
                    </button>
                </header>

                {/* Analytics Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-950 border border-zinc-800 p-4 space-y-2">
                        <div className="flex justify-between items-center text-zinc-400 text-xs uppercase">
                            <span>Total Portfolio Value</span>
                            <DollarSign className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">₹{totalInventoryValue.toLocaleString()}</div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Projected Retail Revenue
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 p-4 space-y-2">
                        <div className="flex justify-between items-center text-zinc-400 text-xs uppercase">
                            <span>Total Stacks Available</span>
                            <Package className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">{totalStacks} Units</div>
                        <div className="text-[10px] text-zinc-400">Across {supplements.length} Active SKUs</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 p-4 space-y-2">
                        <div className="flex justify-between items-center text-zinc-400 text-xs uppercase">
                            <span>Low Stock Alerts</span>
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                        </div>
                        <div className="text-2xl font-bold text-amber-400">{lowStockCount} Items</div>
                        <div className="text-[10px] text-zinc-400">Below minimum safety threshold</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 p-4 space-y-2">
                        <div className="flex justify-between items-center text-zinc-400 text-xs uppercase">
                            <span>Out of Stock</span>
                            <Layers className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="text-2xl font-bold text-red-500">{outOfStockCount} Items</div>
                        <div className="text-[10px] text-red-400">Requires immediate restock order</div>
                    </div>
                </div>

                {/* Controls & Filters Bar */}
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-zinc-950 border border-zinc-800 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by product name or SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="h-4 w-4 text-zinc-500 shrink-0" />
                        {["All", "Protein", "Performance", "Wellness", "Pre-Workout"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 text-xs uppercase tracking-wider shrink-0 transition ${selectedCategory === cat ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Supplement Inventory Matrix</h3>
                        <span className="text-xs text-zinc-500">Showing {filteredSupplements.length} of {supplements.length} records</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-zinc-400">
                            <thead className="border-b border-zinc-800 text-zinc-200 uppercase bg-zinc-900/50">
                                <tr>
                                    <th className="py-3 px-4">Product Name & SKU</th>
                                    <th className="py-3 px-4">Category</th>
                                    <th className="py-3 px-4">Batch No</th>
                                    <th className="py-3 px-4">Stock Units</th>
                                    <th className="py-3 px-4">Cost / Sell Price</th>
                                    <th className="py-3 px-4">Margin</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSupplements.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-8 text-center text-zinc-500">No supplement items found matching criteria.</td>
                                    </tr>
                                ) : (
                                    filteredSupplements.map((item) => {
                                        const margin = Math.round(((item.sellingPrice - item.costPrice) / item.sellingPrice) * 100);
                                        const isOut = item.stock === 0;
                                        const isLow = item.stock <= item.minThreshold && !isOut;

                                        return (
                                            <tr key={item.id} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition">
                                                <td className="py-3 px-4">
                                                    <div className="font-bold text-white">{item.name}</div>
                                                    <div className="text-[10px] text-zinc-500">{item.sku} | Supplier: {item.supplier || 'N/A'}</div>
                                                </td>
                                                <td className="py-3 px-4 text-zinc-300">{item.category}</td>
                                                <td className="py-3 px-4 text-zinc-500 font-mono text-[10px]">{item.batchNo}</td>
                                                <td className="py-3 px-4 font-bold text-white">
                                                    {item.stock} <span className="text-[10px] text-zinc-500 font-normal">units</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-zinc-500 line-through text-[10px]">₹{item.costPrice}</div>
                                                    <div className="text-emerald-400 font-bold">₹{item.sellingPrice}</div>
                                                </td>
                                                <td className="py-3 px-4 text-blue-400 font-bold">{margin}%</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-0.5 border text-[10px] uppercase font-bold ${isOut ? 'bg-red-950 text-red-400 border-red-900' :
                                                        isLow ? 'bg-amber-950 text-amber-400 border-amber-900' :
                                                            'bg-emerald-950 text-emerald-400 border-emerald-900'
                                                        }`}>
                                                        {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Optimal'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right flex items-center justify-end gap-1.5">
                                                    <button onClick={() => updateStock(item.id, 1)} className="p-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded" title="Increment Stock (+1)">
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button onClick={() => updateStock(item.id, -1)} className="p-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded" title="Decrement Stock (-1)">
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button onClick={() => deleteProduct(item.id, item.name)} className="p-1 bg-red-950 hover:bg-red-900 text-red-400 rounded" title="Delete Product">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Transaction Log */}
                <div className="bg-zinc-950 border border-zinc-800 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-3 flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5 text-blue-400" /> Recent Inventory Audit Logs
                    </h4>
                    <div className="space-y-2">
                        {logs.map((log) => (
                            <div key={log.id} className="flex justify-between items-center bg-zinc-900/40 border border-zinc-900 p-2.5 text-xs">
                                <div className="flex items-center gap-3">
                                    <span className={`px-1.5 py-0.5 text-[10px] font-bold ${log.quantityChange > 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                                        {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}
                                    </span>
                                    <div>
                                        <span className="text-white font-bold">{log.productName}</span> — <span className="text-zinc-400">{log.action}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-zinc-500">{log.timestamp}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Supplement Modal Form */}
                {isAddOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-zinc-950 border border-zinc-800 p-6 max-w-lg w-full space-y-4">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Register New Supplement SKU</h3>
                                <button onClick={() => setIsAddOpen(false)} className="text-zinc-500 hover:text-white text-xs">[ESC]</button>
                            </div>

                            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                                <div>
                                    <label className="block text-zinc-400 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Whey Protein Isolate 2kg"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        >
                                            <option value="Protein">Protein</option>
                                            <option value="Performance">Performance</option>
                                            <option value="Wellness">Wellness</option>
                                            <option value="Pre-Workout">Pre-Workout</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-zinc-400 mb-1">SKU Code</label>
                                        <input
                                            type="text"
                                            placeholder="PRO-WHD-05"
                                            value={form.sku}
                                            onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Batch Number</label>
                                        <input
                                            type="text"
                                            placeholder="BATCH-2026-Z"
                                            value={form.batchNo}
                                            onChange={(e) => setForm({ ...form, batchNo: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Supplier / Vendor</label>
                                        <input
                                            type="text"
                                            placeholder="Func Lab Health"
                                            value={form.supplier}
                                            onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Initial Stock</label>
                                        <input
                                            type="number"
                                            value={form.stock}
                                            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Cost Price (₹)</label>
                                        <input
                                            type="number"
                                            value={form.costPrice}
                                            onChange={(e) => setForm({ ...form, costPrice: Number(e.target.value) })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-400 mb-1">Selling Price (₹)</label>
                                        <input
                                            type="number"
                                            value={form.sellingPrice}
                                            onChange={(e) => setForm({ ...form, sellingPrice: Number(e.target.value) })}
                                            className="w-full bg-zinc-900 border border-zinc-800 p-2 text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddOpen(false)}
                                        className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white uppercase tracking-wider"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200"
                                    >
                                        Save SKU
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}