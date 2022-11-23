import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
// import person from "../img/firstPerson.jpg";

type Props = {
  message: any;
};

const Message = ({ message }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const verifiedDate = new Date(message.date.toDate());
  const comparableDate = useMemo(() => {
    return new Date();
  }, [message]);

  const ref = useRef();

  const link = () => {
    window.location.href = message.img;
  };

  useEffect(() => {
    /*@ts-expect-error */
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      /*@ts-expect-error */
      ref={ref}
      className={`message ${message.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          className="messageAuthor"
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>
          {comparableDate.getMinutes() - verifiedDate.getMinutes() < 1
            ? "just now"
            : comparableDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
        </span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && (
          <img
            className="messageImage"
            src={message.img}
            alt=""
            onClick={link}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
