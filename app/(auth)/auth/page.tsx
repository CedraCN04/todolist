"use client";
import AuthComponent from "@/components/widgets/authcomponent";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <AuthComponent />
    </Suspense>
  );
}

