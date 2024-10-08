import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("Authentication Result: ", result);
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="card" id="#authenticateCard">
      <h2>Authenticate!</h2>
      {successMessage && <p id="success">{successMessage}</p>}
      {error && <p id="error">{error}</p>}
      <button className="button" id="authenticateButton" onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
