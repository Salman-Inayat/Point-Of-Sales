import React from 'react';

const DisplayAdjustment =(props)=>{

  return(
      <li style={{margin:'8px 0px'}}>{props.adjustment.qty_to_adjust<0 ? props.adjustment.qty_to_adjust+" "+props.adjustment.product_name+" (Decrease inventoroy becasue "+props.adjustment.reason_code+") on "+props.adjustment.created_at.slice(0,10) :
            props.adjustment.qty_to_adjust+" "+props.adjustment.product_name+" (Increase inventoroy becasue "+props.adjustment.reason_code+") on "+props.adjustment.created_at.slice(0,10)
      }</li>
  )
}

export default DisplayAdjustment
