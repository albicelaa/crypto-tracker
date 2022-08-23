import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CryptoCurrency = ({ cryptoCurrency, onDelete }) => {
  return (
    <div className="cryptoCurrency">
      <h3>
        <input
          type="image"
          id="image"
          alt="Login"
          src={cryptoCurrency.image}
          width="48"
          height="48"
        ></input>
        {cryptoCurrency.name} ({cryptoCurrency.symbol})
        <DeleteForeverIcon
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(cryptoCurrency.symbol)}
        />
      </h3>
      <p>
        ${cryptoCurrency.current_price}
        <span style={{ color: "green" }}>
          ({cryptoCurrency.price_change_percentage_24h})
        </span>
      </p>
    </div>
  );
};

export default CryptoCurrency;
