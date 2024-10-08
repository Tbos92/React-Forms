import { useState } from "react";

export default function SignUpForm() {
  // establish variables to be used for handling username, password, and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    // invoke preventDefault to prevent form refresh
    event.preventDefault();
    console.log("Hello");
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
      console.log(result);
      // setToken(result.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // Sign up form with username, password, and submit button functionality to be used to
    // post new user data to the API using above handleSubmit function
    <>
      <h2>Sign Up!</h2>
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
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
