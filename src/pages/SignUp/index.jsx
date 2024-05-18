import { useEffect, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [userName, setUserName] = useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, SetApiProgress] = useState(false);
  const [succesMessage, setSuccesMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(function (lastError) {
      return {
        ...lastError,
        username: undefined,
      };
    });
  }, [userName]);

  useEffect(() => {
    setErrors(function (lastError) {
      return {
        ...lastError,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors(function (lastError) {
      return {
        ...lastError,
        password: undefined,
      };
    });
  }, [password]);
  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccesMessage();
    setGeneralError();
    SetApiProgress(true);
    event.preventDefault();

    try {
      const response = await signUp({
        userName,
        email,
        password,
      });
      setSuccesMessage(response.data.message);
      navigate("/login")
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        console.log("hata", axiosError.response);
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError("Unexcepted error occured. Please try again");
      }
    } finally {
      SetApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-4 offset-lg-3 col-sm-8 offset-sm-2">
        <form onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Kayıt Ol</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Kullanıcı Adı"
              error={errors.userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <Input
              id="email"
              label="E-mail"
              error={errors.email}
              onChange={(event) => setemail(event.target.value.toLowerCase())} // E-posta adresini küçük harfe dönüştürüyoruz
            />

            <Input
              id="password"
              label="Şifre"
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                className="form-control"
                id="passwordRepeat"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
            {succesMessage && (
              <div className="alert alert-success">{succesMessage}</div>
            )}
            {generalError && (
              <div className="alert alert-danger">{generalError}</div>
            )}
            <div className="text-center">
              <button
                className="btn btn-outline-success"
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
          </div>
        </form>
      </div>
    </div>
  );
}
