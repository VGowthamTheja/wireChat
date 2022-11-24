import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

type Props = {
  setNoSelection: (arg0: boolean) => void;
};

const Sidebar = ({ setNoSelection }: Props) => {
  return (
    <div className="sidebar" id="sidebar">
      <Navbar />
      <Search setNoSelection={setNoSelection} />
      <Chats setNoSelection={setNoSelection} />
    </div>
  );
};

export default Sidebar;
