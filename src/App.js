import Header from "./components/Header";
import CryptoCurrencies from "./components/CryptoCurrencies";
import { useState, useEffect } from "react";
import AddCrypto from "./components/AddCrypto";

const App = () => {
  const [showAddCrypto, setShowAddCrypto] = useState(false);

  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

  useEffect(() => {
    const getCrypto = async () => {
      const cryptoFromServer = await fetchCrypto();
      setCryptoCurrencies(cryptoFromServer);
    };

    getCrypto();
  }, []);

  // Fetch Crypto
  const fetchCrypto = async () => {
    const res = await fetch("http://localhost:5000/crypto");
    const data = await res.json();
    return data;
  };

  //  Delete Crypto
  const deleteCryptoCurrencies = async (id) => {
    await fetch(`http://localhost:5000/crypto/${id}`, {
      method: "DELETE",
    });

    setCryptoCurrencies(
      cryptoCurrencies.filter((CryptoCurrency) => CryptoCurrency.id !== id)
    );
  };

  // Add Crypto
  const addCrypto = async (CryptoCurrency) => {
    const res = await fetch("http://localhost:5000/crypto", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(CryptoCurrency),
    });

    const data = await res.json();
    console.log(data);
    setCryptoCurrencies([...cryptoCurrencies, data]);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddCrypto(!showAddCrypto)}
        showAdd={showAddCrypto}
      />
      {showAddCrypto && <AddCrypto onAdd={addCrypto} />}
      {cryptoCurrencies.length > 0 ? (
        <CryptoCurrencies
          cryptoCurrencies={cryptoCurrencies}
          onDelete={deleteCryptoCurrencies}
        />
      ) : (
        "No Crypto To Show"
      )}
    </div>
  );
};

export default App;
