import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Adapter from "../../Adapter"


class Order extends Component {

  handleSeeAllOrders = (event)=>{
    this.props.history.push("/allorders")
  }

  createOpenOrder=(event)=> {
    event.preventDefault()
    // const url="https://limitless-fjord-48119.herokuapp.com/api/v1/orders";
    const url="https://raw.githubusercontent.com/Salman-Inayat/Demo-json/main/orderjson.json";
    const submissionBody={
      product_id:this.props.orderProduct.id,
      product_name:this.props.orderProduct.item_name,
      qty:this.props.orderQty,
      price:this.props.orderPrice,
      vendor_name:this.props.orderVendor,
      user_id:this.props.currentUser.id,
      order_by:this.props.currentUser.username,
      on_order:true,
      received:false,
      received_by:"Not Yet",
      total_dollars:this.props.orderPrice*this.props.orderQty,
    }


    Adapter.fetchRequest(url,submissionBody,"POST").then(()=>{
        const today = new Date()
          if(today.getMonth()<9){
            if (today.getDate()<10) {
              const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                      submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            } else {
              const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                      submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            }

          }else {
            if (today.getDate()<10) {
              const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                    submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            } else {
              const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                    submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            }

          }


    })

  }

  handleBarcode = (event)=>{
    // console.log("barcode",this.props.allProducts)
    this.props.searchBarcodeOrder(event.target.value)
    // eslint-disable-next-line
    const orderProduct=this.props.allProducts.find(product=>parseInt(product.barcode) === parseInt(event.target.value))
    if(orderProduct){
      this.props.createOrderProduct(orderProduct)
    }else{
      this.props.createOrderProduct("")
    }
  }

  render() {
      // console.log("check",this.props.allProducts)
    return (
      <div className='order-section'>
        <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>

        <button type="button"  onClick={this.handleSeeAllOrders}>See All Orders</button>
        <h1 style={{margin:'20px 0px 40px 0px', textAlign:'center'}}>Create Order</h1>
        <div style={{display:'flex'}}>
          <form style={{width:'50%', padding:"0px 40px"}} onSubmit={this.createOpenOrder}>
            <div className="input-div">
              <label className="left-label" for="barcode">Barcode </label>
              <input className="right-label" name="barcode" type="text" value={this.props.orderBarcode} onChange={this.handleBarcode} required/>
            </div>
            <div className="input-div">
              <p className='left-label'>Product ID </p>
              <input type="text" className='right-label' value={this.props.orderProduct.id}/>
            </div>
            <div className="input-div">
              <p className='left-label'>Product Name</p>
              <input type="text" className='right-label' value={this.props.orderProduct.item_name}/>
            </div>
            <div className="input-div">
              <p className='left-label'>Quantity</p>
              <input type="number" className='right-label' step="1" value={this.props.orderQty} onChange={(event)=>this.props.placeOrderQTY(event.target.value) } required/>        
            </div>
            <div className="input-div">
              <p className='left-label'>Price</p>
              <input type="number" className='right-label' value={this.props.orderPrice} step="1" onChange={(event)=>this.props.placeOrderPrice(event.target.value)} required/>        
            </div>
            <div className="input-div">
              <p className='left-label'>Dollars</p>
              <input type="text" className='right-label' value={this.props.orderQty*this.props.orderPrice}/>        
            </div>
            <div className="input-div">
              <p className='left-label'>Vendor Name</p>
              <input type="text" className='right-label'  value={this.props.orderVendor} onChange={(event)=>this.props.placeOrderVendor(event.target.value)} required/>      
            </div>



            {/* <label>Barcode: <input type="text" value={this.props.orderBarcode} onChange={this.handleBarcode} required/></label><br></br>
            <p>Product ID: <b>{this.props.orderProduct.id}</b></p>
            <p>Product Name: <b>{this.props.orderProduct.item_name}</b></p>
            <p><label>Quantity: <input type="number" value={this.props.orderQty} onChange={(event)=>this.props.placeOrderQTY(event.target.value) } required/></label></p>
            <p><label>Price: <input type="number" value={this.props.orderPrice} step="0.01" onChange={(event)=>this.props.placeOrderPrice(event.target.value)} required/></label></p>
            <p>Total Dollars: {this.props.orderQty*this.props.orderPrice}</p>
            <p><label>Vendor Name: <input type="text" value={this.props.orderVendor} onChange={(event)=>this.props.placeOrderVendor(event.target.value)} required/></label></p> */}
            <button  type="submit" style={{marginTop:'30px'}} >Create Open Order</button>
          </form>
          <div>
            <p style={{textAlign:'center'}}><img className="order-image" src={this.props.orderProduct.image_url} alt=""/></p>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    allProducts:state.allProducts,
    orderProduct:state.orderProduct,
    orderBarcode:state.orderBarcode,
    orderQty:state.orderQty,
    orderPrice:state.orderPrice,
    orderVendor:state.orderVendor,
    currentUser:state.currentUser,
    allOrders:state.allOrders,
  }
}

function mapDispatchToProps(dispatch) {
return{
  createOrderProduct: (data) => {
    dispatch({type: "CREATE_ORDER_PRODUCT", payload: data})
  },
  searchBarcodeOrder: (data) => {
    dispatch({type: "SEARCH_BARCODE", payload: data})
  },

  placeOrderQTY: (data) => {
    dispatch({type: "PLACE_ORDER_QTY", payload: data})
  },
  placeOrderPrice: (data) => {
    dispatch({type: "PLACE_ORDER_PRICE", payload: data})
  },
  placeOrderVendor: (data) => {
    dispatch({type: "PLACE_ORDER_VENDOR", payload: data})
  },
  addNewOrder: (data) => {
    dispatch({type: "ADD_NEW_ORDER", payload: data})
  },
}

}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
