import React from "react";
// import "./card.css";

function Card(props) {
  return (
    <>
      
        
        <div className="cardView" style={{display:'flex',  flexDirection:'column', gap:'5px'}}>
          <h2 style={{ fontSize: '60px' }}>{props.number}</h2>
          <h6 style={{fontSize:'13px'}}>{props.task}</h6>

        </div>
       
      
    </>
  );
}

export default Card;