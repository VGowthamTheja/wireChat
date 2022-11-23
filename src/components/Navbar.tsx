import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// import db from "../img/db.webp";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const Navbar = (props: Props) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="app-logo">Super Chat</span>
      <div className="user">
        {/* @ts-expect-error auto-src: non-strict-conversion*/}
        <img className="user-img" src={currentUser?.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button className="btnLogout" onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
