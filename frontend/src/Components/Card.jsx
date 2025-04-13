import { Link } from "react-router-dom";

function Card() {
  return (
    <>
      <div className="card bg-base-200 border-2 border-accent w-96 shadow-sm">
        <h1 className="text-xl font-bold pt-3 text-center">
          Select a Category
        </h1>
        <div className="card-body">
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Subject
            </li>

            <Link to="/M4" className="list-row">
              <div>
                <img className="size-10 rounded-box" src="/icon/book1.png" />
              </div>
              <div>
                <div>M4</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  All Subjects in M4
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </Link>

            <Link to="/M5" className="list-row">
              <div>
                <img className="size-10 rounded-box" src="/icon/book2.png" />
              </div>
              <div>
                <div>M5</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  All Subjects in M5
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </Link>

            <Link to="/M6" className="list-row">
              <div>
                <img className="size-10 rounded-box" src="/icon/book3.png" />
              </div>
              <div>
                <div>M6</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  All Subjects in M6
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </Link>

            <Link to="/Tech" className="list-row">
              <div>
                <img className="size-10 rounded-box" src="/icon/tech.png" />
              </div>
              <div>
                <div>Technology</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Programming Languages and Mechanics
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </Link>

            <Link to="/Other" className="list-row">
              <div>
                <img className="size-10 rounded-box" src="/icon/note.png" />
              </div>
              <div>
                <div>Others</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Various Subjects and Interests
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Card;
