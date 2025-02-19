import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { useMessage } from "@/lib/hook/useMessage";
import { Text, Input, Button, Field } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValidate {
  id: string;
}
export const Home = () => {
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidate>({
    defaultValues: {
      id: "",
    },
  });
  const onSubmit = (data: FormValidate) => {
    navigate(`/cards/${data.id}`);
    showMessage({ text: "ログインに成功しました", type: "success" });
  };
  const handleRegister = () => {
    navigate("/cards/register");
  };
  return (
    <>
      <DefaultLayout>
        <Text data-testid="home-title" as={"h1"} fontSize={"2xl"} fontWeight={"bold"} mb={4}>
          ホーム
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root>
            <Field.Label htmlFor="id">ID</Field.Label>
            <Input id="id" data-testid="input-id" {...register("id", { required: "IDを入力してください" })} />
            {errors.id && (
              <Text data-testid="error-message" color={"red"}>
                {errors.id.message}
              </Text>
            )}
          </Field.Root>
          <Button data-testid="login-button" mt={5} w={"100%"} bg={"blue.500"} color={"white"} type="submit">
            ログイン
          </Button>
        </form>
        <Button onClick={handleRegister} mt={5} w={"100%"} bg={"gray.500"} color={"white"}>
          新規登録
        </Button>
      </DefaultLayout>
    </>
  );
};
