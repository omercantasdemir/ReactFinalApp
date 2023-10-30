import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography align="center">
          This is the home page of the application.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
