import React, { useEffect } from "react";
import { CryptoData } from "../../utils/api";
import { Grid, Paper, Typography } from "@mui/material";
import useSelectedCryptoData from "../../hooks/useSelectedCryptoData";
import "./AllSelectedCrypto.css";
import StarIcon from "@mui/icons-material/Star";


interface AllSelectedCryptoProps {
  selectedCurrenciesIds: string[];
}

const AllSelectedCrypto: React.FC<AllSelectedCryptoProps> = ({
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
    <div style={{ padding: "30px" }}>
      <Typography style={{ color: "white" }} variant="h4" align="center">
        Favorites 
        <StarIcon className="star-icon" fontSize="medium" />
      </Typography>
      <Grid className="all-selected-crypto-list" container spacing={3}>
        {selectedCryptocurrencies.length ? (
          selectedCryptocurrencies.map((crypto: CryptoData) => (
            <Grid key={crypto.id} item xs={12} sm={4} md={3}>
              <Paper elevation={3} style={{ padding: "20px", backgroundColor: 'rgba(245, 245, 245, 0.7)' }}>
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
              </Paper>
            </Grid>
          ))
        ) : (
          <div style={{ color: "white", marginTop:'20px' }}>No currencies added</div>
        )}
      </Grid>
    </div>
  );
};

export default AllSelectedCrypto;
