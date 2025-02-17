import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { Text } from "@chakra-ui/react";
import { RegisterInput } from "@/components/common/registerInput/RegisterInput";

const likeSkills = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

export const Register = () => {
  return (
    <DefaultLayout>
      <Text as={"h1"} fontSize={"2xl"} fontWeight={"bold"} mb={2}>
        新規登録
      </Text>
      <Text as={"p"} fontSize={"md"} mb={6}>
        新規登録するには、以下の情報を入力してください。
      </Text>
      <RegisterInput likeSkills={likeSkills} />
    </DefaultLayout>
  );
};
