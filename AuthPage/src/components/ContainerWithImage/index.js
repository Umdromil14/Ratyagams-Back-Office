import { useCallback, useState, forwardRef } from "react";
import "./style.css";

function ContainerWithImage() {
  return (
    <div className={`image-container`}>
      <div className={`top-border-container`} />
      <div className={`image-container1`}>
        <img className={`image-container2 img-content-e37af567`} />
      </div>
    </div>
  );
}

export default ContainerWithImage;
