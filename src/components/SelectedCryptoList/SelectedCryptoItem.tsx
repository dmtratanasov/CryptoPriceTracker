import React from "react";
import { CryptoData } from "../../utils/api";

interface SelectedCryptoItemProps{
    crypto: CryptoData
}

const SelectedCryptoItem: React.FC<SelectedCryptoItemProps> = ({crypto}) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{crypto.name}</p>
      <p>{crypto.priceUsd}</p>
    </div>
  );
};

export default SelectedCryptoItem;
