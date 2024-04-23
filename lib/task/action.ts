"use server"

import { revalidatePath } from "next/cache"
import { createActionServer } from "../supabase/actions"

export const addTaskToDataBase = async(name:string) => {
  if(!name) return false
  const supabase = await createActionServer()
  const {data: {user}} = await supabase.auth.getUser()
  if(!user) return false
  const { error } = await supabase.from("Task").insert([{name, user_id: user.id}])
  if(error) return false
  revalidatePath("/")
}