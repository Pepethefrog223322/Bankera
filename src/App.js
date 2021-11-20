import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import "./App.css";
import Box from "./components/Box";
import Select from "./components/Select";
import arrow from "./arrow.svg";

function App() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies);
  const [input, setInput] = useState(1);
  const [fetchNewData, setFetchNewData] = useState(false);
  const deletedCurrencies = useSelector((state) => state.deletedCurrencies);

  useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => res.json())
      .then((object) => {
        dispatch({
          type: "push_currencies",
          payload: Object.entries(object.bpi),
        });
      });
  }, [fetchNewData, dispatch]);

  setTimeout(() => {
    setFetchNewData(fetchNewData ? false : true);
  }, 60000);

  function enforceMinMax(el) {
    if (el.value !== "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }

  return (
    <>
      <div className="app">
        <div className="container">
          <Select />
          <input
            defaultValue="1"
            onChange={(e) => {
              enforceMinMax(e.target);
              setInput(e.target.value);
            }}
            placeholder="Amount of bitcoin"
            min="1"
            max="999"
            type="number"
          ></input>
          <div className="main-currency">
            <img src="./btc.png" alt="bitcoin"></img>
          </div>
          {deletedCurrencies.length > 2 ? (
            ""
          ) : (
            <div className="arrows">
              <img alt="arrow" src={arrow}></img>
              <img alt="arrow" src={arrow}></img>
            </div>
          )}
        </div>
        <div className="container">
          {currencies &&
            currencies.map((el) => {
              return <Box input={input} key={el[0]} element={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default App;
