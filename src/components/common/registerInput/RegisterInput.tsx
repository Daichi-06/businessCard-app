import { Controller, useForm } from "react-hook-form";

import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger } from "@/components/ui/select";
import { Button, createListCollection, Field, Input, SelectValueText } from "@chakra-ui/react";
import { Skill } from "@/lib/types/type";

import { Loading } from "@/components/Layout/Loading";

interface RegisterInputProps {
  likeSkills: Skill[];
  isLoading: boolean;
  onSubmit: (data: FormValidate) => void;
}

interface FormValidate {
  user_id: string;
  name: string;
  description: string;
  skill: Array<string>;
  githubId: string;
  qiitaId: string;
  xId: string;
}

export const RegisterInput = ({ likeSkills, isLoading, onSubmit }: RegisterInputProps) => {
  const likeSkillsCollection = createListCollection({
    items: likeSkills.map(({ name, id }) => ({ label: name, value: id })),
  });
  // onSubmit={handleSubmit(onSubmitHandler)}
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValidate>({
    defaultValues: {
      user_id: "",
      name: "",
      description: "",
      githubId: "",
      qiitaId: "",
      xId: "",
    },
  });
  // const onSubmit = (data: FormValidate) => {
  //   insertUserData(data)
  //     .then(() => {
  //       showMessage({ text: "登録が完了しました", type: "success" });
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       showMessage({ text: "登録に失敗しました", type: "error" });
  //     });
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Field.Root mb={4}>
            <Field.Label htmlFor="user_id" fontWeight={"bold"}>
              好きな英単語
            </Field.Label>
            <Input
              id="user_id"
              type="text"
              {...register("user_id", {
                required: "内容の入力は必須です",
              })}
              data-testid="input-user_id"
              placeholder="好きな英単語を入力してください"
            />
            {errors.user_id && <p>{errors.user_id.message}</p>}
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label htmlFor="name" fontWeight={"bold"}>
              お名前
            </Field.Label>
            <Input
              id="name"
              type="text"
              {...register("name", {
                required: "内容の入力は必須です",
                pattern: {
                  value: /^[A-Za-z0-9_\-!@#$%^&*()+=,.;:'"<>?/[\]{}|`~]+$/,
                  message: "英語で入力してね",
                },
              })}
              data-testid="input-user_name"
              placeholder="お名前を入力してください"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label htmlFor="description" fontWeight={"bold"}>
              自己紹介
            </Field.Label>
            <Input
              id="description"
              type="text"
              {...register("description", {
                required: "入力は必須です",
              })}
              data-testid="input-description"
              placeholder="自己紹介を入力してください<h1>タグも使用可能です"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </Field.Root>
          <Field.Root mb={4}>
            <Controller
              control={control}
              name="skill"
              rules={{
                required: "好きな技術の入力は必須です",
              }}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={likeSkillsCollection}
                  multiple
                >
                  <SelectLabel fontWeight={"bold"}>好きな技術</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="好きな技術を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {likeSkillsCollection.items.map((likeSkill) => (
                      <SelectItem item={likeSkill} key={likeSkill.value}>
                        {likeSkill.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
            {errors.skill && <p>{errors.skill.message}</p>}
          </Field.Root>
          {/* ここからSNS */}
          <Field.Root mb={4}>
            <Field.Label htmlFor="githubId" fontWeight={"bold"}>
              GitHub ID
            </Field.Label>
            <Input
              id="githubId"
              type="text"
              {...register("githubId", {
                pattern: {
                  value: /^[A-Za-z0-9_\-!@#$%^&*()+=,.;:'"<>?/[\]{}|`~]+$/,
                  message: "英語で入力してね",
                },
              })}
              data-testid="input-github-id"
              placeholder="GitHub IDを入力してください"
            />
            {errors.githubId && <p>{errors.githubId.message}</p>}
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label htmlFor="qiitaId" fontWeight={"bold"}>
              Qiita ID
            </Field.Label>
            <Input
              id="qiitaId"
              type="text"
              {...register("qiitaId", {
                pattern: {
                  value: /^[A-Za-z0-9_\-!@#$%^&*()+=,.;:'"<>?/[\]{}|`~]+$/,
                  message: "英語で入力してね",
                },
              })}
              data-testid="input-qiita-id"
              placeholder="Qiita IDを入力してください"
            />
            {errors.qiitaId && <p>{errors.qiitaId.message}</p>}
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label htmlFor="xId" fontWeight={"bold"}>
              X ID
            </Field.Label>
            <Input
              id="xId"
              type="text"
              {...register("xId", {
                pattern: {
                  value: /^[A-Za-z0-9_\-!@#$%^&*()+=,.;:'"<>?/[\]{}|`~]+$/,

                  message: "英語で入力してね",
                },
              })}
              data-testid="input-x-id"
              placeholder="X IDを入力してください"
            />
            {errors.xId && <p>{errors.xId.message}</p>}
          </Field.Root>
          <Button
            data-testid="register-button"
            mt={4}
            fontWeight={"bold"}
            bg={"teal.500"}
            color={"white"}
            type="submit"
          >
            登録する
          </Button>
        </>
      )}
    </form>
  );
};
