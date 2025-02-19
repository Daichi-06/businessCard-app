import { Box } from "@chakra-ui/react";
interface Props {
  children: React.ReactNode;
}
export const DefaultLayout = ({ children }: Props) => {
  return (
    <Box
      bg={"gray.300"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={4}
      h={"100%"}
      minH={"100vh"}
      position={"relative"}
    >
      <Box
        bg={"white"}
        p={4}
        borderRadius={"md"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        maxW={"380px"}
        shadow={"md"}
        minH={"300px"}
        w={"80%"}
        h={"100%"}
      >
        {children}
      </Box>
    </Box>
  );
};
