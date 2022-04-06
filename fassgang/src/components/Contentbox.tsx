import { Box, BoxProps, Center } from "@chakra-ui/react";

const Contentbox = (props: React.PropsWithChildren<BoxProps>): JSX.Element => {
  return (
    <Center display="flex" h="100%" pos="absolute" top="0" left="0" w="100%">
      <Box
        onMouseDown={props.onMouseDown}
        boxShadow={props.boxShadow}
        style={props.style}
        maxW="720px"
        h="fit-content"
        bg="black"
        transition="all 0.3s ease-out"
        display="flex"
        justifyContent="space-between"
        p="32px"
        flexDir="column"
        fontSize="28px"
        textAlign="left"
      >
        {props.children}
      </Box>
    </Center>
  );
};

export default Contentbox;
