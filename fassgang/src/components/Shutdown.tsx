import { Box, Button, Heading, HStack, Modal } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Shutdown = (): JSX.Element => {
  const [clickCount, setClickCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (clickCount >= 5 && !modalOpen) {
      setModalOpen(true);
    }
  }, [clickCount]);

  useEffect(() => {
    let timer: any;
    if (clickCount >= 1) {
      timer = setTimeout(() => {
        setClickCount(0);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [clickCount]);

  return (
    <>
      <Box
        width="150px"
        position="absolute"
        left="0"
        bottom="0"
        height="150px"
        onClick={() => setClickCount(clickCount + 1)}
      />
      <Box
        w="400px"
        bg="white"
        zIndex="100"
        left="710px"
        position="absolute"
        top="390px"
        borderRadius="16px"
        color="black"
        p="32px"
        display={modalOpen ? "block" : "none"}
      >
        <Heading mb="32px">PC herunterfahren?</Heading>
        <HStack w="100%" justifyContent="center" margin="auto">
          <a href="/shutdown">
            <Button size="lg" colorScheme="green">
              Herunterfahren
            </Button>
          </a>
          <Button
            onClick={() => {
              setModalOpen(false);
              setClickCount(0);
            }}
            size="lg"
            colorScheme="red"
          >
            Abbrechen
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Shutdown;
