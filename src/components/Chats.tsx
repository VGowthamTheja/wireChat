import { doc, onSnapshot } from "@firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
// import person from "../img/firstPerson.jpg";

type Props = {
  setNoSelection: (arg0: boolean) => void;
};

const Chats = ({ setNoSelection }: Props) => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser ? currentUser.uid : ""),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };
    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser?.uid]);

  const handleSelect = (userInfo: any) => {
    setNoSelection(false);
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {/* @ts-expect-error */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img className="searchImg" src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
