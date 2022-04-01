import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import test from "../media/newspapers/1969_welt.jpg";
import { createMarkup } from "../helper";

interface ISlider {
  news: string;
  images: string[];
}

const Slider = ({ news, images }: ISlider): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const style_left = {
    left: "-170px",
    transform: "scale(.6)",
    opacity: "0.2",
  };

  const style_right = {
    left: "170px",
    transform: "scale(.6)",
    opacity: "0.2",
  };

  const style_front = {
    transform: "scale(0.8)",
    zIndex: "10",
    left: "0",
  };

  useEffect(() => {
    console.log("currentSlide: ", currentSlide);
  }, [currentSlide]);

  console.log("image ", "../" + images[0]);
  console.log("images", images);

  return (
    <Box
      zIndex="20"
      ml="5vw"
      width="45vw"
      mt="5vh"
      overflow="hidden"
      position="relative"
      onClick={() => setCurrentSlide(currentSlide < 2 ? currentSlide + 1 : 0)}
    >
      <Box
        style={
          currentSlide === 1
            ? style_left
            : currentSlide === 2
            ? style_right
            : style_front
        }
        pos="absolute"
        w="fit-content"
        top="-10%"
        h="120%"
        bg="black"
        transition="all 0.3s ease-out"
        display="flex"
        justifyContent="space-between"
        boxShadow="0px 0px 15px 2px rgba(255, 255, 255, 0.2)"
        p="32px"
        flexDir="column"
      >
        <Heading mb="44px" fontSize="3em">
          Ingelheim und die Welt
        </Heading>
        <Box
          textAlign="left"
          fontSize="2.6em"
          dangerouslySetInnerHTML={createMarkup(news)}
        />
      </Box>
      <Box
        style={
          currentSlide === 0
            ? style_left
            : currentSlide === 1
            ? style_right
            : style_front
        }
        pos="absolute"
        w="100%"
        top="-10%"
        h="120%"
        transition="all 0.3s ease-out"
        display="flex"
        justifyContent="center"
      >
        <Image h="100%" src={require(`../${images[0]}`)} />
      </Box>
      <Box
        style={
          currentSlide === 0
            ? style_right
            : currentSlide === 2
            ? style_left
            : style_front
        }
        pos="absolute"
        w="100%"
        top="-10%"
        h="120%"
        transition="all 0.3s ease-out"
        display="flex"
        justifyContent="center"
      >
        <Image h="100%" src={require(`../${images[1]}`)} />
      </Box>
    </Box>
  );
};

export default Slider;
