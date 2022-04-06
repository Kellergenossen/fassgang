import React from "react";
import { Box, Image } from "@chakra-ui/react";
import testImage from "../media/barrels/70.png";
import { useNavigate } from "react-router-dom";
import { circleAtom } from "./FassContent";
import { useAtom } from "jotai";

interface IFass {
  image: string;
  year: string;
  circle_1_top: string;
  circle_1_left: string;
  circle_2_top: string;
  circle_2_left: string;
  circle_3_top: string;
  circle_3_left: string;
}
function Fass({
  image,
  year,
  circle_1_top,
  circle_1_left,
  circle_2_top,
  circle_2_left,
  circle_3_top,
  circle_3_left,
}: IFass) {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useAtom(circleAtom);

  return (
    <Box
      w="660px"
      mt="5vh"
      h="100%"
      ml="8px"
      display="flex"
      alignItems="center"
      justifyContent="end"
    >
      <Box position="absolute" h="100vh" w="100vw" left="0">
        <Box
          className={"circle circle_1 pulsating-circle"}
          position="absolute"
          transition="all .2s"
          opacity={activeCircle === 1 ? "1" : ".8"}
          transform={activeCircle === 1 ? "scale(1.2)" : "scale(1)"}
          mt={circle_1_top}
          ml={circle_1_left}
          onMouseDown={() => {
            // navigate(`/${year}/info`);
            setActiveCircle(1);
          }}
        ></Box>
        <Box
          className="circle circle_2 pulsating-circle"
          position="absolute"
          transition="all .2s"
          opacity={activeCircle === 2 ? "1" : ".8"}
          transform={activeCircle === 2 ? "scale(1.2)" : "scale(1)"}
          mt={circle_2_top}
          ml={circle_2_left}
          onMouseDown={() => {
            // navigate(`/${year}/news`);
            setActiveCircle(2);
          }}
        ></Box>
        <Box
          className="circle circle_3 pulsating-circle"
          position="absolute"
          transition="all .2s"
          opacity={activeCircle === 3 ? "1" : ".8"}
          transform={activeCircle === 3 ? "scale(1.2)" : "scale(1)"}
          mt={circle_3_top}
          ml={circle_3_left}
          onMouseDown={() => {
            // navigate(`/${year}/quote`);
            setActiveCircle(3);
          }}
        ></Box>
      </Box>
      <Image width="630px" src={require(`../${image}`)} />
    </Box>
  );
}

export default Fass;
