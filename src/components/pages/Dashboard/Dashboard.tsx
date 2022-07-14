import { useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./parts/SideBar";
import Users from "./pages/Users";
import GroupsComponent from "./pages/Groups";

const Dashboard = () => {
  const navigate = useNavigate();

  const identification = () => {
    if (localStorage.getItem("access_token") !== null) {
      axios
        .get("http://localhost:3000/user/identification", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          if (!data.roles.includes("admin")) navigate("/");
        })
        .catch((e) => {
          navigate("/login");
        });
    } else {
      navigate("/login");
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

  return (
    <div className="grid grid-cols-4 ">
      <SideBar />
      <div className={"col-span-3"}>
        <Routes>
          <Route element={<GroupsComponent />} path="/" />
          <Route element={<Users />} path="/users" />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
