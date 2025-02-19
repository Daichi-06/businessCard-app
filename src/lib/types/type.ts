export interface User {
  user_id: string;
  name: string;
  description: string;
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface UserWithSkills extends User {
  skills: Skill[];
}

export interface UserSkill {
  user_id: string;
  skill_id: string;
}

// 主にフォーム用

export interface FormValidate {
  user_id: string;
  name: string;
  description: string;
  skill: Array<string>;
  githubId: string;
  qiitaId: string;
  xId: string;
}
