import { connect } from "react-redux";
import React, { Component } from "react";
import Adapter from "../../Adapter";

class DisplayOrder extends Component {
  processReceiving = () => {
    if (this.props.order.id) {
      let date = 0;
      const today = new Date();
      if (today.getMonth() < 9) {
        if (today.getDate() < 10) {
          date =
            today.getFullYear().toString() +
            "-0" +
            (today.getMonth() + 1).toString() +
            "-0" +
            today.getDate().toString();
        } else {
          date =
            today.getFullYear().toString() +
            "-0" +
            (today.getMonth() + 1).toString() +
            "-" +
            today.getDate().toString();
        }
      } else {
        if (today.getDate() < 10) {
          date =
            today.getFullYear().toString() +
            "-" +
            (today.getMonth() + 1).toString() +
            "-0" +
            today.getDate().toString();
        } else {
          date =
            today.getFullYear().toString() +
            "-" +
            (today.getMonth() + 1).toString() +
            "-" +
            today.getDate().toString();
        }
      }

      this.props.filterOrders[
        this.props.filterOrders.indexOf(this.props.order)
      ].on_order = false;
      this.props.filterOrders[
        this.props.filterOrders.indexOf(this.props.order)
      ].received = true;
      this.props.filterOrders[
        this.props.filterOrders.indexOf(this.props.order)
      ].received_by = this.props.currentUser.username;
      this.props.filterOrders[
        this.props.filterOrders.indexOf(this.props.order)
      ].updated_at = date;
      this.props.processFilterOrders(this.props.filterOrders);

      this.props.allOrders[
        this.props.allOrders.indexOf(this.props.order)
      ].on_order = false;
      this.props.allOrders[
        this.props.allOrders.indexOf(this.props.order)
      ].received = true;
      this.props.allOrders[
        this.props.allOrders.indexOf(this.props.order)
      ].received_by = this.props.currentUser.username;
      this.props.allOrders[
        this.props.allOrders.indexOf(this.props.order)
      ].updated_at = date;
      this.props.processAllOrders(this.props.allOrders);
      const url = "http://localhost:3000/orders/" + this.props.order.id;
      const submissionBody = {
        on_order: false,
        received: true,
        received_by: this.props.currentUser.username,
      };
      Adapter.fetchRequest(url, submissionBody, "PATCH").then(() => {
        const productUrl =
          "http://localhost:3000/items/" + this.props.order.product_id;
        const currentProduct = this.props.allProducts.find(
          (product) => product.id === this.props.order.product_id
        );
        const productSubmissionBody = {
          order: parseFloat(currentProduct.order) + parseFloat(this.props.order.qty),
          inventory: parseFloat(currentProduct.inventory) + parseFloat(this.props.order.qty),
          last_cost: this.props.order.price,
          most_recent_vendor: this.props.order.vendor_name,
        };

        Adapter.fetchRequest(productUrl, productSubmissionBody, "PATCH");
        this.props.allProducts[
          this.props.allProducts.indexOf(currentProduct)
        ].order =
          parseFloat(currentProduct.order) + parseFloat(this.props.order.qty);
        this.props.allProducts[
          this.props.allProducts.indexOf(currentProduct)
        ].inventory =
          parseFloat(currentProduct.inventory) +
          parseFloat(this.props.order.qty);
        this.props.allProducts[
          this.props.allProducts.indexOf(currentProduct)
        ].last_cost = this.props.order.price;
        this.props.allProducts[
          this.props.allProducts.indexOf(currentProduct)
        ].most_recent_vendor = this.props.order.vendor_name;
        this.props.updateAllProducts(this.props.allProducts);
      });
      this.forceUpdate();
    } else {
      window.location.reload(true);
    }
  };

  render() {
    console.log(this.props.order.product_id)
    console.log(this.props.allProducts.find(product => product.id === this.props.order.product_id))
    return (
      <div className="order-card">
        <div className="order-card-left" id="center-order-card">
          <h3 style={{ margin: "10px 0px", textTransform: "uppercase" }}>
            {this.props.order.product_name}
          </h3>
          <p style={{ margin: "10px 0px" }}>Quantity: {this.props.order.qty}</p>
          <p style={{ margin: "10px 0px" }}>Price: {this.props.order.price}</p>
          <p style={{ margin: "10px 0px" }}>
            Total Dollars: {this.props.order.total_dollars}
          </p>
          <p style={{ margin: "10px 0px" }}>
            Vendor Name: {this.props.order.vendor_name}
          </p>
          <p style={{ margin: "10px 0px" }}>
            Order By: {this.props.order.order_by}
          </p>
          <p style={{ margin: "10px 0px" }}>
            Received By: {this.props.order.received_by}
          </p>
          <p style={{ margin: "10px 0px" }}>
            Order Created Date: {this.props.order.created_at.slice(0, 10)}
          </p>
          {this.props.order.received ? (
            <h4 style={{ marginTop: "5px" }}>Received Already!</h4>
          ) : (
            <div>
              <button
                style={{ marginTop: "20px" }}
                className="ui teal button"
                onClick={this.processReceiving}
              >
                Click To Confirm Product Received
              </button>
            </div>
          )}
        </div>
        <div className="order-card-right">
          <img className="" src={this.props.allProducts.find(product => product.id === this.props.order.product_id).image_url} alt="" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    allProducts: state.allProducts,
    filterOrders: state.filterOrders,
    allOrders: state.allOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputFilterOption: (data) => {
      dispatch({ type: "ORDER_RADIO_BUTTON", payload: data });
    },
    processFilterOrders: (data) => {
      dispatch({ type: "UPDATE_FILTER_ORDERS", payload: data });
    },
    processAllOrders: (data) => {
      dispatch({ type: "UPDATE_ALL_ORDERS", payload: data });
    },
    updateAllProducts: (data) => {
      dispatch({ type: "UPDATE_ALL_PRODUCTS", payload: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayOrder);
