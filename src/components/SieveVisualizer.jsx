import React, { useState } from "react";
import "../App.css";

const SieveVisualizer = () => {
  const [limit, setLimit] = useState(50);
  const [primeArray, setPrimeArray] = useState([]);
  const [current, setCurrent] = useState(null);

  const generateSieve = async () => {
    let isPrime = Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= limit; i++) {
      if (isPrime[i]) {
        setCurrent(i);
        await new Promise(r => setTimeout(r, 2000));
        for (let j = i * i; j <= limit; j += i) {
          isPrime[j] = false;
          setPrimeArray([...isPrime]);
          await new Promise(r => setTimeout(r, 500));
        }
      }
    }
    setPrimeArray(isPrime);
    setCurrent(null);
  };

  return (
    <div
      className="visualizer-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ color: "#16a34a", fontWeight: "bold", fontSize: "24px", marginBottom: "15px" }}>
        Sieve of Eratosthenes
      </h2>

      <label
        style={{ fontWeight: "bold", marginBottom: "5px", textAlign: "center" }}
      >
        Enter N (Upper Limit):
      </label>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        placeholder="Enter upper limit"
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "300px",
          border: "2px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "16px",
          marginBottom: "10px",
          textAlign: "center"
        }}
      />
      <button
        onClick={generateSieve}
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Generate Primes
      </button>

      <div
        className="array-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "800px",
          justifyContent: "center"
        }}
      >
        {primeArray.map((isPrime, index) => (
          <div
            key={index}
            style={{
              backgroundColor:
                current === index
                  ? "#ffd54f"
                  : isPrime
                  ? "lightgreen"
                  : "lightcoral",
              width: "40px",
              height: "40px",
              lineHeight: "40px",
              textAlign: "center",
              margin: "2px",
              borderRadius: "5px"
            }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SieveVisualizer;
