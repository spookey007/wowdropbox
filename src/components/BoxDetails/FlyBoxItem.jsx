import React, { useEffect, useRef } from "react";
import "./FlyBoxItem.css";

const FlyItem = ({ ItemImage }) => {
  const itemRef = useRef(null);

  const handleFly = () => {
    const item = itemRef.current;
    if (!item) return;

    const clone = item.cloneNode(true);
    const rect = item.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.classList.add("fly-to-header");

    document.body.appendChild(clone);
    item.style.visibility = "hidden";

    setTimeout(() => {
      clone.remove();
    }, 900);
  };

  useEffect(() => {
    handleFly();
  }, []);

  return (
    <div ref={itemRef} className="item-fly">
      <img src={ItemImage} alt="item" />
    </div>
  );
};

export default FlyItem;
