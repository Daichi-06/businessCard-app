import { useEffect, useState } from "react";

import { UserWithSkills } from "@/lib/types/type";

import { useParams } from "react-router-dom";
import { getUserSkillData } from "@/lib/api/getUserData";
import { Box } from "@chakra-ui/react";
import { Loading } from "@/components/Layout/Loading";
import { UserCard } from "@/components/common/userCard/UserCard";
import { useMessage } from "@/lib/hook/useMessage";

export const CardsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [userSkillList, setUserSkillList] = useState<UserWithSkills[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useMessage();
  useEffect(() => {
    if (!id) {
      alert("idがありません");
      return;
    }
    const fetchUserSkillList = async () => {
      setIsLoading(true);
      try {
        const userSkillListData = await getUserSkillData(id);
        setUserSkillList(userSkillListData);
      } catch (error) {
        setIsLoading(false);
        showMessage({ text: `エラーが発生しました: ${error}`, type: "error" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserSkillList();
  }, []);
  return (
    <Box bg={"gray.300"} h={"100vh"} position={"relative"}>
      {isLoading ? (
        <Box position={"absolute"} top={"50%"} left={"50%"} transform={"translate(-50%, -50%)"}>
          <Loading />
        </Box>
      ) : (
        <UserCard userSkillList={userSkillList} />
      )}
    </Box>
  );
};
