import React, { KeyboardEvent, useContext, useState } from "react";
// import person from "../img/firstPerson.jpg";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DocumentData } from "@firebase/firestore-types";
import { AuthContext } from "../context/AuthContext";
type Props = {
  setNoSelection: (arg0: boolean) => void;
};

const Search = ({ setNoSelection }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [err, setErr] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const searchQuery = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      console.log("query done");
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    setNoSelection(false);
    // check whether this chat exists or not
    const combinedId =
      /* @ts-expect-error */
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chat
        await updateDoc(
          doc(db, "userChats", currentUser ? currentUser.uid : ""),
          {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        //create the other user
        await updateDoc(doc(db, "userChats", user ? user.uid : ""), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(undefined);
    setUserName("");
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    event.code === "Enter" && handleSearch();
    console.log(user);
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          onKeyDown={handleKey}
          onChange={(event) => setUserName(event.target.value)}
          className="searchInput"
          type="text"
          placeholder="Find a user"
          value={userName}
        />
        <PersonSearchIcon className="personSearch" />
      </div>
      {(err || !user) && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img className="searchImg" src={user?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
