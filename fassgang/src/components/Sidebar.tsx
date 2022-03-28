import React from "react";
import { Box } from "@chakra-ui/react";
import { IBarrel } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

interface ISidebar {
  years: IBarrel[];
}

function Sidebar({ years }: ISidebar) {
  const navigate = useNavigate();
  return (
    <Box
      background="#BCC1B2"
      width="260px"
      color="#71210D"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="end"
      paddingRight="30px"
    >
      <Box w="32px">
        {/* <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.8787 1.37868C28.0503 0.207107 29.9497 0.207107 31.1213 1.37868L56.6213 26.8787C57.7929 28.0503 57.7929 29.9497 56.6213 31.1213C55.4497 32.2929 53.5503 32.2929 52.3787 31.1213L29 7.74264L5.62132 31.1213C4.44975 32.2929 2.55025 32.2929 1.37868 31.1213C0.207107 29.9497 0.207107 28.0503 1.37868 26.8787L26.8787 1.37868Z"
            fill="#71210D"
          />
        </svg> */}
      </Box>
      {years.map((barrel) => {
        return (
          <Box
            key={`sb${barrel.year}`}
            height="40px"
            display="flex"
            alignItems="center"
          >
            <Box
              onMouseDown={() => {
                navigate(`/${barrel.year}/`);
              }}
              fontSize="20px"
            >
              {barrel.year}
            </Box>
          </Box>
        );
      })}
      <Box w="32px">
        {/* <svg
          className="rotatedChevron"
          viewBox="0 0 58 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.8787 1.37868C28.0503 0.207107 29.9497 0.207107 31.1213 1.37868L56.6213 26.8787C57.7929 28.0503 57.7929 29.9497 56.6213 31.1213C55.4497 32.2929 53.5503 32.2929 52.3787 31.1213L29 7.74264L5.62132 31.1213C4.44975 32.2929 2.55025 32.2929 1.37868 31.1213C0.207107 29.9497 0.207107 28.0503 1.37868 26.8787L26.8787 1.37868Z"
            fill="#71210D"
          />
        </svg> */}
      </Box>
    </Box>
  );
}

export default Sidebar;
