import { useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";

import { Skill } from "@/lib/types/type";

import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { RegisterInput } from "@/components/common/registerInput/RegisterInput";
import { getSkillData } from "@/lib/api/getUserData";
import { useInsertData } from "@/lib/hook/useInsertData";

export const Register = () => {
  const [likeSkills, setLikeSkills] = useState<Skill[]>([]);
  const { onSubmit, isLoading } = useInsertData();

  const fetchSkillData = async () => {
    try {
      const skillData = await getSkillData();
      setLikeSkills(skillData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSkillData();
  }, []);

  return (
    <DefaultLayout>
      <Text as={"h1"} fontSize={"2xl"} fontWeight={"bold"} mb={2} data-testid="register-title">
        新規登録
      </Text>
      <Text as={"p"} fontSize={"md"} mb={6}>
        新規登録するには、以下の情報を入力してください。
      </Text>
      <RegisterInput onSubmit={onSubmit} likeSkills={likeSkills} isLoading={isLoading} />
    </DefaultLayout>
  );
};
