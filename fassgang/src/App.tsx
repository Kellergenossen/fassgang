import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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

  const [imgsLoaded, setImgsLoaded] = useState(false);
  const IMAGES: string[] = [];

  const [arrayLoaded, setArrayLoaded] = useState(false);

  useEffect(() => {
    console.log("filling array");
    for (let i = 0; i < Content.barrels.length; i++) {
      IMAGES.push(Content.barrels[i].image);
    }
    console.log("done? ", IMAGES.length);
    setArrayLoaded(true);
  }, []);

  useEffect(() => {
    console.log("START USEEEFFECT: ", IMAGES);

    const loadImage = (image: unknown) => {
      console.log("image in load, ", image);
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = `../${image}`;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [arrayLoaded]);

  useEffect(() => {
    console.log("LOADED");
  }, [imgsLoaded]);

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
      {imgsLoaded ? (
        <Box bg="red" w="100%" h="100%">
          images ... {IMAGES.length}
          {IMAGES.map((image, i) => {
            return (
              <img width="300px" key={i + "image"} src={`../${image}`} alt="" />
            );
          })}
        </Box>
      ) : (
        <h1>Loading images...</h1>
      )}
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
