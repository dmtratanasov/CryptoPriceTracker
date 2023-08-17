import React from "react";
import { CryptoData } from "../../utils/api";
import "./SelectedCryptoItem.css";
import { Typography } from "@mui/material";

interface SelectedCryptoItemProps {
  crypto: CryptoData;
}

const SelectedCryptoItem: React.FC<SelectedCryptoItemProps> = ({ crypto }) => {
  return (
    <div
      className="selected-crypto-item"
      key={crypto.id}
    >
      <Typography className="selected-crypto-item-name">
        {crypto.name}
      </Typography>
      <Typography className="selected-crypto-item-price">
        ${crypto.priceUsd.toFixed(2)}
      </Typography>
      <Typography
        className={`selected-crypto-item-change ${
          crypto.changePercent24Hr >= 0 ? "" : "negative"
        }`}
      >
        {crypto.changePercent24Hr >= 0 ? "+" : ""}
        {crypto.changePercent24Hr.toFixed(2)}%
      </Typography>
    </div>
  );
};

export default SelectedCryptoItem;
