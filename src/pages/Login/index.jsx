/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import  { useContext, useEffect, useState } from "react";
import { Input } from "../SignUp/components/Input";
import { login } from "./api";
import { LoginContext } from "../state/context";
import { useNavigate } from "react-router-dom";

export function Login() {

  const loginState = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: undefined,
    }));
  }, [email]);

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: undefined,
    }));
  }, [password]);

  const validateEmail = (email) => {
    // Email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneralError("");
    setApiProgress(true);

    // Validation
    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      setApiProgress(false);
      return;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Lütfen email formatında giriş.",
      }));
      setApiProgress(false);
      return;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Lütfen şifre giriniz.",
      }));
      setApiProgress(false);
      return;
    }

    try {
      const response = await login({ email, password });
      loginState.onLoginSuccess(response.data.user);
      navigate("/home");
    } catch (axiosError) {
      if (axiosError.response.status === 400) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-4 offset-lg-3 col-sm-8 offset-sm-2">
        <form onSubmit={handleSubmit}>
          <div className="text-center card-header">
            <h1>Giriş Yap</h1>
          </div>
          <div className="card-body">
            <Input
              id="email"
              label="E-mail"
              error={errors.email}
              onChange={(event) => setEmail(event.target.value.toLowerCase())}
            />
            <Input
              id="password"
              label="Şifre"
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            {generalError && (
              <div className="alert alert-danger">{generalError}</div>
            )}
            <div className="text-center">
              <button
                className="btn btn-outline-success"
                disabled={apiProgress || !email || !password}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Giriş
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
