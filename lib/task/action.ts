"use server"

import { revalidatePath } from "next/cache"
import { createActionServer } from "../supabase/actions"

export const addTaskToDataBase = async(name:string) => {
  if(!name) return {
    message: "Le nom est requis"
  }
  const supabase = await createActionServer()
  const {data: {user}} = await supabase.auth.getUser()
  if(!user) return {
    message: "Vous devez être connecté"
  }
  const { error } = await supabase.from("Task").insert([{name, user_id: user.id}])
  if(error) return {
    message: "Une erreur est survenue"
  }
  revalidatePath("/")
}