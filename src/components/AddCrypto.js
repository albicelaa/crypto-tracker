import { useState, useEffect } from "react";
import { CoinList, SingleCoin } from "../config/api";
import axios from "axios";

const AddCrypto = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList());

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const dbCryptoCurrencies = async () => {
    const res = await fetch("http://localhost:5000/crypto");
    const dbDatas = await res.json();
    return dbDatas;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a Crypto");
      return;
    }

    const dbCoins = await dbCryptoCurrencies();

    const coinFilter = coins.filter(
      (coin) =>
        coin.symbol === text.toLowerCase() || coin.id === text.toLowerCase()
    );
    const coinId = coinFilter[0].id;
    const coinsDbNames = dbCoins.some(
      (dbCoin) => dbCoin.name.toLowerCase() === coinId
    );
    const coinsNames = coins.some((coin) => coin.id === coinId);
    if (coinsDbNames) {
      alert("This coin is already in list");
      return;
    }
    if (!coinsNames) {
      alert("This coin do not exist on list");
      return;
    }

    const coinsDetails = async () => {
      const dataCoin = await axios.get(SingleCoin(coinId));
      return dataCoin;
    };

    const singleCoin = await coinsDetails();
    const image = singleCoin.data.image.large;
    const name = singleCoin.data.name;
    const current_price = singleCoin.data.market_data.current_price.usd;
    const price_change_percentage_24h =
      singleCoin.data.market_data.price_change_percentage_24h_in_currency.usd;
    const symbol = singleCoin.data.symbol;
    const id = singleCoin.data.symbol;

    onAdd({
      id,
      image,
      name,
      symbol,
      current_price,
      price_change_percentage_24h,
    });

    setText("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Crypto</label>
        <input
          type="text"
          placeholder="Add Crypto"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <input type="submit" value="Save Crypto" className="btn btn-block" />
    </form>
  );
};

export default AddCrypto;
