"use client";

import { signOut } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";

export default function NavBar() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <div className="flex justify-end gap-4">
      <form>
        <Button
          disabled={isPending}
          formAction={handleSignOut}
          className="flex flex-row justify-around gap-2"
        >
          Deconnexion
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </div>
  );
}

