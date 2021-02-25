import React, { Component } from 'react';
import {connect} from "react-redux"
import Adapter from "../../Adapter"

class ProductOrder extends Component {

handleClickOrder=()=>{
if (this.props.order.id) {
  const today = new Date()
  if(today.getMonth()<9){
    if (today.getDate()<10) {
      const ReceivedDate=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].updated_at=ReceivedDate
        this.props.processAllOrders(this.props.allOrders)
        this.forceUpdate()
    } else {
      const ReceivedDate=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
      this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].updated_at=ReceivedDate
        this.props.processAllOrders(this.props.allOrders)
        this.forceUpdate()
    }

}else{
  if (today.getDate()<10) {
    const ReceivedDate=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].updated_at=ReceivedDate
      this.props.processAllOrders(this.props.allOrders)
      this.forceUpdate()
  } else {
    const ReceivedDate=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
    this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].updated_at=ReceivedDate
      this.props.processAllOrders(this.props.allOrders)
      this.forceUpdate()
  }

}
  const url="https://raw.githubusercontent.com/Salman-Inayat/Demo-json/main/orderjson.json"+this.props.order.id
  const submissionBody={
    on_order:false,
    received:true,
    received_by:this.props.currentUser.username
  }

  Adapter.fetchRequest(url,submissionBody,"PATCH").then(()=>{
    const productUrl="https://raw.githubusercontent.com/Salman-Inayat/Demo-json/main/items.json"+this.props.order.product_id
    const currentProduct=this.props.allProducts.find(product=>product.id === this.props.order.product_id)
    const productSubmissionBody={
      order:(parseFloat(currentProduct.order) + parseFloat(this.props.order.qty)).toFixed(2),
      inventory:(parseFloat(currentProduct.inventory) + parseFloat(this.props.order.qty)).toFixed(2),
      last_cost:this.props.order.price,
      most_recent_vendor:this.props.order.vendor_name,
    }
    Adapter.fetchRequest(productUrl,productSubmissionBody,"PATCH")
    this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].order=(parseFloat(currentProduct.order) + parseFloat(this.props.order.qty)).toFixed(2)
    this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].inventory=(parseFloat(currentProduct.inventory) + parseFloat(this.props.order.qty)).toFixed(2)
    this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].last_cost=this.props.order.price
    this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].most_recent_vendor=this.props.order.vendor_name

    this.props.updateAllProducts(this.props.allProducts)
  })
}else {
  window.location.reload(true)
}

}
 render() {

return (<li>
<p><strong>Order Date: {this.props.order.created_at.slice(0,10)}</strong></p>
<div>{this.props.order.qty} {this.props.allProducts.find(product=>product.id === this.props.order.product_id).unit} of {this.props.order.product_name} {this.props.order.received ? "received by "+this.props.order.received_by+ " on "+this.props.order.updated_at.slice(0,10) : <p>Click to confirm Received<button onClick={this.handleClickOrder}>On Order</button></p> }</div>
  </li>)
 }
 }


 function mapStateToProps(state) {
   return {
     currentUser: state.currentUser,
     allProducts:state.allProducts,
     allOrders:state.allOrders,
   }
 }

 function mapDispatchToProps(dispatch) {
   return {
     processAllOrders: (data) => {
       dispatch({type: "UPDATE_ALL_ORDERS", payload: data})
     },
     updateAllProducts:(data)=>{
       dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
     },
   }
 }


 export default connect(mapStateToProps,mapDispatchToProps)(ProductOrder);