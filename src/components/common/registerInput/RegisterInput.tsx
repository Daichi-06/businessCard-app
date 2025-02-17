import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger } from "@/components/ui/select";
import { createListCollection, Field, Input, SelectValueText } from "@chakra-ui/react";

interface LikeSkill {
  value: string;
  label: string;
}

interface RegisterInputProps {
  likeSkills: LikeSkill[];
}

export const RegisterInput = ({ likeSkills }: RegisterInputProps) => {
  const likeSkillsCollection = createListCollection({ items: likeSkills });

  return (
    // onSubmit={handleSubmit(onSubmitHandler)}
    <form>
      <Field.Root mb={4}>
        <Field.Label htmlFor="name" fontWeight={"bold"}>
          お名前
        </Field.Label>
        <Input
          id="name"
          type="text"
          // {...register("text", {
          //   required: "内容の入力は必須です",
          // })}
          // data-testid="input-title"
          // placeholder="TODO内容を入力してください"
        />
        {/* {errors.text && <p>{errors.text.message}</p>} */}
      </Field.Root>
      <Field.Root mb={4}>
        <Field.Label htmlFor="selfProduce" fontWeight={"bold"}>
          自己紹介
        </Field.Label>
        <Input
          id="selfProduce"
          type="text"
          // {...register("time", {
          //   required: "時間の入力は必須です",
          //   validate: (value) => value > 0 || "時間は0以上である必要があります",
          // })}
          data-testid="input-time"
          placeholder="勉強時間を入力してください"
        />
        {/* {errors.time && <p>{errors.time.message}</p>} */}
      </Field.Root>
      <SelectRoot collection={likeSkillsCollection} size="sm" mb={4}>
        <SelectLabel fontWeight={"bold"}>好きな技術</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select movie" />
        </SelectTrigger>
        <SelectContent>
          {likeSkills.map((likeSkill) => (
            <SelectItem item={likeSkill} key={likeSkill.value}>
              {likeSkill.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {/* ここからSNS */}
      <Field.Root mb={4}>
        <Field.Label htmlFor="githubId" fontWeight={"bold"}>
          GitHub ID
        </Field.Label>
        <Input
          id="githubId"
          type="text"
          // {...register("time", {
          //   required: "時間の入力は必須です",
          //   validate: (value) => value > 0 || "時間は0以上である必要があります",
          // })}
          data-testid="input-time"
          placeholder="勉強時間を入力してください"
        />
        {/* {errors.time && <p>{errors.time.message}</p>} */}
      </Field.Root>
      <Field.Root mb={4}>
        <Field.Label htmlFor="qiitaId" fontWeight={"bold"}>
          Qiita ID
        </Field.Label>
        <Input
          id="qiitaId"
          type="text"
          // {...register("time", {
          //   required: "時間の入力は必須です",
          //   validate: (value) => value > 0 || "時間は0以上である必要があります",
          // })}
          data-testid="input-time"
          placeholder="勉強時間を入力してください"
        />
        {/* {errors.time && <p>{errors.time.message}</p>} */}
      </Field.Root>
      <Field.Root mb={4}>
        <Field.Label htmlFor="xId" fontWeight={"bold"}>
          X ID
        </Field.Label>
        <Input
          id="xId"
          type="text"
          // {...register("time", {
          //   required: "時間の入力は必須です",
          //   validate: (value) => value > 0 || "時間は0以上である必要があります",
          // })}
          data-testid="input-time"
          placeholder="勉強時間を入力してください"
        />
        {/* {errors.time && <p>{errors.time.message}</p>} */}
      </Field.Root>
    </form>
  );
};
