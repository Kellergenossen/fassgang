import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { IBarrel } from "../types";
import { Outlet, useLocation } from "react-router-dom";
import Fass from "./Fass";
import Intro from "./Intro";
import Slider from "./Slider";
import { atom, useAtom } from "jotai";
import Contentbox from "./Contentbox";
import { createMarkup } from "../helper";

interface IFassContent {
  exponatname: string;
  barrel: IBarrel;
}

export const circleAtom = atom(0);

function FassContent({ exponatname, barrel }: IFassContent) {
  const location = useLocation();
  const [activeCircle, setActiveCircle] = useAtom(circleAtom);

  const activeStyle = {
    opacity: 1,
    top: 0,
    transition: "all 0.2s",
    transform: "translate3D(0, 0, 0)",
    justifyContent: "center",
  } as React.CSSProperties;

  const inactiveStyle = {
    opacity: 0,
    position: "absolute",
    zIndex: "-100",
    transition: "all 0.2s",
    transform: "translate3D(0, -16px, 0)",
  } as React.CSSProperties;

  return (
    <Box position="absolute" display="flex" flexDirection="row" h="90vh">
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
      {/* <Box w="1000px">
        {location.pathname.indexOf("news") === -1 &&
        location.pathname.indexOf("quote") === -1 &&
        location.pathname.indexOf("info") === -1 ? (
          <Intro exponatname={exponatname} year={barrel.year} />
        ) : (
          <Outlet />
        )}
      </Box> */}
      <Box
        zIndex="20"
        ml="5vw"
        width="45vw"
        h="100%"
        mt="5vh"
        overflow="hidden"
        position="relative"
      >
        <Contentbox style={activeCircle === 0 ? activeStyle : inactiveStyle}>
          <Box fontSize="6em" textAlign="center" fontWeight="bold">
            {barrel.year}
          </Box>
        </Contentbox>
        <Contentbox style={activeCircle === 1 ? activeStyle : inactiveStyle}>
          <Heading fontSize="2em" mb="32px">
            Rund ums Fass
          </Heading>
          <Box
            fontWeight="bold"
            dangerouslySetInnerHTML={createMarkup(barrel.quote)}
          />
          <Box
            mt="16px"
            dangerouslySetInnerHTML={createMarkup(barrel.quote_explanation)}
          />
        </Contentbox>
        <Contentbox style={activeCircle === 2 ? activeStyle : inactiveStyle}>
          <Heading fontSize="2em" mb="32px">
            Rund ums Fass
          </Heading>
          <Box dangerouslySetInnerHTML={createMarkup(barrel.description)} />
        </Contentbox>
        <Box h="100%" style={activeCircle === 3 ? activeStyle : inactiveStyle}>
          <Slider news={barrel.news} images={barrel.news_images} />
        </Box>
      </Box>
    </Box>
  );
}

export default FassContent;
