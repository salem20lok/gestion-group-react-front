import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useState } from "react";
import User from "../../../../../@Types/user";

export interface OptionInterface {
  label: string;
  value: string;
}

interface AddGroupInterfaceProps {
  users: User[];
  option: OptionInterface[];
  handleRefresh: Function;
}

const AddGroup = (props: AddGroupInterfaceProps) => {
  const { users, option, handleRefresh } = props;

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<OptionInterface[]>([]);
  const [name, setName] = useState<string>("");
  const [groupManger, setGroupManger] = useState<string>("");
  const [usersGroup, setUsersGroup] = useState<string[]>([]);

  const handleClose = () => {
    setShowModal(false);
    setName("");
    setGroupManger("");
    setSelected([]);
  };

  const handleAddGroup = () => {
    const payload: String[] = [];
    selected.map((el) => {
      payload.push(el.value);
    });
    axios
      .post(
        "http://localhost:3000/group",
        {
          name: name,
          groupManger: groupManger,
          users: payload,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(({ data }) => {
        handleRefresh();
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex justify-end my-3 w-11/12 mx-auto  ">
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Add Group
      </button>

      {showModal ? (
        <>
          <div
            onClick={() => handleClose()}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            className="w-full h-full absolute z-49 top-0 left-0  "
          />
          <div className="justify-center items-center  z-50 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-6/12">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleClose()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="mb-3">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 mx-1 "
                    >
                      Group name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-white text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Group dev "
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 mx-1"
                    >
                      group Manager
                    </label>
                    <select
                      onChange={(e) => setGroupManger(e.target.value)}
                      id="countries"
                      className="bg-gray-50 border border-white text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected> chose group Manger</option>

                      {users.map((el, idx) => {
                        if (el.roles.includes("admin")) {
                          return (
                            <option key={el._id + idx} value={el._id}>
                              {el.firstName} {el.lastName}{" "}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 mx-1"
                    >
                      Users Group
                    </label>
                    <MultiSelect
                      options={option}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddGroup}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default AddGroup;
