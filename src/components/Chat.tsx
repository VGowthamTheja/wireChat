import React, { useContext } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

type Props = {
  noSelection: boolean;
};

const Chat = ({ noSelection }: Props) => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
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
        <div className="chatIcons">
          <VideocamIcon />
          <PersonAddIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <Messages noSelection={noSelection} />
      <Input />
    </div>
  );
};

export default Chat;
