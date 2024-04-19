"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPassword, signUpWithPassword } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const query = useSearchParams().get("query");

  const signin = query === "signin";

  const handleSignIn = (formData: FormData) => {
    startTransition(() => {
      signInWithPassword(formData).catch(() => {
        setError("Email ou mot de passe incorrect.");
      });
    });
  };

  const handleSignUp = (formData: FormData) => {
    startTransition(() => {
      signUpWithPassword(formData).catch(() => {
        setError("Erreur ! Veuillez réessayer.");
      });
    });
  };

  const handleSubmit = (formData: FormData) => {
    signin ? handleSignIn(formData) : handleSignUp(formData);
  };

  return (
    <div className="h-screen flex flex-col justify-center gap-4 items-center w-full">
      <Suspense>
        <h2>{signin ? "Connexion" : "Inscription"}</h2>
      </Suspense>
      <form action={handleSubmit} className="w-4/5 lg:w-1/5">
        <fieldset disabled={isPending} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Entrez votre email"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            required
          />
          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}
          <Button className="flex gap-2 w-full">
            {signin ? "Se Connecter" : "S'inscrire"}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />{" "}
          </Button>
        </fieldset>
      </form>
      <Suspense>
        <Link
          className="mt-6 hover:underline"
          href={signin ? "/auth?query=signup" : "/auth?query=signin"}
        >
          {signin ? "Pas de compte ?" : "Déjà un compte ?"}
        </Link>
      </Suspense>
    </div>
  );
}

