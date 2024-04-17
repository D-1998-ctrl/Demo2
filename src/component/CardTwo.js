import React from "react";
// import "./card.css";

function CardTwo(props) {
  return (
    <>
      
        
      <div className="cardView" style={{display:'flex',  flexDirection:'column', gap:'5px'}}>
        <h2 style={{ fontSize: '60px' }}>{props.number}</h2>
          <h6 style={{fontSize:'13px'}}>{props.task}</h6>

        </div>
        <div class="form-group " >
         <select style={{border:'none', width:'100px'}}>
          <option selected>{props.option}</option>
          <option>{props.option1}</option>
          <option>{props.option2}</option>
          <option>{props.option3}</option>
         </select>
        </div>
      
    </>
  );
}

export default CardTwo;


