import React from "react";
// import "./card.css";

function CardThree(props) {
  return (
    <>
      
        
      <div className="cardView" style={{display:'flex',  flexDirection:'column', gap:'5px'}}>
        <h2 style={{ fontSize: '60px' }}>{props.number}</h2>
          <h6 style={{fontSize:'13px'}}>{props.task}</h6>

        </div>
        <div class="form-group " >
         <select style={{border:'none', width:'120px'}}>
          <option selected>{props.option}</option>
          <option>{props.option1}</option>
          <option>{props.option2}</option>
         
         </select>
        </div>
      
    </>
  );
}

export default CardThree;



 {/* <div className="box">
 <select id="selectOption" style={{ border: '1px solid black', float: 'right', marginTop: '2px' }}>
 <option value="option1">Week</option>
 <option value="option2">Month</option>
 <option value="option3">Year</option>
</select>
</div> */}