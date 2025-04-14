// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    fetch(`${apiUrl}/auth/check`, {
      credentials: "include",
    })
      .then((res) => res.json()) // <-- this parses the response body
      .then((data) => {
        setAuth(data); // now data = { authenticated: true/false, user: {...} }
      })
      .catch(() => {
        setAuth({ authenticated: false });
      });
  }, []);
  const handleLogin = () => {
    try {
      fetch(apiUrl + "/login", {
        credentials: "include", //cross
      })
        .then((res) => res.json())
        .then((data) => (window.location.href = data.congnitoLoginURL));
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = apiUrl + "/logout";
  };

  return (
    <>
      <div className="navbar fixed z-10 bg-base-200 border-2 border-accent rounded-br-lg rounded-bl-lg flex justify-between">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
        <div>
          <button
            className="btn btn-square btn-ghost mx-2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Theme setting</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="join join-vertical">
                <input
                  type="radio"
                  name="theme-buttons"
                  className="btn theme-controller join-item"
                  aria-label="Default"
                  value="default"
                />
                <input
                  type="radio"
                  name="theme-buttons"
                  className="btn theme-controller join-item"
                  aria-label="Retro"
                  value="retro"
                />
                <input
                  type="radio"
                  name="theme-buttons"
                  className="btn theme-controller join-item"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
                <input
                  type="radio"
                  name="theme-buttons"
                  className="btn theme-controller join-item"
                  aria-label="Valentine"
                  value="valentine"
                />
                <input
                  type="radio"
                  name="theme-buttons"
                  className="btn theme-controller join-item"
                  aria-label="Aqua"
                  value="aqua"
                />
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar bg-base-100"
            >
              <div className="w-10 rounded-full">
                <h1 className="text-3xl text-base-content mx-auto my-auto">
                  {auth?.authenticated
                    ? auth.user.email.charAt(0).toUpperCase()
                    : "?"}
                </h1>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {auth === null && (
                <li>
                  <span>Loading...</span>
                </li>
              )}
              {auth?.authenticated && (
                <>
                  <li>
                    <span>Email: {auth.user.email}</span>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </>
              )}
              {auth?.authenticated === false && (
                <>
                  <li>
                    <a onClick={handleLogin}>Sign In</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
