"use server";

import { redirect } from "next/navigation";
import { createActionServer } from "../supabase/actions";

export const signUpWithPassword = async (data: FormData) => {
  const supabase = await createActionServer();
  
  const { error } = await supabase.auth.signUp({
    email: data.get("email") as string,
    password: data.get("password") as string,
  });
  if (error) {
    throw error;
  }
  redirect("/");

}

export const signInWithPassword = async (data: FormData) => {
  const supabase = await createActionServer();
  
	const { error } = await supabase.auth.signInWithPassword({
		email: data.get("email") as string,
    password: data.get("password") as string,
	});
  if (error) {
    throw error;
  }
  redirect("/");
}

export const signOut = async () => {
  const supabase = await createActionServer();
  await supabase.auth.signOut();
  redirect("/auth");
}
