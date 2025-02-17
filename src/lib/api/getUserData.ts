import { supabase } from "@/lib/supabase";

import { UserWithSkills } from "./../types/type";

export const getUserSkillData = async (id: string): Promise<UserWithSkills[]> => {
  const response = await supabase.from("user").select("*, skills(*)").eq("user_id", id);
  if (response.error) {
    console.error("Error fetching user_skill data:", response.error.message);
    return [];
  }
  return response.data ?? [];
};
