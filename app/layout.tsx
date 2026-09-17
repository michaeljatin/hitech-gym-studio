import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hitech Gym Studio - Nellore",
    description: "Premier strength facility in Saluchinthala, Kovvur Mandal, Nellore District. Heavy strength training, cardio, and expert coaching.",
    verification: {
        google: "xw7-9mCYEn7Vq2MU6iluYQKlhHeKUPf0u__tLfLdWpw",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            >
                {children}
            </body>
        </html>
    );
}