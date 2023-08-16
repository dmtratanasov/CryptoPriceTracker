import React, { useState, useEffect, useReducer } from "react";
import Navbar from "./components/Navbar/NavBar";
import CryptoList from "./components/CryptoList/CryptoList";
import useCryptoData from "./hooks/useCryptoData"; // Custom hook
import "./App.css"; // If you have additional global styles
import SelectedCryptoList from "./components/SelectedCryptoList/SelectedCryptoList";
import CryptoBackground from "./assets/images/crypto_background.jpg"


export const ACTIONS = {
  SET_SELECTED_CURRENCIES: "SET_SELECTED_CURRENCIES",
  REMOVE_SELECTED_CURRENCIES: "REMOVE_SELECTED_CURRENCIES",
};

function App() {
  const selectedCurrenciesReducer = (state: any, action: any) => {
    const { type, payload } = action;

    switch (type) {
      case ACTIONS.SET_SELECTED_CURRENCIES:
        return {
          ...state,
          selectedCurrenciesIds: [...state.selectedCurrenciesIds, payload],
        };
      case ACTIONS.REMOVE_SELECTED_CURRENCIES:
        return {
          ...state,
          selectedCurrenciesIds: state.selectedCurrenciesIds.filter(
            (symbol: string) => symbol !== payload
          ),
        };
      default:
        return state;
    }
  };
  const [selectedCurrenciesData, dispatch] = useReducer(
    selectedCurrenciesReducer,
    { selectedCurrenciesIds: [] }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { cryptocurrencies, fetchData } = useCryptoData(
    searchQuery !== "" ? searchQuery : undefined
  );

  useEffect(() => {
    console.log(selectedCurrenciesData, "AUUFFF");
  }, [selectedCurrenciesData]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <div
        className="crypto-list-wrapper"
        style={{ backgroundImage: `url(${CryptoBackground})` }}
      >
        <Navbar onSearch={handleSearch} />
        <SelectedCryptoList
          selectedCurrenciesIds={selectedCurrenciesData.selectedCurrenciesIds}
        />
        <CryptoList
          cryptocurrencies={cryptocurrencies}
          manageSelectedCurrenciesDispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default App;
