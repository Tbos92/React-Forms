import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  // establish variables to be used for handling username, password, and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSubmit(event) {
    // invoke preventDefault to prevent form refresh
    event.preventDefault();
    console.log("Hello");

    // set minimum password length to 8, checking if the entered password is <8 and if true return error message and close out returning 1 for error
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setPassword("");
      return 1;
    }
    // send username and password from form to the API using POST
    // use a try catch to fetch response from the API
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      // log result in console to confirm proper object is being returned in response
      console.log(result);
      setToken(result.token);
      setSuccessMessage(`Welcome ${username}!`);

      // Clear the form fields
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Error signing up, please try again.");
    }
  }

  return (
    // Sign up form with username, password, and submit button functionality to be used to
    // post new user data to the API using above handleSubmit function
    <>
      <div className="card" id="signUpCard">
        <h2>Sign Up!</h2>
        {successMessage && <p id="success">{successMessage}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </label>
          <label>
            Password:{" "}
            <input
              // type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <button className="button" id="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
