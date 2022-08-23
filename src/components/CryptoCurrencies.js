import CryptoCurrency from "./CryptoCurrency";

const CryptoCurrencies = ({ cryptoCurrencies, onDelete }) => {
  return (
    <>
      {cryptoCurrencies.map((cryptoCurrency, index) => (
        <CryptoCurrency
          key={index}
          cryptoCurrency={cryptoCurrency}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default CryptoCurrencies;
