import React, { useEffect } from "react";
import useSelectedCryptoData from "../../hooks/useSelectedCryptoData";
import SelectedCryptoContainer from "./SelectedCryptoContainer";
import SelectedCryptoItem from "./SelectedCryptoItem";

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
    if(selectedCurrenciesIds && selectedCurrenciesIds.length> 0){
        const intervalId = setInterval(fetchSelectedData, 30000);
        return () => clearInterval(intervalId);
    }else{
        return;
    }
  }, [fetchSelectedData, selectedCurrenciesIds]);

  console.log(selectedCryptocurrencies, "multiple logs");
  return (
    <div style={{ backgroundColor: "green", width:"100%", display:'flex'}}>
      {selectedCryptocurrencies ? (
        selectedCryptocurrencies.map((crypto) => (
            // <SelectedCryptoContainer>
                <SelectedCryptoItem crypto={crypto}/>
            // </SelectedCryptoContainer>
        ))
      ) : (
        <div style={{ backgroundColor: "green" }}>No selected currencies</div>
      )}
    </div>
  );
};

export default SelectedCryptoList;
