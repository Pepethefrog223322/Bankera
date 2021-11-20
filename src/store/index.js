import { createStore } from "redux";

const initialState = {
  currencies: [],
  deletedCurrencies: [],
};

const currenciesReducer = (state = initialState, action) => {
  if (action.type === "push_currencies") {
    return {
      ...state,
      currencies: action.payload.map((el) => {
        return { ...el, display: true };
      }),
    };
  } else if (action.type === "change_property") {
    return {
      ...state,
      currencies: state.currencies.map((obj) => {
        if (obj[1].code === action.payload) {
          return { ...obj, display: action.property };
        }
        return { ...obj };
      }),
    };
  } else if (action.type === "push_to_deleted_currencies") {
    return {
      ...state,
      deletedCurrencies: [...state.deletedCurrencies, action.payload],
    };
  } else if (action.type === "remove_from_deleted_currencies") {
    return {
      ...state,
      deletedCurrencies: state.deletedCurrencies.filter(
        (element) => element !== action.payload
      ),
    };
  } else {
    return state;
  }
};
const store = createStore(
  currenciesReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
