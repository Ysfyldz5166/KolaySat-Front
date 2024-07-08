import { useEffect, useState } from "react";
import { signUp } from "./api";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      username: undefined,
    }));
  }, [userName]);

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      email: undefined,
    }));
  }, [email]);

  useEffect(() => {
    setErrors((lastError) => ({
      ...lastError,
      password: undefined,
    }));
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setGeneralError("");
    setApiProgress(true);

    try {
      const response = await signUp({
        userName,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
      navigate("/login");
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="card">
        <div className="card-header">
          <h1>Kayıt Ol</h1>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Kullanıcı Adı
              </label>
              <input
                id="username"
                className="form-control"
                onChange={(event) => setUserName(event.target.value)}
              />
              {errors.userName && (
                <div className="alert alert-danger">{errors.userName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                id="email"
                className="form-control"
                onChange={(event) => setemail(event.target.value.toLowerCase())}
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Şifre Tekrarı
              </label>
              <input
                id="passwordRepeat"
                type="password"
                className="form-control"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {generalError && (
              <div className="alert alert-danger">{generalError}</div>
            )}
            <div className="text-center">
              <button
                className="btn"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
