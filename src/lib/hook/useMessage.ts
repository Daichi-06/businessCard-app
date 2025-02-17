import { useCallback } from "react";

import { toaster } from "@/components/ui/toaster";

interface Props {
  text: string;
  type: "info" | "warning" | "success" | "error";
}

export const useMessage = () => {
  const showMessage = useCallback(({ text, type }: Props) => {
    toaster.create({
      description: text,
      type: type,
      meta: { closable: true },
      duration: 6000,
    });
  }, []);
  return { showMessage };
};
