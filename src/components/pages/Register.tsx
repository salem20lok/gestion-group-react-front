import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { isEmail } from "../../utils/validation/email";
import { isPassword } from "../../utils/validation/password";
import { isName } from "../../utils/validation/firstName";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const identification = () => {
    if (localStorage.getItem("access_token") !== null)
      axios
        .get("http://localhost:3000/user/identification", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          navigate("/");
        });
  };

  useEffect(() => {
    const debounceAuth = setTimeout(() => {
      identification();
    }, 0);
    return () => {
      clearTimeout(debounceAuth);
    };
  }, []);

  const handleRegister = () => {
    axios
      .post("http://localhost:3000/auth/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then(({ data }) => {
        navigate("/login");
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
          <Link className="absolute left-0 top-0 text-white p-2 " to={"/login"}>
            <FontAwesomeIcon icon={faLeftLong} /> {"Sign In"}
          </Link>
          <h2 className="text-4xl text-center dark:text-white font-bold">
            SIGN UP
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
            <label>First Name</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(
                  isName(e.target.value) && e.target.value !== ""
                );
              }}
            />
            {firstNameError || firstName === "" ? (
              ""
            ) : (
              <span className="text-red-500 text-xs p-1 ">
                please check correct firstName !
              </span>
            )}
          </div>
          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Last Name</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(
                  isName(e.target.value) && e.target.value !== ""
                );
              }}
            />
            {lastNameError || lastName === "" ? (
              ""
            ) : (
              <span className="text-red-500 text-xs p-1 ">
                please check correct lastName !
              </span>
            )}
          </div>

          <div className="flex flex-col text-gray-400 py-2 ">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail(
                  () => isEmail(e.target.value) && e.target.value !== ""
                );
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
                  () => isPassword(e.target.value) && e.target.value !== ""
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
            disabled={
              !firstNameError || !lastNameError || !errorEmail || !passwordError
            }
            onClick={handleRegister}
            className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/50 text-white rounded-lg font-semibold "
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
