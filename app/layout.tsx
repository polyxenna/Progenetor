import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";
import "../styles/index.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Progenetor",
    description: "This is an AI ChatBot Prompt Generator.",
};

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/progenetoricon.png" sizes="any" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <html>
                <body className="dark:bg-black">{children}</body>
            </html>
        </>
    );
}
