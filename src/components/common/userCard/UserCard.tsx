import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";

/**
 * タイプ
 */
import { UserWithSkills } from "@/lib/types/type";
/**
 * アイコン
 */
import { FaGithubSquare } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  userSkillList: UserWithSkills;
}
export const UserCard = ({ userSkillList }: UserCardProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <Box
      bg={"white"}
      p={4}
      borderRadius={"md"}
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      transform={"translate(-50%, -50%)"}
      maxW={"300px"}
      shadow={"md"}
      maxH={"300px"}
      w={"70%"}
      h={"70%"}
    >
      <Box key={userSkillList.user_id}>
        <Text textAlign={"center"} fontWeight={"bold"} data-testid="user-name">
          {userSkillList.name}
        </Text>
        <Text
          mt={4}
          dangerouslySetInnerHTML={{
            __html: userSkillList.description,
          }}
          data-testid="user-description"
        />
        <Text fontWeight={"bold"} mt={4} mb={2}>
          スキル
        </Text>
        <Text data-testid="user-skills">{userSkillList.skills.map((skill) => skill.name)}</Text>
        <Flex mt={"5"} gap={"10px"}>
          {userSkillList.github_id && (
            <Link w={"30px"} h={"30px"} display={"block"} href={`https://github.com/${userSkillList.github_id}`}>
              <FaGithubSquare size={30} data-testid="user-github-link" />
            </Link>
          )}
          {userSkillList.qiita_id && (
            <Link w={"30px"} h={"30px"} display={"block"} href={`https://qiita.com/${userSkillList.qiita_id}`}>
              <FaStickyNote size={30} data-testid="user-qiita-link" />
            </Link>
          )}
          {userSkillList.x_id && (
            <Link w={"30px"} h={"30px"} display={"block"} href={`https://x.com/${userSkillList.x_id}`}>
              <FaSquareXTwitter size={30} data-testid="user-x-link" />
            </Link>
          )}
        </Flex>
      </Box>
      <Button onClick={handleBack} mt={5} w={"100%"} bg={"blue.500"} color={"white"}>
        戻る
      </Button>
    </Box>
  );
};
