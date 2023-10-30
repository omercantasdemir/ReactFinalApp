import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const SharedContext = React.createContext();
const apiKey = "fca_live_h9Z4KqNcWCw8rKxZ6VMzGrFuUyh1DM9rxqg87Ffx";
const Provider = ({ children }) => {
  // Tüm oranların tutulacağı state
  const [rates, setRates] = useState([]);
  // Kur sembollerinin tutulacağı state
  const [symbolList, setSymbolList] = useState([]);
  // Oranda baz alınacak kur codu
  const [baseCurrency, setBaseCurrency] = useState("TRY");

  //Objeleri key sahibi arraylere çevirmek içindi. Gerek kalmadı.
  //
  // function convert(obj) {
  //   return Object.keys(obj).map((key) => ({
  //     code: key,
  //     value: obj[key],
  //   }));
  // }

  //Kurların api requestte kullanılacak sembollerini alan fonksiyon.
  const getSymbols = async () => {
    const listedItems = await axios.get("/currencyList.json");
    setSymbolList(listedItems.data);
  };
  // Api request
  const completeRequest = async () => {
    var allRateQuery = "";
    symbolList.map((currencies) => {
      allRateQuery = allRateQuery + currencies.code + ",";
    });
    allRateQuery = allRateQuery.slice(0, -1);
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${allRateQuery} `
    );
    setRates(response.data.data);
  };

  //Apiden bilgileri tek tek çekmek için yazılmış dinamik sorgu. Gerek kalmadı
  //
  // const customRequest = async (code) => {
  //   const response = await axios.get(
  //     `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${code}`
  //   );
  //   setSingularValue(convert(response.data.data));
  // };

  useEffect(() => {
    getSymbols();
    symbolList.length === 1 ? null : completeRequest();
  }, []);

  const sharedMethodsAndValues = {
    completeRequest,
    rates,
    setRates,
    symbolList,
    setSymbolList,
    baseCurrency,
    setBaseCurrency,
  };
  return (
    <SharedContext.Provider value={sharedMethodsAndValues}>
      {children}
    </SharedContext.Provider>
  );
};

export { Provider };
export default SharedContext;
