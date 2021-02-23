import React from 'react';
import '../../App.css'

const DisplayProductSale = (props) => {

  return (
  <tr>
    <td>{props.productSale.product_name}</td>
    <td>{props.productSale.qty}</td>
    <td>{props.productSale.retail_price}</td>
    <td>{props.productSale.pomo_price}</td>
    <td>{props.productSale.total}</td>
    <td>{props.productSale.total_saving}</td>
    <td>{props.productSale.created_at.slice(0,10)}</td>
  </tr>)
}

export default DisplayProductSale;
