import { Group } from "../../../../@Types/group";
import DeleteGroup from "./AddGroup/DeleteGroup";

interface RowTablePropsInterface {
  group: Group;
  activeList: string;
  handleActiveList: Function;
  handleRefresh: Function;
}

const RowTable = (props: RowTablePropsInterface) => {
  const { activeList, handleActiveList, group, handleRefresh } = props;

  return (
    <tr
      key={group._id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td
        onClick={() =>
          activeList === group._id
            ? handleActiveList("")
            : handleActiveList(group._id)
        }
        className="py-4 px-6 cursor-pointer "
      >
        {activeList === group._id ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        )}
      </td>
      <td className="py-4 px-6">{group.name}</td>
      <td className="py-4 px-6">{group.groupManger}</td>
      <td className="py-4 px-6 text-right">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <DeleteGroup group={group} handleRefresh={handleRefresh} />
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Update
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RowTable;
