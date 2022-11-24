import React, { useState } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

type Props = {};

const Home = (props: Props) => {
  const [noSelection, setNoSelection] = useState<boolean>(true);
  return (
    <div className="home">
      <header className="App-header">Nimbus Chat</header>
      <div className="container">
        <Sidebar setNoSelection={setNoSelection} />
        <Chat noSelection={noSelection} />
      </div>
    </div>
  );
};

export default Home;
