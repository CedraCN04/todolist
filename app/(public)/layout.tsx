import NavBar from "@/components/widgets/navbar";
import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

