import { Box, Image, Stack, useTimeout } from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IBarrel } from "../types";
import { useState, useEffect, useRef } from "react";
import { circleAtom } from "./FassContent";
import { useAtom } from "jotai";
import path from "path";

interface ISidebarSlider {
  years: IBarrel[];
}

// * Node Red Connection
let isOnline = false;
// ! Zu localhost ändern?
// let connection = new WebSocket("ws://192.168.188.21:8080/api");
let connection = new WebSocket("ws://localhost:8080/api");
connection.onopen = function () {
  isOnline = true;
  console.log("connected");
  connection.send("client");
};

connection.onclose = function () {
  console.log("disconnected");
};

function sendClick(id: string, msg: string) {
  if (isOnline) {
    connection.send(`${id}_${msg}`);
    console.log("To node red: ", `${id}_${msg}`);
  }
}

const SidebarSlider = ({ years }: ISidebarSlider): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCircle, setActiveCircle] = useAtom(circleAtom);

  const itemSize = 70;

  const [selected, setSelected] = useState(14);
  const [yOffset, setYOffset] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setActiveCircle(0);
    if (selected !== 0) {
      setYOffset(280 + selected * itemSize * -1);
    } else {
      // setYOffset(350 + itemSize);
      setYOffset(280);
    }
    navigate(`/${years[selected].year}/`);
    sendClick("Fass-" + selected, "on");
  }, [selected]);

  // * timeout reset
  useEffect(() => {
    if (location.pathname.includes("1972")) {
      setSelected(14);
    }
  }, [location.pathname]);

  function handleTouchStart(e: React.TouchEvent) {
    e.cancelable && e.preventDefault();
    setYStart(e.touches[0].clientY);
    setIsMoving(true);
  }

  function stepUp() {
    if (selected > 0) {
      setSelected(selected - 1);
    }
    setIsMoving(false);
  }

  function stepDown() {
    if (selected < years.length) {
      setSelected(selected + 1);
    }
    setIsMoving(false);
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.cancelable && e.preventDefault();
    if (isMoving) {
      let distance = e.touches[0].clientY - yStart;
      if (distance > itemSize) {
        stepUp();
      } else if (distance < -itemSize) {
        stepDown();
      }
    }
  }

  return (
    <Box width="100%" mt="140px">
      <Box
        display="flex"
        justifyContent="flex-end"
        onMouseDown={() => {
          stepUp();
        }}
      >
        <Image w="48px" p="12px" src="../Chevron.svg" />
      </Box>
      <Box
        maxH="770px"
        overflowY="hidden"
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        mr="6px"
      >
        <Stack
          transition={"all 0.5s ease-in-out"}
          width="100%"
          spacing="0"
          willChange="transform"
          key="scrollContainer"
          transform={`translate3D(0, ${yOffset}px, 0)`}
        >
          {years.map((barrel, i) => {
            return (
              <Box
                key={`sb${barrel.year}`}
                height={`${itemSize}px`}
                width="100%"
                display="flex"
                alignItems="center"
              >
                <Box
                  onMouseDown={() => {
                    setSelected(i);
                  }}
                  fontSize="20px"
                  w="100%"
                  height="100%"
                  textAlign="right"
                  lineHeight={`${itemSize}px`}
                >
                  <span
                    style={
                      i === selected
                        ? {
                            transition: "all 0.2s",
                            fontWeight: "bold",
                            fontSize: "2em",
                          }
                        : { transition: "all 0.2s" }
                    }
                  >
                    {barrel.year}
                  </span>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        onMouseDown={() => stepDown()}
      >
        <Image
          transform="rotate(180deg)"
          w="48px"
          p="12px"
          src="../Chevron.svg"
        />
      </Box>
    </Box>
  );
};

export default SidebarSlider;
