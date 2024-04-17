"use server";

import { redirect } from "next/navigation";
import { createActionServer } from "../supabase/actions";

export const signInWithPassword = async (data: FormData) => {
  const supabase = createActionServer();
  if (!supabase) {
    throw new Error("Supabase is undefined");
  }
  if (!supabase.auth) {
    throw new Error("Supabase.auth is undefined");
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: data.get('email') as string,
    password: data.get('password') as string,
  });
  if (error) {
    throw error;
  }
  redirect("/");
}

export const signOut = async () => {
  const supabase = createActionServer();
  await supabase.auth.signOut();
  redirect("/auth");
}

/* export const signInWithPassword = async (data: FormData) => {
  const supabase = createActionServer();
	const { error } = await supabase.auth.signInWithPassword({
		email: data.get('email') as string,
		password: data.get('password') as string,
	});
  if (error) {
    throw error;
  }
  redirect("/");
}


} */