import React from "react";

export default function RegisterLogin() {
  //submit form
  const submitForm = (e) => {
    e.preventDefault();
  };

  //use state to store email and password
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  return (
    <div className="container">
      <h2>Login</h2>
      <div className="row">
        <div className="col 12" onSubmit={(e) => submitForm(e)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                placeholder="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="validate"
              />
              <label htmlFor="email">Email</label>
              <span
                className="helper-text"
                data-error="Type a valid email"
                data-success="right"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                className="validate"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Password</label>
              <span
                className="helper-text"
                data-error="Type a valid password"
                data-success="right"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
