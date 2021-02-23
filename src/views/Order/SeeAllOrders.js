import React from 'react';
import {connect} from "react-redux"
import OrderList from "./OrderList"
import {Link} from 'react-router-dom'


const SeeAllOrders=(props)=>{

function handleRadioButton(event) {
  // console.log("just want to check")
  props.inputFilterOption(event.target.value)
  if(event.target.value === "All Order"){
      props.filterOrderList(props.allOrders)

  }else if (event.target.value === "On Order") {
    const onOrders=props.allOrders.filter(order=>order.on_order)
    props.filterOrderList(onOrders)

  }else if (event.target.value === "Received") {
    const received=props.allOrders.filter(order=>order.received)
    props.filterOrderList(received)
  }
}

function handleSubmitOrderSearch(event) {
  event.preventDefault()
  if(props.filterOption === "All Order"){
    const filterByall=props.allOrders.filter(order=>order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByall)

  }else if (props.filterOption === "On Order") {
    const filterByOnOrder=props.allOrders.filter(order=> order.on_order && order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByOnOrder)
  }else if (props.filterOption === "Received") {
    const filterByReceived=props.allOrders.filter(order=> order.received && order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByReceived)
  }else {
    const filterByall=props.allOrders.filter(order=>order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByall)
  }

}
  return(
    <div className='seeAllOrders-section'>
    <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>

      <form onSubmit={handleSubmitOrderSearch} className="input-center">
        <div onChange={handleRadioButton}>
          <label><input style={{height:'16px'}} type="radio" value="All Order" name="All Order" checked={props.filterOption === "All Order"}/>&nbsp;&nbsp;All Order</label>&nbsp;&nbsp;
          <label><input style={{height:'16px'}} type="radio" value="On Order" name="On Order" checked={props.filterOption === "On Order"}/>&nbsp;&nbsp;On Order</label>&nbsp;&nbsp;
          <label><input style={{height:'16px'}} type="radio" value="Received" name="Received" checked={props.filterOption === "Received"}/>&nbsp;&nbsp;Received</label>&nbsp;&nbsp;
        </div>

        <input type="text" value={props.ordersSearchInput} onChange={(event)=>props.inputOrdersSearch(event.target.value)} placeholder="search by item name" />
        <button style={{marginLeft:'10px'}} type="submit">Search</button> 
      </form>
      <br></br>
      <br></br>
      <OrderList />
    </div>)
}


function mapStateToProps(state) {
  return {
    allOrders: state.allOrders,
    filterOrders:state.filterOrders,
    filterOption:state.filterOption,
    ordersSearchInput:state.ordersSearchInput,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputFilterOption: (data) => {
      dispatch({type: "ORDER_RADIO_BUTTON", payload: data})
    },
    inputOrdersSearch:(data) => {
      dispatch({type: "SEARCH_ORDER_INPUT", payload: data})
    },
    filterOrderList: (data) => {
      dispatch({type: "FILTER_ORDERS_LIST", payload: data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllOrders)
