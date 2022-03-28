import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

interface IIntro {
  exponatname: string;
  year: string;
}
function Intro({ exponatname, year }: IIntro) {
  return (
    <Box>
      <Text>{exponatname}</Text>
      <Text>{year}</Text>
    </Box>
  );
}

export default Intro;
