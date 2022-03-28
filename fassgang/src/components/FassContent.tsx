import React from "react";
import { Box } from "@chakra-ui/react";
import { IBarrel } from "../types";
import { Outlet, useLocation } from "react-router-dom";
import Fass from "./Fass";
import Intro from "./Intro";

interface IFassContent {
  exponatname: string;
  barrel: IBarrel;
}

function FassContent({ exponatname, barrel }: IFassContent) {
  const location = useLocation();
  return (
    <Box display="flex" flexDirection="row">
      <Fass
        image={barrel.image}
        year={barrel.year}
        circle_1_top={barrel.circle_1_top}
        circle_1_left={barrel.circle_1_left}
        circle_2_top={barrel.circle_2_top}
        circle_2_left={barrel.circle_2_left}
        circle_3_top={barrel.circle_3_top}
        circle_3_left={barrel.circle_3_left}
      />
      <Box w="1000px">
        {location.pathname.indexOf("news") === -1 &&
        location.pathname.indexOf("quote") === -1 &&
        location.pathname.indexOf("info") === -1 ? (
          <Intro exponatname={exponatname} year={barrel.year} />
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}

export default FassContent;
