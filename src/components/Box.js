import { useDispatch } from "react-redux";

import "./Box.css";

function Box(props) {
  const { element } = props;
  const { input } = props;
  const dispatch = useDispatch();

  return (
    element.display === true && (
      <div className="box">
        <img src={`./${element[0]}.png`} alt={element[1].description} />
        <div dangerouslySetInnerHTML={{ __html: `${element[1].symbol}` }} />
        <span>
          {(element[1].rate_float * input)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </span>

        <div
          onClick={() => {
            dispatch({
              type: "change_property",
              payload: element[1].code,
              property: false,
            });
            dispatch({
              type: "push_to_deleted_currencies",
              payload: element[1].code,
            });
          }}
          className="close"
        >
          x
        </div>
      </div>
    )
  );
}

export default Box;
