import { Link } from "react-router";
import { FaUserPlus } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, toggleMenu } from "../../../features/menu/StateMenu";
import { NavLinks } from "../../../data/navLinks";
import { FiMenu } from "react-icons/fi";
import type { RootState } from "../../../store";

export default function MobileMenu() {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.ui.mobileMenuOpen);

  return (
    <div className=" lg:hidden relative ">
      <button onClick={() => dispatch(toggleMenu())} className="btn btn-ghost">
        <FiMenu className="h-5 w-5" />
      </button>
      {open && (
        <>
          {/* هذا يغطي الشاشة ويلتقط أي ضغط خارج القائمة */}
          <div
            className="fixed inset-0 z-9998"
            onClick={() => dispatch(closeMenu())}
          />

          {/* القائمة نفسها */}
          <ul className="absolute mt-4 w-80 p-4 bg-base-100 shadow-lg rounded-xl flex flex-col items-center gap-2 z-9999">
            {NavLinks.map((NavLink) => (
              <li key={NavLink.title} className="w-full">
                <Link
                  to={NavLink.link}
                  onClick={() => dispatch(closeMenu())}
                  className="block w-full text-center text-black py-2 rounded-md hover:bg-sky-100 transition"
                >
                  {NavLink.title}
                </Link>
              </li>
            ))}

            <div className="sm:hidden flex flex-col w-full gap-2">
              <Link
                to="/login"
                onClick={() => dispatch(closeMenu())}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-sky-50 text-black hover:bg-orange-600 hover:text-white transition"
              >
                <PiSignInBold className="text-sm" />
                <span className="text-sm">دخول</span>
              </Link>

              <Link
                to="/register"
                onClick={() => dispatch(closeMenu())}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                <FaUserPlus className="text-sm" />
                <span className="text-sm">حساب</span>
              </Link>
            </div>
          </ul>
        </>
      )}
    </div>
  );
}
