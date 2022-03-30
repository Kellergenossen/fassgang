import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { IRoot } from "./types";
import * as content from "./exponat.json";
import FassContent from "./components/FassContent";
import News from "./components/News";
import Quote from "./components/Quote";
import Sidebar from "./components/Sidebar";
import Intro from "./components/Intro";
import Info from "./components/Info";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Content: IRoot = content;

function App() {
  let location = useLocation();

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
                >
                  {/* <Route path="news" element={<News />} />
                  <Route path="quote" element={<Quote />} />
                  <Route path="info" element={<Info />} /> */}
                </Route>
              );
            })}
            <Route path="*" element={<Navigate to="/1972" replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Sidebar years={Content.barrels} />
    </Box>
  );
}

export default App;
