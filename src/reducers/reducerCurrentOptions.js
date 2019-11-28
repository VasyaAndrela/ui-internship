import { GET_THE_CURRENCY } from '../constants/actionTypes';
import config from '../../config';

const { currency } = config.options;

const initialState = {
  currency: currency[0].label,
  symbol: currency[0].symbol,
  currencyKey: 1
};

export default function reducerCurrency(state = initialState, { type, payload }) {
  switch (type) {
    case GET_THE_CURRENCY: {
      return {
        ...state,
        currency: payload.currency,
        currencyKey: payload.currencyKey,
        symbol: payload.symbol
      };
    }
    default:
      return state;
  }
}
