import axios from "axios";
import { Group } from "../../../../@Types/group";
import RowTable from "../parts/RowTable";
import { useEffect, useState } from "react";
import User from "../../../../@Types/user";
import AddGroup, { OptionInterface } from "../parts/AddGroup/AddGroup";

const GroupsComponent = () => {
  const [activeList, setActiveList] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [option, setOption] = useState<OptionInterface[]>([]);

  const getGroups = () => {
    axios
      .get("http://localhost:3000/group", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:3000/user", {})
      .then(({ data }) => {
        setUsers(data);

        const a: OptionInterface[] = [];
        data.map((el: User) => {
          a.push({ value: el._id, label: el.firstName + " " + el.lastName });
        });
        setOption(a);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const debounceGroup = setTimeout(() => {
      getGroups();
      getUsers();
    }, 0);
    return () => {
      clearTimeout(debounceGroup);
    };
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleActiveList = (payload: string) => {
    setActiveList(payload);
  };

  return (
    <div>
      <AddGroup users={users} option={option} handleRefresh={handleRefresh} />
      <div className="overflow-x-auto mt-3 w-11/12 mx-auto relative shadow-md sm:rounded-lg z-1 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6" />

              <th scope="col" className="py-3 px-6">
                Group name
              </th>
              <th scope="col" className="py-3 px-6">
                Group Manger
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((el, idx) => {
              return (
                <RowTable
                  handleRefresh={handleRefresh}
                  key={el._id}
                  group={el}
                  activeList={activeList}
                  handleActiveList={handleActiveList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupsComponent;
