import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import test from "../media/newspapers/1969_welt.jpg";
import { createMarkup } from "../helper";
import Contentbox from "./Contentbox";

interface ISlider {
  news: string;
  images: string[];
}

const Slider = ({ news, images }: ISlider): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const style_left = {
    left: "-170px",
    transform: "scale(.6)",
    filter: "brightness(0.2)",
    maxWidth: "870px",
  };

  const style_right = {
    left: "30px",
    transformOrigin: "right",
    transform: "scale(.6)",
    filter: "brightness(0.2)",
    maxWidth: "870px",
  };

  const style_front = {
    transform: "scale(0.8)",
    zIndex: "10",
    left: "0",
    maxWidth: "870px",
  };

  const [xStart, setXStart] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  function handleTouchStart(e: React.TouchEvent) {
    e.cancelable && e.preventDefault();
    setXStart(e.touches[0].clientX);
    setIsMoving(true);
  }

  function handleSlide(to: "up" | "down") {
    if (images.length === 1) {
      if (currentSlide === 0) {
        setCurrentSlide(2);
      } else {
        setCurrentSlide(0);
      }
    } else if (to === "down") {
      if (currentSlide === 0) {
        setCurrentSlide(images.length);
      } else {
        setCurrentSlide(currentSlide - 1);
      }
    } else {
      if (currentSlide === images.length) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }
    setIsMoving(false);
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.cancelable && e.preventDefault();
    if (isMoving) {
      let distance = e.touches[0].clientX - xStart;
      if (distance > 200) {
        handleSlide("down");
      } else if (distance < -200) {
        handleSlide("up");
      }
    }
  }

  return (
    <Box
      zIndex="20"
      width="45vw"
      h="100%"
      overflow="hidden"
      position="relative"
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
    >
      <Contentbox
        boxShadow="0 0 1vw #71210d"
        style={
          currentSlide === 1
            ? style_left
            : currentSlide === 2
            ? style_right
            : style_front
        }
        onMouseDown={() => setCurrentSlide(0)}
      >
        <Heading mb="44px" fontSize="2em">
          Ingelheim und die Welt
        </Heading>
        <Box fontSize="1.4em" dangerouslySetInnerHTML={createMarkup(news)} />
      </Contentbox>
      <Box
        boxShadow="0 0 1vw #71210d"
        style={
          currentSlide === 0
            ? style_left
            : currentSlide === 1
            ? style_right
            : style_front
        }
        pos="absolute"
        top="-10%"
        h="120%"
        bg="black"
        transition="all 0.3s ease-out"
        display="flex"
        justifyContent="center"
        onMouseDown={() => setCurrentSlide(2)}
      >
        <Image h="100%" src={require(`../${images[0]}`)} />
      </Box>
      {images.length > 1 && (
        <Box
          boxShadow="0 0 1vw #71210d"
          style={
            currentSlide === 0
              ? style_right
              : currentSlide === 2
              ? style_left
              : style_front
          }
          pos="absolute"
          bg="black"
          top="-10%"
          h="120%"
          transition="all 0.3s ease-out"
          display="flex"
          justifyContent="center"
          onMouseDown={() => setCurrentSlide(1)}
        >
          <Image h="100%" src={require(`../${images[1]}`)} />
        </Box>
      )}
    </Box>
  );
};

export default Slider;
