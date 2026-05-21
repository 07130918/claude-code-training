import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "天気予報",
	description: "気象庁データを使った日本主要都市の3日間天気予報",
};

export default function RootLayout({
	children,
	panel,
}: Readonly<{
	children: React.ReactNode;
	panel: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className={styles.grid}>
					<div className={styles.primary}>{children}</div>
					<div className={styles.secondary}>{panel}</div>
				</div>
			</body>
		</html>
	);
}
