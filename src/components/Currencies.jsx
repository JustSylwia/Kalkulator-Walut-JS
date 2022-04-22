import { useEffect, useState } from "react";

const Currencies = () => {
  const [rates, setRates] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/a?format=json")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data[0].rates);
        const chosenRates = data[0].rates.filter((rate) =>
          ["USD", "EUR", "CHF"].includes(rate.code)
        );
        setRates(chosenRates);
      })
      .catch(console.log);
  }, []);

  const calculateTotal = (e) => {
    e.preventDefault();

    const { amount, currency } = e.currentTarget.elements;

    const amountValue = amount.value;
    const currencyValue = rates.find(
      (rate) => rate.code === currency.value
    )?.mid;
    const calculatedTotal = (amountValue * currencyValue).toFixed(4);

    setTotal(calculatedTotal);
  };

  return (
    <div>
      <h1>Currencies</h1>

      <form onSubmit={calculateTotal}>
        <input type="text" name="amount" placeholder="amount" />
        <select name="currency">
          <option value="">choose currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
        </select>
        <button>Calculate</button>
      </form>

      <span>{total}</span>
    </div>
  );
};

export default Currencies;
