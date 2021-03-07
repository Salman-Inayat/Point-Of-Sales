import React, {useState}  from 'react';
import Adapter from "../../Adapter"
import {connect} from "react-redux"
import UUID from "uuid"
import firebase from "firebase/app"
import "firebase/storage"
import {Link} from 'react-router-dom'
import axios from 'axios'


const CreateNewItem = (props) => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
		// setIsSelected(true);
  };
  
  const uploadHandler = (event) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('barcode', props.barcode);
    axios.post('http://localhost:5000/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  // function uploadHandler(event) {
  //   event.preventDefault()

  //   const file = props.image_url
  //   const key = UUID();
  //   const storageRef = firebase.storage().ref(key + "/" + file.name)

  //   // upload the file
  //   storageRef.put(file).then(() => firebase.storage().ref(key).child(file.name).getDownloadURL().then(url => {
  //     document.getElementById('preview').src = url
  //     props.getImageUrl(url)
  //   }))
  //   // get the file url
  // }

  function handleCreateNewItem(event) {
    event.preventDefault()
    const submissionBody = {
      user_id: props.currentUser.id,
      item_name: props.newProductName,
      retail_price: props.retail_price,
      pomo_price: props.pomo_price,
      most_recent_vendor: props.most_recent_vendor,
      created_by: props.currentUser.username,
      order: 0,
      inventory: 0,
      adjustment: 0,
      status: props.status,
      sales: 0,
      forecast_sales_three_months: props.forecast_sales_three_months,
      need_to_order_for_next_three_months: props.need_to_order_for_next_three_months,
      annualized_sales: props.annualized_sales,
      annualized_qty: props.annualized_qty,
      category: props.category,
      image_url: "",
      last_edited_by: props.currentUser.username,
      last_cost: props.last_cost,
      barcode: props.barcode,
      unit:props.unit,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const url = "http://localhost:3000/items"
    Adapter.fetchRequest(url, submissionBody, "POST").then(() => {
      console.log("good")
      props.addProduct(submissionBody)
      props.history.push("/items")
    })
  }

  return (<div>
 <Link to="/items" style={{ margin: "30px", color: "black" }}>
        Go Back
      </Link>
    <form className='new-item-form' onSubmit={handleCreateNewItem}>
      <h2 style={{textAlign:'center', marginBottom:'20px'}}>Create New Item From</h2>
      <div className="input-div">
        <label className="left-label" >Item Name</label>
        <input className="right-label" type="text" value={props.newProductName} onChange={(event) => props.newItemName(event)} required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Retail Price</label>
        <input className="right-label" type="number" value={props.retail_price} step="1" onChange={(event) => props.newRetailPrice(event)} required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Promo Price</label>
        <input className="right-label" type="number" value={props.pomo_price} step="1" onChange={(event) => props.newPomoPrice(event)} required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Last Cost</label>
        <input className="right-label" type="number"  value={props.last_cost} step="1" onChange={(event) => props.newLastCost(event)} required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Most Recent Vendor</label>
        <input className="right-label" type="text"  value={props.most_recent_vendor} onChange={(event) => props.newMostRecentVendor(event)}required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Unit</label>
        <input className="right-label" type="text"  value={props.unit} onChange={(event) => props.newProductUnit(event.target.value)}required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Status</label>
        <input className="right-label" type="text"  value={props.status} onChange={(event) => props.newStatus(event)}required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Forecast Sales For The Next 3 Months</label>
        <input className="right-label" type="text"  value={props.forecast_sales_three_months} onChange={(event) => props.newForecast(event)}/>
      </div>
      <div className="input-div">
        <label className="left-label" >Need To Order For The Next 3 Months</label>
        <input className="right-label" type="text"  value={props.need_to_order_for_next_three_months} onChange={(event) => props.newNeedToOrder(event)}/>
      </div>
      <div className="input-div">
        <label className="left-label" >Annualized Sales</label>
        <input className="right-label" type="text"  value={props.annualized_sales} onChange={(event) => props.newAnnualizedSales(event)}/>
      </div>
      <div className="input-div">
        <label className="left-label" >Annualized QTY</label>
        <input className="right-label" type="text"  value={props.annualized_qty} onChange={(event) => props.newAnnualizedQty(event)}/>
      </div>
      <div className="input-div">
        <label className="left-label" >Upload Product Image</label>
        {/* <input  type="file" name="my_image" style={{width:'30%'}} onChange={(event) => props.newImage_url(event)}/> */}
        <input  type="file" name="file" style={{width:'30%'}} onChange={changeHandler}/>
      <button onClick={uploadHandler} className="button file-upload-button">Click to Upload</button>
      </div>
      <div className="input-div">
        <label className="left-label" >Category</label>
        <input className="right-label" type="text"  value={props.category} onChange={(event) => props.newCategory(event)}required/>
      </div>
      <div className="input-div">
        <label className="left-label" >Barcode</label>
        <input className="right-label" type="text"  value={props.barcode} name="barcode" onChange={(event) => props.newBarcode(event)}required/>
      </div>
      <button type="submit" style={{marginTop:'30px'}}>Create New Item</button>
    </form>
    {/* {props.image_url ? <img id="preview" src={props.image_url} height="222" width="332" alt="Please Click Upload"/> : null} */}
  </div>)

}

function mapStateToProps(state) {
  return {
    newProductName: state.newProductName,
    retail_price: state.retail_price,
    pomo_price: state.pomo_price,
    last_cost: state.last_cost,
    most_recent_vendor: state.most_recent_vendor,
    status: state.status,
    forecast_sales_three_months: state.forecast_sales_three_months,
    need_to_order_for_next_three_months: state.need_to_order_for_next_three_months,
    annualized_sales: state.annualized_sales,
    annualized_qty: state.annualized_qty,
    category: state.category,
    image_url: state.image_url,
    barcode: state.barcode,
    currentUser: state.currentUser,
    unit:state.unit,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newItemName: (event) => {
      dispatch({type: "NEW_ITEM_NAME_INPUT", payload: event.target.value})
    },
    newRetailPrice: (event) => {
      dispatch({type: "NEW_RETAIL_PRICE_INPUT", payload: event.target.value})
    },
    newPomoPrice: (event) => {
      dispatch({type: "NEW_POMO_PRICE_INPUT", payload: event.target.value})
    },
    newLastCost: (event) => {
      dispatch({type: "NEW_LAST_COST_INPUT", payload: event.target.value})
    },
    newMostRecentVendor: (event) => {
      dispatch({type: "NEW_VENDOR_INPUT", payload: event.target.value})
    },
    newStatus: (event) => {
      dispatch({type: "NEW_STATUS_INPUT", payload: event.target.value})
    },
    newForecast: (event) => {
      dispatch({type: "NEW_FORECAST_INPUT", payload: event.target.value})
    },
    newNeedToOrder: (event) => {
      dispatch({type: "NEW_NEED_TO_ORDER_INPUT", payload: event.target.value})
    },
    newAnnualizedSales: (event) => {
      dispatch({type: "NEW_ANNUALIZED_SALES_INPUT", payload: event.target.value})
    },
    newAnnualizedQty: (event) => {
      dispatch({type: "NEW_ANNUALIZED_QTY_INPUT", payload: event.target.value})
    },
    newCategory: (event) => {
      dispatch({type: "NEW_CATEGORY_INPUT", payload: event.target.value})
    },
    newImage_url: (event) => {
      dispatch({type: "NEW_IMAGE_INPUT", payload: event.target.files[0]})
    },
    newBarcode: (event) => {
      dispatch({type: "NEW_BARCODE_INPUT", payload: event.target.value})
    },
    getImageUrl: (url) => {
      dispatch({type: "GET_IMAGE_URL", payload: url})
    },
    addProduct: (newProduct) => {
      dispatch({type: "ADD_NEW_PRODUCT", payload: newProduct})
    },
    newProductUnit:(unit) =>{
      dispatch({type: "NEW_PRODUCT_UNIT", payload: unit})
    },
    updateAllProducts:(data)=>{
      dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewItem)
