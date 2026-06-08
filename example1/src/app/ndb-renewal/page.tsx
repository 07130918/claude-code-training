import type { Metadata } from "next";
import styles from "./page.module.css";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import ServicesSection from "./_components/ServicesSection";
import FeaturesSection from "./_components/FeaturesSection";
import RecruitSection from "./_components/RecruitSection";
import NewsSection from "./_components/NewsSection";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "日本デェイブレイク株式会社 | NDB",
  description: "お客様と共に、情報技術で未来を創る。情報システムのライフサイクル全般を一貫してサポートします。",
};

export default function NdbRenewalPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <RecruitSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
