import { supabase } from "@/lib/supabase";

import { UserWithSkills, Skill, FormValidate } from "./../types/type";

export const getUserSkillData = async (id: string): Promise<UserWithSkills> => {
  const response = await supabase.from("user").select("*, skills(*)").eq("user_id", id).single();

  if (response.error) {
    console.error("Error fetching user_skill data:", response.error.message);
    return {
      user_id: "",
      name: "",
      description: "",
      skills: [],
    };
  }

  return response.data as UserWithSkills;
};

export const getSkillData = async (): Promise<Skill[]> => {
  const { data, error } = await supabase.from("skills").select("*");

  if (error) {
    console.error("Error fetching skill data:", error.message);
    return [];
  }
  return data;
};

export const insertUserData = async (formData: FormValidate) => {
  const { data, error } = await supabase.rpc("insert_user_with_skills", {
    p_user_id: formData.user_id,
    p_name: formData.name,
    p_description: formData.description,
    p_github_id: formData.githubId,
    p_qiita_id: formData.qiitaId,
    p_x_id: formData.xId,
    p_skill_ids: formData.skill,
  });

  if (error) {
    console.error("エラーが発生しました:", error.message);
    return;
  }

  return data;
};

export const deletePreviousDayData = async () => {
  const { data, error } = await supabase.rpc("delete_users_and_user_skill_of_previous_day");

  if (error) throw new Error(error.message);

  return data;
};
