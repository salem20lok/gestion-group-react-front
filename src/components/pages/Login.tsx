import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { isEmail } from "../../utils/validation/email";
import { isPassword } from "../../utils/validation/password";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const identification = () => {
    if (localStorage.getItem("access_token") !== null) {
      axios
        .get("http://localhost:3000/user/identification", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          navigate("/");
        });
    }
  };

  useEffect(() => {
    const debounceAuth = setTimeout(() => {
      identification();
    }, 0);
    return () => {
      clearTimeout(debounceAuth);
    };
  }, []);

  const handleLogin = () => {
    axios
      .post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.accessToken);
        navigate("/");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(true);
        setErrorMsg(e.response.data.message);
        setInterval(() => {
          setError(false);
        }, 15000);
      });
  };

  return (
    <div className="grid grid-cols-1 h-screen w-screen">
      <div className="flex flex-col justify-center bg-gray-400 ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-2/4 mx-auto bg-gray-900 p-8 px-8 rounded-lg relative"
        >
          <Link
            className="absolute left-0 top-0 text-white p-2 "
            to={"/register"}
          >
            <FontAwesomeIcon icon={faLeftLong} /> {"Sign Up"}
          </Link>
          <h2 className="text-4xl text-center dark:text-white font-bold">
            SIGN IN
          </h2>
          {error ? (
            <div className="bg-red-300 p-2 rounded-lg relative ">
              <span
                onClick={() => setError(false)}
                className="absolute p-1 right-0 top-0 cursor-pointer rounded-full bg-cyan-50 hover:bg-cyan-100 "
              >
                X
              </span>
              <p>{errorMsg}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail(() => isEmail(e.target.value) && email !== "");
              }}
            />
            {errorEmail || email === "" ? (
              ""
            ) : (
              <span className="text-red-500 text-xs p-1 ">
                please check correct email !
              </span>
            )}
          </div>

          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(
                  () => isPassword(e.target.value) && password !== ""
                );
              }}
            />
            {passwordError || password === "" ? (
              ""
            ) : (
              <span className="text-red-500 text-xs p-1 ">
                password is not a format !
              </span>
            )}
          </div>

          <button
            disabled={!errorEmail || !passwordError}
            onClick={handleLogin}
            className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/50 text-white rounded-lg font-semibold "
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
