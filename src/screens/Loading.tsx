import React from "react";
import { Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

type Props = {
  isLoading: boolean;
};

const Loading = ({ isLoading }: Props) => {
  return <>{isLoading ? <Home /> : <Login />}</>;
};

export default Loading;
