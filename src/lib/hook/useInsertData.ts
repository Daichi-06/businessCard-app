import { insertUserData } from "@/lib/api/getUserData";
import { useMessage } from "@/lib/hook/useMessage";
import { FormValidate } from "@/lib/types/type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useInsertData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const onSubmit = async (data: FormValidate) => {
    setIsLoading(true);
    try {
      await insertUserData(data);
      showMessage({ text: "登録が完了しました", type: "success" });
      navigate("/");
    } catch (error) {
      showMessage({ text: `登録に失敗しました: ${error}`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  return { onSubmit, isLoading };
};
