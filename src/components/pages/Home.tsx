import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import User from "../../@Types/user";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile";
import Header from "../parts/Header";
import Accueil from "./Accueil";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    _id: "",
    email: "",
    lastName: "",
    firstName: "",
    avatar: "",
    roles: [],
  });

  const identification = () => {
    if (localStorage.getItem("access_token") !== null) {
      axios
        .get("http://localhost:3000/user/identification", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const debounceAuth = setTimeout(() => {
      if (!user.firstName) identification();
    }, 0);
    return () => {
      clearTimeout(debounceAuth);
    };
  }, []);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Home;
