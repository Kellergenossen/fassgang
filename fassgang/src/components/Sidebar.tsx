import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { IBarrel } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarSlider from "./SidebarSlider";
import { useAtom } from "jotai";
import { circleAtom } from "./FassContent";

interface ISidebar {
  years: IBarrel[];
}

function Sidebar({ years }: ISidebar) {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useAtom(circleAtom);

  return (
    <Box
      background="#BCC1B2"
      width="260px"
      color="#71210D"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="end"
      paddingRight="24px"
      paddingLeft="30px"
      position="absolute"
      right="0"
      height="100%"
    >
      <Image
        src="../fassgang-logo.svg"
        w="40px"
        position="absolute"
        top="32px"
        right="32px"
        onMouseDown={() => setActiveCircle(0)}
      />
      <SidebarSlider years={years} />
    </Box>
  );
}

export default Sidebar;
