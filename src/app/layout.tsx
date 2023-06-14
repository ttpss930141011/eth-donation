import Background from "@/app/Background";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ETH donation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} `}>
                <div className="absolute w-full h-full z-20">{children}</div>
                <Background />
            </body>
        </html>
    );
}
