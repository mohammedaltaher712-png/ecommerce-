import { FaUserPlus } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import { NavLinks } from "../../../data/navLinks";
import MobileMenu from "./MobileMenu";
import CategoryDropdown from "./CategoryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { ClrearAuth } from "../../../features/StateAuth";
import { FiLogOut } from "react-icons/fi";

function HeaderDown() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth?.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(ClrearAuth());
    navigate("/login", { replace: true });
  }

  return (
    <div className="navbar bg-white border-b border-gray-100 shadow-sm text-sm">
      <div className="flex w-full max-w-7xl mx-auto items-center h-12 text-gray-900">
        {/* LEFT */}
        <div className="navbar-start">
          <MobileMenu />
          <CategoryDropdown />
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {NavLinks.map((NavLink) => (
              <li key={NavLink.title}>
                <Link
                  to={NavLink.link}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      location.pathname === NavLink.link
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }
                  `}
                >
                  {NavLink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {!user && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition"
              >
                <PiSignInBold />
                <span>دخول</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                <FaUserPlus />
                <span>حساب</span>
              </Link>
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition"
            >
              <FiLogOut />
              <span>تسجيل الخروج</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderDown;
