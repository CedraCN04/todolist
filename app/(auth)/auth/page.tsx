"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithPassword } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = (formData: FormData) => {
    startTransition(() => {
      signInWithPassword(formData);
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center gap-4 items-center w-full">
      <h2>Connexion</h2>
      <form action={handleSignIn} className="w-2/5">
        <fieldset disabled={isPending} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="entrez votre email"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            required
          />
          <Button className="flex gap-2 w-full">
            Connexion
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />{" "}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}

