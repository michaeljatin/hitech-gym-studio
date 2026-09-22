import type { ComponentType } from "react";
import { Dumbbell, Flame, Zap, Pill, Beef, Sparkles, MessageCircle } from "lucide-react";

type Supplement = {
    name: string;
    category: string;
    price: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    featured?: boolean;
};

const SUPPLEMENTS: Supplement[] = [
    {
        name: "Whey Protein Isolate",
        category: "Recovery",
        price: "₹2,499",
        description: "Fast-absorbing protein to rebuild muscle right after training.",
        icon: Dumbbell,
        featured: true,
    },
    {
        name: "Creatine Monohydrate",
        category: "Strength",
        price: "₹899",
        description: "Pure micronized creatine for raw strength and power output.",
        icon: Zap,
    },
    {
        name: "Pre-Workout Igniter",
        category: "Energy",
        price: "₹1,299",
        description: "Caffeine and beta-alanine blend to sharpen focus before you lift.",
        icon: Flame,
    },
    {
        name: "BCAA 2:1:1",
        category: "Recovery",
        price: "₹999",
        description: "Branched-chain aminos to cut down muscle breakdown mid-session.",
        icon: Beef,
    },
    {
        name: "Mass Gainer",
        category: "Mass",
        price: "₹1,899",
        description: "High-calorie blend built for lean, steady bulking.",
        icon: Sparkles,
    },
    {
        name: "Daily Multivitamin",
        category: "Wellness",
        price: "₹599",
        description: "Complete micronutrient cover for a packed training week.",
        icon: Pill,
    },
];

const WHATSAPP_NUMBER = "919949461105";

export default function SupplementDashboard() {
    return (
        <section className="bg-black border-t border-zinc-800 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider">
                    Fuel your training
                </p>
                <h2 className="text-3xl font-bold uppercase tracking-wider mt-1 text-white">
                    Supplement Stack
                </h2>
                <p className="text-zinc-500 text-sm mt-2 max-w-xl">
                    Trainer-recommended supplements available at the studio front desk.
                    Ask any coach for guidance on what fits your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {SUPPLEMENTS.map((item) => {
                        const Icon = item.icon;
                        const message = encodeURIComponent(
                            `Hi! I'd like to know more about the ${item.name} at Hitech Gym Studio.`
                        );
                        return (
                            <div
                                key={item.name}
                                className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-400 transition-colors"
                            >
                                <div>
                                    <div className="flex items-start justify-between">
                                        <Icon className="h-6 w-6 text-emerald-400" />
                                        {item.featured && (
                                            <span className="bg-emerald-400 text-black text-xs font-semibold px-2.5 py-1 rounded-md">
                                                Trainer&apos;s Pick
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <span className="inline-block border border-zinc-700 text-zinc-400 text-xs px-2 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                        <p className="text-zinc-500 text-sm">
                                            {item.description}
                                        </p>
                                        <p className="text-emerald-400 font-bold text-xl pt-2">{item.price}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-emerald-400 text-black hover:bg-emerald-300 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Ask About This
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}