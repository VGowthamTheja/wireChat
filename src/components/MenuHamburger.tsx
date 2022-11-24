import React from "react";

type Props = {};

const MenuHamburger = (props: Props) => {
  const handleMenu = (event: any) => {
    event.target.classList.toggle("twist");
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
      sidebar.classList.toggle("slide");
    }
  };
  return (
    <span className="burger" onClick={handleMenu}>
      <span className="burgbar burgbar1"></span>
      <span className="burgbar burgbar2"></span>
      <span className="burgbar burgbar3"></span>
    </span>
  );
};

export default MenuHamburger;
