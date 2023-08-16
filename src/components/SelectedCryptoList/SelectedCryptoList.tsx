import React, { useEffect, useRef, useState } from "react";
import useSelectedCryptoData from "../../hooks/useSelectedCryptoData";
import SelectedCryptoContainer from "./SelectedCryptoContainer";
import SelectedCryptoItem from "./SelectedCryptoItem";
import { CryptoData } from "../../utils/api";

interface SelectedCryptoListProps {
  selectedCurrenciesIds: string[];
  localStorageCurrenciesIds: string[];
}

const SelectedCryptoList: React.FC<SelectedCryptoListProps> = ({
  selectedCurrenciesIds,
  localStorageCurrenciesIds,
}) => {
  const { selectedCryptocurrencies, fetchSelectedData } = useSelectedCryptoData(
    selectedCurrenciesIds
  );


  useEffect(() => {
    if (selectedCurrenciesIds && selectedCurrenciesIds.length > 0) {
      const intervalId = setInterval(fetchSelectedData, 30000);
      return () => clearInterval(intervalId);
    } else {
      return;
    }
  }, [fetchSelectedData, selectedCurrenciesIds]);

  //TODO: check this
  console.log(selectedCryptocurrencies, "multiple logs");
  return (
      <SelectedCryptoContainer>
      {selectedCryptocurrencies &&
        selectedCryptocurrencies.map((crypto) => (
          <SelectedCryptoItem key={crypto.id} crypto={crypto} />
          ))}
        </SelectedCryptoContainer>
  );
};

export default SelectedCryptoList;
