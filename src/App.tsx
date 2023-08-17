import React, { useState, useEffect, useReducer } from "react";
import Navbar from "./components/Navbar/NavBar";
import CryptoList from "./components/CryptoList/CryptoList";
import useCryptoData from "./hooks/useCryptoData";
import "./App.css";
import SelectedCryptoList from "./components/SelectedCryptoList/SelectedCryptoList";
import { CryptoData } from "./utils/api";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import AllSelectedCrypto from "./components/AllSelectedCryptoList/AllSelectedCrypto";
import { Alert, Snackbar, Typography } from "@mui/material";


const appTitle = "Crypto Lookup";

export const ACTIONS = {
  SET_SELECTED_CURRENCIES: "SET_SELECTED_CURRENCIES",
  REMOVE_SELECTED_CURRENCIES: "REMOVE_SELECTED_CURRENCIES",
};

function App() {
  const selectedCurrenciesReducer = (state: any, action: any) => {
    const { type, payload, favButtonClick } = action;

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
        if(favButtonClick){
          setAlertText('Currency added to favorites');
          setAlertOpen(true);
        }
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
        if(favButtonClick){
          setAlertText('Currency removed from favorites');
          setAlertOpen(true);
        }
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

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
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
        >
          <Typography variant="h4" component="div" className="title">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {appTitle}
            </Link>
          </Typography>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Snackbar
                    open={alertOpen}
                    autoHideDuration={1000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert
                      severity="success"
                      onClose={() => setAlertOpen(false)}
                    >
                      {alertText}
                    </Alert>
                  </Snackbar>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
