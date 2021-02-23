import React from 'react';
import {connect} from "react-redux"
import DisplayOrder from "./DisplayOrder"
import UUID from "uuid"


const OrderList=(props)=>{

  return(<div className="ui four centered cards">
    {props.filterOrders ? props.filterOrders.map(order=>
    <DisplayOrder order={order} key={UUID()}/>) : null}
  </div>)
}

function mapStateToProps(state) {
  return {
    filterOrders:state.filterOrders,
  }
}

export default connect(mapStateToProps)(OrderList)
