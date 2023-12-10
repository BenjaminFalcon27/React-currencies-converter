import React, { useState, useEffect } from "react";
import CurrencySelect from "./CurrencySelect";
import AmountInput from "./AmountInput";
import ResultDisplay from "./ResultDisplay";
import Spinner from "./Spinner";
import usePrevious from "../hooks/previousState";

const Converter = () => {
  const [inputDevises, setInputDevises] = useState("EUR");
  const [outputDevises, setOutputDevises] = useState("EUR");
  const [amount, setAmount] = useState("0");
  const [result, setResult] = useState(0);
  const [apiResult, setApiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const prevStateForm = usePrevious({ inputDevises, outputDevises, amount });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (
        amount !== "0" &&
        (inputDevises !== outputDevises ||
          amount !== prevStateForm?.amount ||
          inputDevises !== prevStateForm?.inputDevises)
      ) {
        setLoading(true);

        try {
          const response = await fetch(
            `https://react-starter-api.vercel.app/api/convert/${inputDevises}`
          );
          const data = await response.json();

          if (isMounted) {
            setApiResult(data);
          }
        } catch (error) {
          console.error("Error fetching API:", error);
          if (isMounted) {
            setApiResult(null);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setApiResult(null);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [inputDevises, outputDevises, amount, prevStateForm]);

  useEffect(() => {
    const calculateResult = () => {
      if (apiResult && apiResult.data) {
        const currencyArray = Array.isArray(apiResult.data)
          ? apiResult.data
          : Object.values(apiResult.data);

        const selectedCurrency = currencyArray.find(
          (currency) => currency.code === outputDevises
        );

        if (selectedCurrency) {
          const calculatedResult = parseFloat(amount) * selectedCurrency.value;
          setResult(calculatedResult);
        } else {
          setResult(parseFloat(amount));
        }
      } else {
        setResult(parseFloat(amount));
      }
    };

    calculateResult();
  }, [amount, apiResult, outputDevises]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      setAmount(inputValue);
    } else {
      setAmount("0");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Convertisseur</h3>
        <div className="col s8">
          <div className="row">
            <CurrencySelect
              label="From"
              value={inputDevises}
              onChange={(e) => setInputDevises(e.target.value)}
              options={["EUR", "CHF", "GBP", "USD"]}
            />
            <CurrencySelect
              label="To"
              value={outputDevises}
              onChange={(e) => setOutputDevises(e.target.value)}
              options={["EUR", "CHF", "GBP", "USD"]}
            />
          </div>
          <div className="row">
            <AmountInput value={amount} onChange={handleInputChange} />
            <div className="input-field col s12">
              <label htmlFor="result">Result :</label>
              {loading ? (
                <Spinner />
              ) : (
                <ResultDisplay
                  result={
                    apiResult
                      ? isNaN(result)
                        ? "Erreur de saisie"
                        : result
                      : amount
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
