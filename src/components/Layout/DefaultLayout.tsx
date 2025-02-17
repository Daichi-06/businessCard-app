import { Box } from "@chakra-ui/react";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export const DefaultLayout = ({ children }: Props) => {
  return (
    <Box bg={"gray.300"} h={"100vh"} position={"relative"}>
      <Box
        bg={"white"}
        p={4}
        borderRadius={"md"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        maxW={"380px"}
        shadow={"md"}
        minH={"300px"}
        w={"80%"}
        h={"auto"}
      >
        {children}
      </Box>
    </Box>
  );
};
