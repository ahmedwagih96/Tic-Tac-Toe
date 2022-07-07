import { useState } from "react";
const Square = ({value, handleClick}) => {


  return (
    <div 
    className="square"
    onClick={handleClick}
    >
      {value}
    </div>
  );
}
 
export default Square;