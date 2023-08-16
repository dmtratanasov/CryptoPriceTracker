import React, { useState, useEffect, useReducer } from "react";
import Navbar from "./components/Navbar/NavBar";
import CryptoList from "./components/CryptoList/CryptoList";
import useCryptoData from "./hooks/useCryptoData"; // Custom hook
import "./App.css"; // If you have additional global styles
import SelectedCryptoList from "./components/SelectedCryptoList/SelectedCryptoList";
import CryptoBackground from "./assets/images/crypto_background.jpg";
import { CryptoData } from "./utils/api";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import AllSelectedCrypto from "./components/AllSelectedCryptoList/AllSelectedCrypto";
import { Typography } from "@mui/material";

export const ACTIONS = {
  SET_SELECTED_CURRENCIES: "SET_SELECTED_CURRENCIES",
  REMOVE_SELECTED_CURRENCIES: "REMOVE_SELECTED_CURRENCIES",
};

function App() {
  const selectedCurrenciesReducer = (state: any, action: any) => {
    const { type, payload } = action;

    const addToLocalStorage = (selectedCurrencies: CryptoData[]) => {
      const stringifiedSelectedCurrencies = JSON.stringify(selectedCurrencies);
      localStorage.setItem("selectedCurrencies", stringifiedSelectedCurrencies);
    };

    switch (type) {
      case ACTIONS.SET_SELECTED_CURRENCIES:
        addToLocalStorage({
          ...state,
          selectedCurrenciesIds: [...state.selectedCurrenciesIds, payload],
        });
        setLocalStorageCurrencies({
          ...state,
          selectedCurrenciesIds: [...state.selectedCurrenciesIds, payload],
        });
        return {
          ...state,
          selectedCurrenciesIds: [...state.selectedCurrenciesIds, payload],
        };
      case ACTIONS.REMOVE_SELECTED_CURRENCIES:
        addToLocalStorage({
          ...state,
          selectedCurrenciesIds: state.selectedCurrenciesIds.filter(
            (symbol: string) => symbol !== payload
          ),
        });
        setLocalStorageCurrencies({
          ...state,
          selectedCurrenciesIds: [...state.selectedCurrenciesIds, payload],
        });
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

  const [localStorageCurrencies, setLocalStorageCurrencies] = useState<
    string[]
  >([]);
  const [selectedCurrenciesData, dispatch] = useReducer(
    selectedCurrenciesReducer,
    { selectedCurrenciesIds: [] }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { cryptocurrencies, fetchData } = useCryptoData(
    searchQuery !== "" ? searchQuery : undefined
  );

  useEffect(() => {
    const localStorageItem = localStorage.getItem("selectedCurrencies");
    if (localStorageItem) {
      const tempIds: string[] =
        JSON.parse(localStorageItem).selectedCurrenciesIds;
      setLocalStorageCurrencies(tempIds);
      tempIds.forEach((id: string) => {
        dispatch({ type: ACTIONS.SET_SELECTED_CURRENCIES, payload: id });
      });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Router>
        <div
          className="crypto-list-wrapper"
          style={{ backgroundImage: `url(${CryptoBackground})` }}
        >
          <Typography variant="h4" component="div" className="title">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Crypto Lookup
            </Link>
          </Typography>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar onSearch={handleSearch} />
                  <SelectedCryptoList
                    selectedCurrenciesIds={
                      selectedCurrenciesData.selectedCurrenciesIds
                    }
                  />
                  <CryptoList
                    cryptocurrencies={cryptocurrencies}
                    manageSelectedCurrenciesDispatch={dispatch}
                    selectedCurrencies={
                      selectedCurrenciesData.selectedCurrenciesIds
                    }
                  />
                </>
              }
            />
            <Route
              path="/selected"
              element={
                <>
                  <AllSelectedCrypto
                    selectedCurrenciesIds={
                      selectedCurrenciesData.selectedCurrenciesIds
                    }
                  />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Fallback route */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
