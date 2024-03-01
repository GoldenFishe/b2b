import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";

import "./globals.css";
import api from "@/api/api";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "B2B",
    description: "B2B Test app",
    metadataBase: new URL(api.host),
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en" className='dark'>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
