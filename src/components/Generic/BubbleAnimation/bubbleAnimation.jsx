import React from "react";
import "./bubbleAnimation.css";

const BubbleAnimation = ({ bgColor }) => {
  const bubbles = Array(10).fill(null);

  return (
    <div className="bubbles">
      {bubbles.map((_, index) => (
        <div
          key={index}
          className="bubble"
          style={{ backgroundColor: bgColor }}></div>
      ))}
    </div>
  );
};

export default BubbleAnimation;
