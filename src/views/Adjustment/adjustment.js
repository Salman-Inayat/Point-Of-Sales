import React, {Component} from 'react';
import {connect} from "react-redux"
import Adapter from "../../Adapter"
import {Link} from 'react-router-dom'
import '../../App.css'


class Adjustment extends Component {

  handleAdjustmentBarcode = (event)=>{
      this.props.searchBarcodeAdjustment(event.target.value)
      // eslint-disable-next-line
      const adjustmentProduct=this.props.allProducts.find(product=>parseInt(product.barcode) === parseInt(event.target.value))
      if(adjustmentProduct){
        this.props.createAdjustmentProduct(adjustmentProduct)
      }else{
        this.props.createAdjustmentProduct("")
      }
  }

  handleAdjustment = (event)=>{
    event.preventDefault()
    const url= "https://limitless-fjord-48119.herokuapp.com/api/v1/adjustments"
    const submissionBody={
      reason_code:this.props.adjustmenntReasonCode,
      product_id:this.props.adjustmentProduct.id,
      product_name:this.props.adjustmentProduct.item_name,
      qty_to_adjust:this.props.adjustmentQty,
      user_id:this.props.currentUser.id,
      created_by:this.props.currentUser.username,
      total_dollars:this.props.adjustmentQty*this.props.adjustmentProduct.last_cost
    }
    Adapter.fetchRequest(url,submissionBody,"POST").then(()=>{
      const productUrl="https://limitless-fjord-48119.herokuapp.com/api/v1/products/"+this.props.adjustmentProduct.id
      const productSubmissionBody={

        inventory:(parseFloat(this.props.adjustmentProduct.inventory)+parseFloat(this.props.adjustmentQty)).toFixed(2),

        adjustment:(parseFloat(this.props.adjustmentProduct.adjustment)+parseFloat(this.props.adjustmentQty)).toFixed(2),
      }
      // console.log("check",this.props.allProducts.indexOf(this.props.adjustmentProduct))
      // eslint-disable-next-line
      this.props.allProducts[this.props.allProducts.indexOf(this.props.adjustmentProduct)].inventory=(parseFloat(this.props.adjustmentProduct.inventory)+parseFloat(this.props.adjustmentQty)).toFixed(2)
      // eslint-disable-next-line
      this.props.allProducts[this.props.allProducts.indexOf(this.props.adjustmentProduct)].adjustment=(parseFloat(this.props.adjustmentProduct.adjustment)+parseFloat(this.props.adjustmentQty)).toFixed(2)
      this.props.updateAllProducts(this.props.allProducts)
      Adapter.fetchRequest(productUrl,productSubmissionBody,"PATCH")
    }).then(()=>{
        const today = new Date()
        if(today.getMonth()<9){
          if(today.getDate()<10){
            const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                    submissionBody.created_at=date
                    // console.log("check this",submissionBody)
                    this.props.updateAllAdjustments(submissionBody)
                    this.props.createAdjustmentProduct("")
                    this.props.searchBarcodeAdjustment("")
                    this.props.adjustQty("")
                    this.props.adjustmentReason("")

          }else {
            const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                    submissionBody.created_at=date
                    // console.log("check this",submissionBody)
                    this.props.updateAllAdjustments(submissionBody)
                    this.props.createAdjustmentProduct("")
                    this.props.searchBarcodeAdjustment("")
                    this.props.adjustQty("")
                    this.props.adjustmentReason("")
          }
        }else {
          if(today.getDate()<10){
            const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                  submissionBody.created_at=date
                  this.props.updateAllAdjustments(submissionBody)
                  console.log("check this",submissionBody)
                  this.props.createAdjustmentProduct("")
                  this.props.searchBarcodeAdjustment("")
                  this.props.adjustQty("")
                  this.props.adjustmentReason("")
          }else {
            const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                  submissionBody.created_at=date
                  this.props.updateAllAdjustments(submissionBody)
                  console.log("check this",submissionBody)
                  this.props.createAdjustmentProduct("")
                  this.props.searchBarcodeAdjustment("")
                  this.props.adjustQty("")
                  this.props.adjustmentReason("")
          }

        }
    })
  }

  render() {

    return (
    <div className='adjustment-section'>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <form style={{width:'50%', padding:"0px 40px"}} onSubmit={this.handleAdjustment}>
        <h1 style={{marginBottom:'20px'}}>Create Adjustment</h1>
        <div className="input-div">
          <label className="left-label" for="barcode">Barcode </label>
          <input className="right-label" name="barcode" type="text" value={this.props.adjustmentBarcode} onChange={this.handleAdjustmentBarcode} required/>
        </div>
        <div className="input-div">
          <p className='left-label'>Product Name </p>
          <input type="text" className='right-label' value={this.props.adjustmentProduct.item_name}/>
        </div>
        <div className="input-div">
          <p className='left-label'>Last Cost</p>
          <input type="text" className='right-label' value={this.props.adjustmentProduct.last_cost}/>
        </div>
        <div className="input-div">
          <p className='left-label'>Qty to adjust</p>
          <input type="number" className='right-label' step="1" value={this.props.adjustmentQty} onChange={(event)=>this.props.adjustQty(event.target.value)} required/>        
        </div>
        <div className="input-div">
          <p className='left-label'>Total Cost Dollars</p>
          <input type="text" className='right-label' value={(this.props.adjustmentProduct.last_cost*this.props.adjustmentQty) ? this.props.adjustmentProduct.last_cost*this.props.adjustmentQty : null}  />        
        </div>
        <div className="input-div">
          <p className='left-label'>Reason Code</p>
          <input type="text" className='right-label' value={this.props.adjustmenntReasonCode}   onChange={(event)=>this.props.adjustmentReason(event.target.value)}/>        
        </div>
        <button type="submit">Create Adjustment</button>
      </form>
      <div style={{padding:'20px 10px'}}>
        <p><img className="adjustment-image" src={this.props.adjustmentProduct.image_url} alt="Enter barcode to display image"/></p>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return{
    adjustmentProduct:state.adjustmentProduct,
    adjustmentBarcode:state.adjustmentBarcode,
    allProducts:state.allProducts,
    adjustmentQty:state.adjustmentQty,
    adjustmenntReasonCode:state.adjustmenntReasonCode,
    currentUser:state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    createAdjustmentProduct: (data) => {
      dispatch({type: "CREATE_ADJUSTMENT_PRODUCT", payload: data})
    },
    searchBarcodeAdjustment:(data) => {
      dispatch({type: "SEARCH_BARCODE_ADJUSTMENT", payload: data})
    },
    adjustQty:(data) => {
      dispatch({type: "ADJUST_QTY", payload: data})
    },
    adjustmentReason:(data) => {
      dispatch({type: "REASON_CODE", payload: data})
    },
    updateAllProducts:(data)=>{
      dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
    },
    updateAllAdjustments:(data)=>{
      dispatch({type: "ADD_ADJUSTMENT_ALL",payload:data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adjustment)
