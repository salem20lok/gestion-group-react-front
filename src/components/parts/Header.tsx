import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import User from "../../@Types/user";

const navigation = [
  { name: "Home", href: "/", role: "user" },
  { name: "Dashboard", href: "/dashboard", role: "admin" },
];

const navigationAvatar = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/Settings" },
];

interface HeaderPropsInterface {
  user: User;
}

const Header = (props: HeaderPropsInterface) => {
  const { user } = props;

  const location = useLocation().pathname;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/logo192.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/logo192.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, idx) => {
                      if (user.roles.includes(item.role)) {
                        return (
                          <Link
                            key={idx}
                            className={
                              location === item.href
                                ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                : "rounded-md text-sm font-medium px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
                            }
                            to={item.href}
                          >
                            {item.name}
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6 " aria-hidden="true" />
                </button>

                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <span
                          className={
                            "block px-4 py-2 text-sm text-gray-700  border-b border-gray-200 "
                          }
                        >
                          {user.firstName} {user.lastName}
                        </span>
                      </Menu.Item>
                      {navigationAvatar.map((el, idx) => {
                        return (
                          <Menu.Item key={idx}>
                            <Link
                              to={el.href}
                              className={
                                el.href === location
                                  ? " block px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-900 hover:text-white "
                                  : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-900 hover:text-white"
                              }
                            >
                              {el.name}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                      <Menu.Item>
                        <Link
                          onClick={() =>
                            localStorage.removeItem("access_token")
                          }
                          to="/login"
                          className={
                            "block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white border-t border-gray-200 "
                          }
                        >
                          Sign out
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    location === item.href
                      ? "bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                  aria-current={location === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
