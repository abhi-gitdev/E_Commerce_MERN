import React, { useEffect } from "react";
import { GrLanguage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "./Sidebar.css";
import { useGetCategoriesQuery } from "../../../../redux/api/categoryApiSlice";

const Sidebar = ({ open, setOpen }) => {
  const userInfo = localStorage.getItem("userInfo");
  const { data: categories, isLoading } = useGetCategoriesQuery();

  // Prevent unnecessary re-renders
  const men = !isLoading
    ? categories.find((cat) => cat.name === "Men")?._id
    : "";
  const women = !isLoading
    ? categories.find((cat) => cat.name === "Women")?._id
    : "";
  const kids = !isLoading
    ? categories.find((cat) => cat.name === "Kids")?._id
    : "";

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest(".sideBar")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, setOpen]);

  return (
    <div className={`sideBar ${open ? "open" : ""}`}>
      <button onClick={() => setOpen(false)} className="cross">
        <RxCross2 />
      </button>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to={`/category/${men}`}>Men</Link>
        </li>
        <li>
          <Link to={`/category/${women}`}>Women</Link>
        </li>
        <li>
          <Link to={`/category/${kids}`}>Kids</Link>
        </li>
        {!userInfo && (
          <li>
            <Link to="/login" className="login">
              Sign in/Sign up
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
