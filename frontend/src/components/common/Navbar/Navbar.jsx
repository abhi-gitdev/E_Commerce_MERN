import React, { useState } from "react";
import { IoBagOutline, IoMenu } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../redux/constants";
import Dropdown from "../dropdown/Dropdown";
import profileImg from "../../../assets/profile.png";
import { Menu, MenuButton } from "@chakra-ui/react";
import Sidebar from "./SideBar/Sidebar";

import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const profile = userInfo?.avatar
    ? `${BASE_URL}/${userInfo.avatar}`
    : profileImg;

  return (
    <>
      <div className="navbar-placeholder"></div>
      {open && <Sidebar open={open} setOpen={setOpen} />}
      <nav className="nav">
        <ul>
          <li className="logo" onClick={() => navigate("/")}>
            <IoMenu className="menuIcon" onClick={() => setOpen(!open)} />
            <p>
              <span className="logo-accent">ShopSphere</span>
            </p>
          </li>
          <div className="linkContainer">
            <li>
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" className="navLink">
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" className="navLink">
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink to="/trending" className="navLink">
                Trending
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="navLink">
                Contact
              </NavLink>
            </li>
          </div>
          <div className="cartContainer">
            {userInfo ? (
              <div className="flexContainer">
                <li>
                  <Link to="/cart" className="icon">
                    <IoBagOutline className="cart" />
                  </Link>
                </li>
                <Menu>
                  <MenuButton id="menuBtn">
                    <img src={profile} className="profile-img" />
                  </MenuButton>
                  <Dropdown />
                </Menu>
              </div>
            ) : (
              <Link to="/login" className="login">
                Sign in / Sign up
              </Link>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
