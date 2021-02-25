import React, { Component } from "react";
import UUID from "uuid";
import firebase from "firebase/app";
import "firebase/storage";
import Adapter from "../../Adapter";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditProduct extends Component {
  state = {
    item_name: this.props.product.item_name,
    retail_price: this.props.product.retail_price,
    pomo_price: this.props.product.pomo_price,
    last_cost: this.props.product.last_cost,
    most_recent_vendor: this.props.product.most_recent_vendor,
    unit: this.props.product.unit,
    status: this.props.product.status,
    forecast_sales_three_months: this.props.product.forecast_sales_three_months,
    need_to_order_for_next_three_months: this.props.product.need_to_order_for_next_three_months,
    annualized_sales: this.props.product.annualized_sales,
    annualized_qty: this.props.product.annualized_qty,
    category: this.props.product.category,
    barcode: this.props.product.barcode,
    image_url: this.props.product.image_url,
    updated_at: new Date(),
  };

  newItem_Name = (event) => {
    this.setState({
      item_name: event.target.value,
    });
  };
  newRetailPrice = (event) => {
    this.setState({
      retail_price: event.target.value,
    });
  };

  newPomoPrice = (event) => {
    this.setState({
      pomo_price: event.target.value,
    });
  };

  newLastCost = (event) => {
    this.setState({
      last_cost: event.target.value,
    });
  };

  newMostRecentVendor = (event) => {
    this.setState({
      most_recent_vendor: event.target.value,
    });
  };

  newProductUnit = (event) => {
    this.setState({
      unit: event.target.value,
    });
  };

  newStatus = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  newForecast = (event) => {
    this.setState({
      forecast_sales_three_months: event.target.value,
    });
  };

  newNeedToOrder = (event) => {
    this.setState({
      need_to_order_for_next_three_months: event.target.value,
    });
  };

  newAnnualizedSales = (event) => {
    this.setState({
      annualized_sales: event.target.value,
    });
  };

  newAnnualizedQty = (event) => {
    this.setState({
      annualized_qty: event.target.value,
    });
  };

  newCategory = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  newBarcode = (event) => {
    this.setState({
      barcode: event.target.value,
    });
  };

  newImage_url = (event) => {
    this.setState({
      image_url: event.target.files[0],
    });
  };

  uploadHandler = (event) => {
    event.preventDefault();
    const file = this.state.image_url;
    const key = UUID();
    const storageRef = firebase.storage().ref(key + "/" + file.name);

    // upload the file
    storageRef.put(file).then(() =>
      firebase
        .storage()
        .ref(key)
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          document.getElementById("preview").src = url;
          this.setState({
            image_url: url,
          });
        })
    );
  };

  handleEditedItem = (event) => {
    event.preventDefault();
    const submissionBody = {
      item_name: this.state.item_name,
      retail_price: this.state.retail_price,
      pomo_price: this.state.pomo_price,
      most_recent_vendor: this.state.most_recent_vendor,
      status: this.state.status,
      forecast_sales_three_months: this.state.forecast_sales_three_months,
      need_to_order_for_next_three_months: this.state
        .need_to_order_for_next_three_months,
      annualized_sales: this.state.annualized_sales,
      annualized_qty: this.state.annualized_qty,
      category: this.state.category,
      image_url: this.state.image_url,
      last_edited_by: this.props.currentUser.username,
      last_cost: this.state.last_cost,
      barcode: this.state.barcode,
      unit: this.state.unit,
    };
    const url =
      "http://localhost:3000/items" +
      this.props.product.id;
    Adapter.fetchRequest(url, submissionBody, "PATCH").then(() => {
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].item_name = this.state.item_name;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].retail_price = this.state.retail_price;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].pomo_price = this.state.pomo_price;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].most_recent_vendor = this.state.most_recent_vendor;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].status = this.state.status;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].forecast_sales_three_months = this.state.forecast_sales_three_months;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].need_to_order_for_next_three_months = this.state.need_to_order_for_next_three_months;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].annualized_sales = this.state.annualized_sales;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].annualized_qty = this.state.annualized_qty;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].category = this.state.category;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].image_url = this.state.image_url;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].last_edited_by = this.props.currentUser.username;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].last_cost = this.state.last_cost;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].barcode = this.state.barcode;
      this.props.allProducts[
        this.props.allProducts.indexOf(this.props.product)
      ].unit = this.state.unit;
      this.props.updateToAllProducts(this.props.allProducts);
      this.props.history.push("/items");
    });
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Link style={{ color: "black" }} to="/items">
          Go back
        </Link>
        <form className="new-item-form" onSubmit={this.handleEditedItem}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Edit Item From
          </h2>
          <div className="input-div">
            <label className="left-label">Item Name</label>
            <input
              className="right-label"
              type="text"
              value={this.state.item_name}
              onChange={this.newItem_Name}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Retail Price</label>
            <input
              className="right-label"
              type="number"
              value={this.state.retail_price}
              step="1"
              onChange={this.newRetailPrice}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Promo Price</label>
            <input
              className="right-label"
              type="number"
              value={this.state.pomo_price}
              step="1"
              onChange={this.newPomoPrice}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Last Cost</label>
            <input
              className="right-label"
              value={this.state.last_cost}
              step="1"
              onChange={this.newLastCost}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Most Recent Vendor</label>
            <input
              className="right-label"
              type="text"
              value={this.state.most_recent_vendor}
              onChange={this.newMostRecentVendor}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Unit</label>
            <input
              className="right-label"
              type="text"
              value={this.state.unit}
              onChange={this.newProductUnit}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Status</label>
            <input
              className="right-label"
              type="text"
              value={this.state.status}
              onChange={this.newStatus}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">
              Forecast Sales For The Next 3 Months
            </label>
            <input
              className="right-label"
              type="text"
              value={this.state.forecast_sales_three_months}
              onChange={this.newForecast}
            />
          </div>
          <div className="input-div">
            <label className="left-label">
              Need To Order For The Next 3 Months
            </label>
            <input
              className="right-label"
              type="text"
              value={this.state.need_to_order_for_next_three_months}
              onChange={this.newNeedToOrder}
            />
          </div>
          <div className="input-div">
            <label className="left-label">Annualized Sales</label>
            <input
              className="right-label"
              type="text"
              value={this.state.annualized_sales}
              onChange={this.newAnnualizedSales}
            />
          </div>
          <div className="input-div">
            <label className="left-label">Annualized QTY</label>
            <input
              className="right-label"
              type="text"
              value={this.state.annualized_qty}
              onChange={this.newAnnualizedQty}
            />
          </div>
          <div className="input-div">
            <label className="left-label">Upload Product Image</label>
            <input
              type="file"
              style={{ width: "30%" }}
              onChange={this.newImage_url}
            />
            <button
              onClick={this.uploadHandler}
              className="button file-upload-button"
            >
              Click to Upload
            </button>
          </div>
          <div className="input-div">
            <label className="left-label">Category</label>
            <input
              className="right-label"
              type="text"
              value={this.state.category}
              onChange={this.newCategory}
              required
            />
          </div>
          <div className="input-div">
            <label className="left-label">Barcode</label>
            <input
              className="right-label"
              type="text"
              value={this.state.barcode}
              onChange={this.newBarcode}
              required
            />
          </div>
          <button type="submit" style={{ marginTop: "30px" }}>
            Update Item
          </button>
        </form>
        <div style={{ display: "flex" }}>
          <img
            id="preview"
            src={this.state.image_url}
            style={{ margin: "20px auto" }}
            height="222"
            width="332"
            alt="Please Click Upload"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateToAllProducts: (data) => {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
