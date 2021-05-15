import React, {Component, useRef} from 'react';
import {Link} from 'react-router-dom'
//import Webcam from "react-webcam";
import {connect} from "react-redux"
import UUID from "uuid"
import Checkout from "./Checkout"
import Adapter from '../../Adapter'
import ProductSale from "../Products/ProductSale"
import '../../App.css'
import FaceModel from '../Video/js/face.js'
import demo from '../Video/js/demo.mp4';

class POS extends Component{
  constructor(props){
    super(props);
    this.state = {
      faces: []
    };
  }

  currentTransaction = () => {
    // this.props.disableDeleteButton()
    // const url = "http://localhost:3000/sales_transactions"
    // const submissionBody = {
    //   user_id: 2
    // }
    // Adapter.fetchRequest(url, submissionBody, "POST")
    this.props.checkout()

    let initialTotalDollar = 0
    let totalCheckoutDollars = this.props.checkoutItems.reduce(function(acc, cur) {

      return acc + parseFloat(cur.totalDollars)
    }, initialTotalDollar).toFixed(2)
    this.props.addtotalDollars(totalCheckoutDollars)

    let initialTotalSaving = 0
    let totalCheckoutSavings = this.props.checkoutItems.reduce(function(acc, cur) {
      return acc + parseFloat(cur.totalDollars)
    }, initialTotalSaving).toFixed(2)
    this.props.addtotalSavings(totalCheckoutSavings)

  }

  handleAddToCart = (event) => {
    event.preventDefault()
    // eslint-disable-next-line
    const addedItem = this.props.allProducts.find(product => product.barcode == this.props.checkoutItemInput || product.item_name === this.props.checkoutItemInput)
    // debugger;
    if (addedItem && this.props.checkoutItems.indexOf(addedItem) === -1) {
      addedItem.checkoutqty = 1
      addedItem.totalDollars = addedItem.pomo_price
      addedItem.totalSavings = addedItem.retail_price - addedItem.pomo_price
      // console.log("check Value",addedItem.retail_price-addedItem.pomo_price)
      this.props.addCheckoutItem(addedItem)
      this.props.resetInput()
    }

  }
  
  render(){
    return (
      <div>
        <div style={{width:'60%', float:'left', padding:'30px', margin:'20px 0px 20px 20px'}}>
          <form onSubmit={this.handleAddToCart}>
            <label><a className="ui label large teal" style={{color: "black"}}><i className="add icon"></i>Add Items:</a>
              <div className="ui input"><input type="text" value={this.props.checkoutItemInput} placeholder="Enter barcode or Name" style={{width:'150px'}} onChange={(event) => this.props.handlecheckoutItemInput(event)}/></div></label>
            <button type="submit" value="add to cart">Add to cart</button>
          </form>
          <br></br>
          <table style={{backgroundColor:'#d0cece', borderRadius:'10px', padding:'15px'}}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Selling Price</th>
                <th>Pomo Price</th>
                <th>Total</th>
                <th>Saving</th>
              </tr>
            </thead>
            {
            this.props.processCheckout
              ? <Checkout/>
              : null
            }
            <tbody>
              {
                this.props.checkoutItems.map(product =>< ProductSale checkoutItem = {
                  product
                }
                key = {
                  UUID()
                } />)
              }
            </tbody>
          </table>
          <div className="ui left action input">
            <button style={{marginTop:'20px'}} onClick={this.currentTransaction}>
            <i className="cart icon"></i>
            Checkout</button>
          </div>
        </div>
        <div id="container" style={{position:'absolute'},{height: "540"},{width: "720"},{top: "50%"}}>
          <video src={demo} autoPlay={true} id="video" controls height="540" width="720"></video>
          <FaceModel></FaceModel>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTransactionId: state.currentTransactionId,
    checkoutItemInput: state.checkoutItemInput,
    allProducts: state.allProducts,
    checkoutItems: state.checkoutItems,
    checkoutTotalDollar: state.checkoutTotalDollar,
    checkoutTotalSaving: state.checkoutTotalSaving,
    processCheckout: state.processCheckout,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlecheckoutItemInput: (event) => {
      dispatch({type: "CHECKOUT_ITEM_INPUT", payload: event.target.value})
    },
    addCheckoutItem: (item) => {
      dispatch({type: "ADD_CHECKOUT_ITEM", payload: item})
    },
    checkout: () => {
      dispatch({type: "CHECKOUT"})
    },
    addtotalDollars: (totalCheckout) => {
      dispatch({type: "TOTAL_CHECKOUT_DOLLARS", payload: totalCheckout})
    },
    addtotalSavings: (totalSaving) => {
      dispatch({type: "TOTAL_CHECKOUT_SAVING", payload: totalSaving})
    },
    resetInput: () => {
      dispatch({type: "RESET_INPUT"})
    },
    disableDeleteButton: () => {
      dispatch({type: "DISABLE_DELETE_BUTTON"})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(POS);