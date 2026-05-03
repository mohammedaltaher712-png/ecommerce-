import { Link } from "react-router";
import { NavLinks } from "../../../data/navLinks";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDropdown,
  toggleDropdown,
} from "../../../features/menu/StateMenu";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import type { RootState } from "../../../store";
import { useGetCategoryQuery } from "../../../Api/CategoryApi";

export default function CategoryDropdown() {
  const dispatch = useDispatch();
  const openCate = useSelector((state: RootState) => state.ui.dropdownOpen);
  const { data: categories, isLoading } = useGetCategoryQuery();
  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => dispatch(toggleDropdown())}
        className="
      btn bg-gray-100 border border-gray-200 shadow-none
      sm:w-60 w-60 rounded-xl transition
      hover:bg-orange-50 hover:border-orange-200
    "
      >
        <div className="flex justify-center gap-8 items-center">
          <IoMdMenu className="text-xl text-gray-800" />

          <span className="text-sm font-semibold text-gray-800">
            تصفح الأقسام
          </span>

          <MdOutlineArrowDropDown className="text-xl text-gray-700" />
        </div>
      </button>

      {/* OVERLAY */}
      {openCate && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => dispatch(closeDropdown())}
        />
      )}

      {/* DROPDOWN */}
      {openCate && (
        <div
          className="
        absolute left-0 mt-3 w-72 z-50
        bg-white/95 backdrop-blur-md
        shadow-xl rounded-2xl
        border border-orange-100
        max-h-80 overflow-y-auto
      "
        >
          {/* HEADER */}
          <div className="text-xs text-orange-500 font-medium px-4 pt-3 pb-2 border-b border-gray-100">
            الأقسام المتاحة
          </div>

          {/* ITEMS */}
          <div className="p-2 space-y-1">
            {categories?.map((categorie) => (
              <Link
                key={categorie.id}
                to={`/category/${categorie.slug}`}
                onClick={() => dispatch(closeDropdown())}
                className="
              flex items-center justify-center gap-2
              px-4 py-3 text-sm text-gray-700
              rounded-xl font-medium
              hover:bg-orange-50 hover:text-orange-600
              transition
            "
              >
                <span>{categorie.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
