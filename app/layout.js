"use client";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNavbar from "./components/Navbar/BottomNavbar";
import AddNewTransaction from "./components/Modal/AddNewTransaction";

const poppins = Plus_Jakarta_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Penny Pouch",
  description: "Money Manager",
};

export default function RootLayout({ children }) {
  const segments = useSelectedLayoutSegments();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="h-[90vh] p-2">{children}</div>

        {/* Bottom Navigation */}
        <div className="h-[10vh] flex justify-center items-center pb-2">
          <BottomNavbar segments={segments} setModalOpen={setModalOpen} />
        </div>

        {/* MODAL */}
        <AddNewTransaction modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </body>
    </html>
  );
}
