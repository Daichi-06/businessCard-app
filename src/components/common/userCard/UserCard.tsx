import { Box, Flex, Link, Text } from "@chakra-ui/react";

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

interface UserCardProps {
  userSkillList: UserWithSkills[];
}
export const UserCard = ({ userSkillList }: UserCardProps) => {
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
      {userSkillList.map((userSkill) => (
        <Box key={userSkill.user_id}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            {userSkill.name}
          </Text>
          <Text
            mt={4}
            dangerouslySetInnerHTML={{
              __html: userSkill.description,
            }}
          />
          <Text fontWeight={"bold"} mt={4} mb={2}>
            スキル
          </Text>
          <Text>{userSkill.skills.map((skill) => skill.name)}</Text>
          <Flex mt={"5"} gap={"10px"}>
            {userSkill.github_id && (
              <Link w={"30px"} h={"30px"} display={"block"} href={`https://github.com/${userSkill.github_id}`}>
                <FaGithubSquare size={30} />
              </Link>
            )}
            {userSkill.qiita_id && (
              <Link w={"30px"} h={"30px"} display={"block"} href={`https://qiita.com/${userSkill.qiita_id}`}>
                <FaStickyNote size={30} />
              </Link>
            )}
            {userSkill.x_id && (
              <Link w={"30px"} h={"30px"} display={"block"} href={`https://x.com/${userSkill.x_id}`}>
                <FaSquareXTwitter size={30} />
              </Link>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
