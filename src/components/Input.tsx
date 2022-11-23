import React, { useContext, useMemo, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

type Props = {};

const Input = (props: Props) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const controlledLastMessage = useMemo(() => {
    if (text || (text && img)) {
      return text;
    } else if (img) {
      return "image";
    } else {
      return "No Messages";
    }
  }, [text, img]);

  const handleSend = async () => {
    if (!img || !text) {
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        /* @ts-expect-error auto-src: non-strict-conversion*/
        (error: any) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser ? currentUser.uid : ""), {
      [data.chatId + ".lastMessage"]: {
        text: controlledLastMessage,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: controlledLastMessage,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        className="messageInput"
        onChange={(event) => setText(event.target.value)}
        type="text"
        placeholder="Say Something"
        value={text}
      />
      <div className="send">
        <AttachFileIcon className="click" />
        <input
          style={{ display: "none" }}
          type="file"
          name="sendFile"
          id="file"
          onChange={(event) =>
            setImg(event.target.files ? event.target.files[0] : null)
          }
        />
        <label htmlFor="file">
          <AddPhotoAlternateOutlinedIcon className="click" />
        </label>
        <button onClick={handleSend} className="sendBtn">
          send
        </button>
      </div>
    </div>
  );
};

export default Input;
