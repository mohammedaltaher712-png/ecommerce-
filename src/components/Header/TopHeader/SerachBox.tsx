import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useGetProductQuery } from "../../../Api/ProductApi";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const boxRef = useRef<HTMLDivElement>(null);

  // 🚀 RTK Query (بديل fetch + useEffect)
  const { data: suggestions = [], isFetching } = useGetProductQuery(
    {
      search: searchTerm,
      page: 1,
    },
    {
      skip: searchTerm.trim() === "",
    },
  );

  // 🔍 submit search
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm.trim())}`);
    }

    setShowSuggestions(false);
  };

  // 🧹 close on route change
  useEffect(() => {
    setShowSuggestions(false);
  }, [location]);

  // 🧠 close when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      {/* 🔍 Search Form */}
      <form className="hidden md:flex items-center w-110 bg-gray-100 border border-orange-400 rounded-full overflow-hidden shadow-sm hover:shadow-md transition">
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          className="w-full px-4 bg-transparent outline-none text-right text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-15 h-10 bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </form>

      {/* 🔥 Suggestions Dropdown */}
      {showSuggestions && searchTerm.trim() && (
        <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 shadow-lg z-50 overflow-hidden">
          {/* loading state */}
          {isFetching && (
            <div className="p-2 text-sm text-gray-500">جاري البحث...</div>
          )}

          {/* results */}
          {!isFetching &&
            suggestions.slice(0, 5).map((item) => (
              <Link to={`/products/${item.id}`} key={item.id}>
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/search?search=${item.name}`);
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition border-b border-gray-300 text-right"
                >
                  {/* الصورة */}
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden ">
                    <img
                      src={`${IMAGE_URL}/${item.image}`}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* الاسم */}
                  <span className="text-sm truncate max-w-50">{item.name}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
