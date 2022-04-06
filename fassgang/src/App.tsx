import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { IRoot } from "./types";
import * as content from "./exponat.json";
import FassContent, { circleAtom } from "./components/FassContent";
import News from "./components/News";
import Quote from "./components/Quote";
import Sidebar from "./components/Sidebar";
import Intro from "./components/Intro";
import Info from "./components/Info";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useAtom } from "jotai";

const Content: IRoot = content;

function App() {
  let location = useLocation();
  const [currentCircle, setCurrentCircle] = useAtom(circleAtom);

  return (
    <Box
      className="App"
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="row"
      color="#BCC1B2"
      overflow="hidden"
    >
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={300} classNames="fade">
          <Routes>
            {Content.barrels.map((barrel, i) => {
              return (
                <Route
                  key={`barrel-${i}-${barrel.year}`}
                  path={`/${barrel.year}`}
                  element={
                    <FassContent
                      exponatname={Content.exponatname}
                      barrel={barrel}
                    />
                  }
                ></Route>
              );
            })}
            <Route path="*" element={<Navigate to="/1972" replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Box
        transition="all 0.4s"
        opacity={currentCircle === 0 ? 1 : 0}
        transform={currentCircle === 0 ? "translateY(0)" : "translateY(-22px)"}
        fontSize="2.34vw"
        fontWeight="bold"
        zIndex="10000"
        position="absolute"
        top="5vh"
        right="15.2vw"
        width="45vw"
      >
        {Content.exponatname}
      </Box>
      <Sidebar years={Content.barrels} />
    </Box>
  );
}

export default App;
