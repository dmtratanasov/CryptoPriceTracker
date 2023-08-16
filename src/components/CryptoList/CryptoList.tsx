import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import "./CryptoListStyles.css";
import { CryptoData } from "../../utils/api";
import { ACTIONS } from "../../App";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface CryptoListProps {
  cryptocurrencies: CryptoData[];
  manageSelectedCurrenciesDispatch: Function;
  selectedCurrencies: string[];
}

const CryptoList: React.FC<CryptoListProps> = ({
  cryptocurrencies,
  manageSelectedCurrenciesDispatch,
  selectedCurrencies
}) => {
  const [renderCryptoCurrencies, setRenderCryptoCurrencies] = useState<
    CryptoData[]
  >([]);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("selectedCurrencies");
    if (localStorageItem) {
      const tempIds: string[] =
        JSON.parse(localStorageItem).selectedCurrenciesIds;
      let tempCurrencies = cryptocurrencies.map((crypto: CryptoData) => ({
        ...crypto,
        selected: tempIds.includes(crypto.id),
      }));
      tempCurrencies.sort((a, b) => {
        // Move selected cryptos to the top
        if (a.selected && !b.selected) return -1;
        if (!a.selected && b.selected) return 1;
        return 0;
      });

      setRenderCryptoCurrencies([...tempCurrencies]);
    }
  }, [cryptocurrencies, selectedCurrencies]);

  return (
    <div className="crypto-list">
      <div className="crypto-header">
        <Typography className="crypto-header-name">Name</Typography>
        <div>
          <Typography className="crypto-header-price">Price</Typography>
          <Typography className="crypto-header-change">24h %</Typography>
        </div>
      </div>
      {renderCryptoCurrencies ? (
        renderCryptoCurrencies.map((crypto: CryptoData) => (
          <div key={crypto.id} className="crypto-item">
            <FormControlLabel
              control={
                <label className="star-checkbox-root">
                <Checkbox
                    className="star-checkbox-input"
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon className="star-checkbox-icon" />}
                      checked={crypto.selected}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        crypto.selected = isChecked;
                        const actionType = isChecked
                          ? ACTIONS.SET_SELECTED_CURRENCIES
                          : ACTIONS.REMOVE_SELECTED_CURRENCIES;
                        manageSelectedCurrenciesDispatch({
                          type: actionType,
                          payload: crypto.id,
                        });
                      }}
                    />
                </label>
              }
              label={crypto.name} // Provide the label text here
            />
            <div>
              <Typography className="crypto-price">
                ${crypto.priceUsd.toFixed(2)}
              </Typography>
              <Typography
                className={`crypto-change ${
                  crypto.changePercent24Hr >= 0 ? "" : "negative"
                }`}
              >
                {crypto.changePercent24Hr >= 0 ? "+" : ""}
                {crypto.changePercent24Hr.toFixed(2)}%
              </Typography>
            </div>
          </div>
        ))
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default CryptoList;
