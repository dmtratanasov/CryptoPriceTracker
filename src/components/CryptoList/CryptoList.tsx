import React from 'react';
import { Checkbox, Typography } from '@mui/material';
import './CryptoListStyles.css';
import { CryptoData } from '../../utils/api';
import { ACTIONS } from '../../App';

interface CryptoListProps {
  cryptocurrencies: CryptoData[];
  manageSelectedCurrenciesDispatch: Function;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptocurrencies, manageSelectedCurrenciesDispatch }) => {
  return (
      <div className="crypto-list">
        <div className="crypto-header">
          <Typography className="crypto-header-name">Name</Typography>
          <Typography className="crypto-header-price">Price</Typography>
          <Typography className="crypto-header-change">
            24h %
          </Typography>
        </div>
        {cryptocurrencies ?
          cryptocurrencies.map((crypto: CryptoData) => (
            <div key={crypto.id} className="crypto-item">
              <Checkbox
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  crypto.selected = isChecked;
                  const actionType = isChecked ? ACTIONS.SET_SELECTED_CURRENCIES : ACTIONS.REMOVE_SELECTED_CURRENCIES;
                  manageSelectedCurrenciesDispatch({ type: actionType, payload: crypto.id });
                }}
              ></Checkbox>
              <Typography className="crypto-name">{crypto.name}</Typography>
              <Typography className="crypto-price">${crypto.priceUsd.toFixed(2)}</Typography>
              <Typography
                className={`crypto-change ${crypto.changePercent24Hr >= 0 ? '' : 'negative'}`}
              >
                {crypto.changePercent24Hr >= 0 ? '+' : ''}
                {crypto.changePercent24Hr.toFixed(2)}%
              </Typography>
            </div>
          )) : <div>No results</div>}
      </div>
  );
};

export default CryptoList;
