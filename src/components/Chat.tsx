import React, { useContext } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
import noMsg from "../img/noMsg.webp";
import { ChatContext } from "../context/ChatContext";
import MenuHamburger from "./MenuHamburger";

type Props = {
  noSelection: boolean;
};

const Chat = ({ noSelection }: Props) => {
  const { data } = useContext(ChatContext);

  const chatPageRendering = () => {
    if (noSelection) {
      return (
        <div className="noContent">
          <span>
            <img src={noMsg} alt="" width={"60px"} />
          </span>
          <p>No conversations has selected!!</p>
        </div>
      );
    } else {
      return (
        <>
          <div className="chatInfo">
            <div
              className="userOnChat"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img
                src={data.user?.photoURL}
                alt=""
                width="30px"
                style={{ borderRadius: "50%" }}
              />
              <span>{data.user?.displayName}</span>
            </div>
            {/* <div className="chatIcons">
              <VideocamIcon />
              <PersonAddIcon />
              <MoreHorizIcon />
            </div> */}
            <MenuHamburger />
          </div>
          <Messages noSelection={noSelection} />
          <Input />
        </>
      );
    }
  };
  return <div className="chat">{chatPageRendering()}</div>;
};

export default Chat;
