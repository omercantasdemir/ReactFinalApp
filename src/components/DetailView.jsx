import { useParams } from "react-router";
import SharedContext from "./SharedContext";
import { Typography, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const DetailView = () => {
  const { code } = useParams();
  const { completeRequest, baseCurrency, symbolList, rates } =
    useContext(SharedContext);
  //Oranlardaki kurların isimleri
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  // Kodları kullanarak listeden gerekli isimleri bulup set eden fonksiyon
  const prettize = () => {
    debugger;
    symbolList.map((currency) => {
      baseCurrency === currency.code ? setToName(currency.name) : null;
      code === currency.code ? setFromName(currency.name) : null;
    });
  };
  const viewFunction = () => {
    if (rates.length === 0) {
      return (
        <>
          <Typography align="center">Loading...</Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography align="center">
            This contains details for 1 {fromName} which is worth{" "}
            {Math.round((1 / rates[`${code}`]) * 100) / 100} {toName}.
          </Typography>
        </>
      );
    }
  };
  // code veya baseCurrency değişince çalışır
  useEffect(() => {
    completeRequest();
    prettize();
  }, [code, baseCurrency]);

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      {viewFunction()}
      <Box />
    </>
  );
};

export default DetailView;
