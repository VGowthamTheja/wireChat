import React from "react";

type Props = {};

const LoadSpinner = (props: Props) => {
  return (
    <div className="loaderSlate">
      <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar3"></span>
      <span className="bar bar4"></span>
      <span className="bar bar5"></span>
    </div>
  );
};

export default LoadSpinner;
