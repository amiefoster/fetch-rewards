import { useState } from "react";
import Success from "./Success";
import Error from "./Error";

function SignUpForm({ occupations, states, submit }) {
  const [showForm, setShowForm] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setInvalidEmailError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(e.target.email.value)) {
      setInvalidEmailMessage("Email is invalid. Please Enter A Valid Email.");
      setInvalidEmailError(true);
    } else if (isValidEmail(e.target.email.value)) {
      fetch("https://frontend-take-home.fetchrewards.com/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          occupation: formData.occupation,
          state: formData.state,
        }),
      }).then((response) => {
        if (response.ok) {
          response
            .json()
            .then(setShowForm(false))
            .then(setSuccess(true))
            .then((data) => console.log(data, "this is the data"));
        } else {
          response
            .json()
            .then((err) => setErrorMessage(err))
            .then(setError(true));
        }
      });
    }
    submit(formData);
  };

  //toggle showing password by clicking on checkbox
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //show success component if form is successfully submited
  if (success === true) return <Success />;

  //show error component if form is unsuccessfully submited
  if (error === true) return <Error error={errorMessage} />;

  return (
    <div>
      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="fullname">Full Name:* </label>
            <input
              id="fullname"
              className="form-control"
              name="fullName"
              type="fullname"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:* </label>
            <input
              id="email"
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {invalidEmailError ? (
              <p className="error-message">{invalidEmailMessage}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:* </label>
            <input
              id="password"
              className="form-control"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input type="checkbox" id="toggle" onClick={togglePassword} />
            <label className="show-password-text" htmlFor="toggle">
              Show Password
            </label>
          </div>

          <label htmlFor="occupation">Occupation:* </label>
          <select
            id="occupation"
            className="form-control"
            name="occupation"
            type="occupation"
            placeholder="Occupation"
            required
            onChange={handleChange}
          >
            <option value=""> Choose an Occupation </option>
            {!!occupations &&
              occupations.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
          </select>
          <label htmlFor="state">State:* </label>
          <select
            id="state"
            className="form-control"
            name="state"
            type="state"
            placeholder="State"
            required
            onChange={handleChange}
          >
            <option value="">Choose a State</option>
            {!!states &&
              states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name} ({state.abbreviation})
                </option>
              ))}
          </select>
          <p className="small-text">* Required Fields</p>
          <div className="form-group">
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
