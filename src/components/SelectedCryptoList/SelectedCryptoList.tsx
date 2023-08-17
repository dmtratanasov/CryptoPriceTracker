import React, { useEffect } from "react";
import useSelectedCryptoData from "../../hooks/useSelectedCryptoData";
import SelectedCryptoContainer from "./SelectedCryptoContainer";
import SelectedCryptoItem from "./SelectedCryptoItem";
import { Link } from "react-router-dom";
import "./SelectedCryptoItem.css";


interface SelectedCryptoListProps {
  selectedCurrenciesIds: string[];
}

const SelectedCryptoList: React.FC<SelectedCryptoListProps> = ({
  selectedCurrenciesIds,
}) => {
  const { selectedCryptocurrencies, fetchSelectedData } = useSelectedCryptoData(
    selectedCurrenciesIds
  );

  useEffect(() => {
    if (selectedCurrenciesIds.length > 0) {
      const intervalId = setInterval(fetchSelectedData, 30000);
      return () => clearInterval(intervalId);
    }
  }, [fetchSelectedData, selectedCurrenciesIds]);

  return (
    <SelectedCryptoContainer>
      <div className="display-flex">
        {selectedCryptocurrencies?.slice(0, 4).map((crypto) => (
          <SelectedCryptoItem key={crypto.id} crypto={crypto} />
        ))}
      </div>
      { selectedCryptocurrencies.length > 0 &&
      <div className="see-all-wrapper">
          <Link to="/selected" className="see-all-wrapper-link">See all</Link>
      </div>
      }
    </SelectedCryptoContainer>
  );
};

export default SelectedCryptoList;
