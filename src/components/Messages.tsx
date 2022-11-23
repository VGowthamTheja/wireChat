import { doc, onSnapshot } from "@firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
  noSelection: boolean;
};

const Messages = ({ noSelection }: Props) => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {!noSelection ? (
        messages?.map((message: any) => (
          <Message message={message} key={message.id} />
        ))
      ) : (
        <span>No conversations has selected!!</span>
      )}
    </div>
  );
};

export default Messages;
