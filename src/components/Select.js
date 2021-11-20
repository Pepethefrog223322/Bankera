import { useSelector, useDispatch } from "react-redux";

import "./Select.css";

export default function Select() {
  const data = useSelector((state) => state.currencies);
  const deletedCurrencies = useSelector((state) => state.deletedCurrencies);
  const dispatch = useDispatch();

  let selectItems = data.filter((obj) => {
    return obj.display === false;
  });

  return (
    deletedCurrencies.length > 0 && (
      <div>
        <select
          defaultValue="default"
          onChange={(e) => {
            dispatch({
              type: "change_property",
              payload: e.target.value,
              property: true,
            });
            dispatch({
              type: "remove_from_deleted_currencies",
              payload: e.target.value,
            });
          }}
        >
          <option value="default">please select currency to display</option>
          {selectItems.map((el) => {
            return <option key={el[0]}>{el[0]}</option>;
          })}
        </select>
      </div>
    )
  );
}
