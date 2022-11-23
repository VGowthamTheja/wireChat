import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

type AppContextInterface = {
  dispatch: (arg0: any) => void;
  data: {
    chatId: string;
    user: Record<any, any>;
  };
};

const dispatch = () => {};

const data = {
  chatId: "null",
  user: {},
};

export const ChatContext = createContext<AppContextInterface>({
  dispatch,
  data,
});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            /* @ts-expect-error */
            currentUser?.uid > action.payload?.uid
              ? currentUser?.uid + action.payload?.uid
              : action.payload?.uid + currentUser?.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
