import React, {Component} from 'react';
import {connect} from "react-redux"
import Checkout from "../POS/Checkout";

class ProductSale extends Component {
  state = {
    userInput: this.props.checkoutItem.checkoutqty
  }

  handleQtyInput = (event) => {
    const item=this.props.checkoutItems.find(checkoutItem=>checkoutItem.id === this.props.checkoutItem.id)
    // eslint-disable-next-line
    let qtyInput;
    if(parseFloat(event.target.value)){

      qtyInput=parseFloat(event.target.value)
      // console.log(parseFloat(event.target.value))
    }else {
      qtyInput=0
    }


    this.setState({userInput: qtyInput})
    this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].checkoutqty = qtyInput
    this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].totalDollars = (this.props.checkoutItem.pomo_price * qtyInput).toFixed(2)
    this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].totalSavings = (this.props.checkoutItem.retail_price - this.props.checkoutItem.pomo_price) * qtyInput
    this.props.addTotal(this.props.checkoutItems)
  }

  handleDelete = ()=>{
    const items = this.props.checkoutItems.filter(item => item.id !== this.props.checkoutItem.id)
    this.props.deleteCheckoutItem(items)
  }
  render() {
    // console.log("check input",this.props.checkoutItem)
    return (<tr>
      <td>{this.props.checkoutItem.item_name}</td>
      <td><input type="number" step="1" value={this.state.userInput} onChange={this.handleQtyInput}/></td>
      <td>{this.props.checkoutItem.retail_price}</td>
      <td>{this.props.checkoutItem.pomo_price}</td>
      <td>{this.props.checkoutItem.totalDollars}</td>
      <td>{this.props.checkoutItem.totalSavings}</td>
      <td><button className="negative ui button" onClick={this.handleDelete} disabled={this.props.disableDeleteButton}> <i className="trash alternate icon"></i>delete</button></td>
      {this.state.userInput<0 ? <td><button className="negative ui button">Return</button></td> :null }
    </tr>)
  }
}

function mapStateToProps(state) {
  return {checkoutItems: state.checkoutItems,
  disableDeleteButton:state.disableDeleteButton,
}
}

function mapDispatchToProps(dispatch) {
  return {
    addTotal: (checkoutItems) => {
      dispatch({type: "ADD_TOTAL_DOLLARS", payload: checkoutItems})
    },
    deleteCheckoutItem: (checkoutItems) => {
      dispatch({type: "DELETE_CHECKOUT_ITEM", payload: checkoutItems})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSale);