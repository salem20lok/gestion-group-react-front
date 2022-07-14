import { Link, useLocation } from "react-router-dom";

const sideBarNavigation = [
  {
    name: "groups",
    href: "/dashboard/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "users",
    href: "/dashboard/users",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const SideBar = () => {
  const location = useLocation().pathname;

  return (
    <div className="flex flex-col w-full h-screen px-4 py-8 overflow-y-auto border-r">
      <div className="flex flex-col justify-between mt-2">
        <aside>
          <ul>
            {sideBarNavigation.map((el, idx) => {
              return (
                <li key={idx}>
                  <Link
                    className={
                      el.href === location
                        ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md "
                        : "flex items-center px-4 py-2 text-gray-700  rounded-md "
                    }
                    to={el.href}
                  >
                    {el.svg}
                    <span className="mx-4 font-medium"> {el.name} </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
