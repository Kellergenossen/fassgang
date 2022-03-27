import React from "react";
import { Box, Image } from "@chakra-ui/react";
import testImage from "../media/barrels/70.png";
import { useNavigate } from "react-router-dom";

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
  return (
    <Box w="660px" display="flex" alignItems="center" justifyContent="end">
      <Box>
        <Box
          className="circle_1 pulsating-circle"
          position="absolute"
          top={circle_1_top}
          left={circle_1_left}
          onMouseDown={() => {
            navigate(`/${year}/info`);
          }}
        ></Box>
        <Box
          className="circle_2 pulsating-circle"
          position="absolute"
          top={circle_2_top}
          left={circle_2_left}
          onMouseDown={() => {
            navigate(`/${year}/news`);
          }}
        ></Box>
        <Box
          className="circle_3 pulsating-circle"
          position="absolute"
          top={circle_3_top}
          left={circle_3_left}
          onMouseDown={() => {
            navigate(`/${year}/quote`);
          }}
        ></Box>
      </Box>
      <Image width="630px" src={require(`../${image}`)} />
    </Box>
  );
}

export default Fass;
