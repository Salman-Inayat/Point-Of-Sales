import React, { Component } from "react";
import { connect } from "react-redux";
import UUID from "uuid";
import ProductOrder from "./ProductOrder";
import { Link } from "react-router-dom";
import "../../App.css";
import Grid from "@material-ui/core/Grid";

class ProductOrdersList extends Component {
  componentDidMount() {
    this.props.handleProductOrdersListing(this.props.orders);
  }

  handleRadioButton = (event) => {
    this.props.handleProductOrderRadio(event.target.value);
    const radioInput = event.target.value;

    if (radioInput === "All Order") {
      this.props.handleProductOrdersListing(this.props.orders);
    } else if (radioInput === "On Order") {
      const onOrderList = this.props.orders.filter((order) => order.on_order);
      this.props.handleProductOrdersListing(onOrderList);
    } else if (radioInput === "Received") {
      const receivedOrders = this.props.orders.filter(
        (order) => order.received
      );
      this.props.handleProductOrdersListing(receivedOrders);
    }
  };

  handleSubmitOrderSearch = (event) => {
    event.preventDefault();

    if (this.props.productOrderRadio === "All Order") {
      const allOrderList = this.props.orders.filter((order) =>
        order.created_at.includes(this.props.productOrdersSearchInput)
      );
      this.props.handleProductOrdersListing(allOrderList);
    } else if (this.props.productOrderRadio === "On Order") {
      const onOrderList = this.props.orders.filter(
        (order) =>
          order.on_order &&
          order.created_at.includes(this.props.productOrdersSearchInput)
      );
      this.props.handleProductOrdersListing(onOrderList);
    } else if (this.props.productOrderRadio === "Received") {
      const receivedOrders = this.props.orders.filter(
        (order) =>
          order.received &&
          order.created_at.includes(this.props.productOrdersSearchInput)
      );
      this.props.handleProductOrdersListing(receivedOrders);
    }
  };

  render() {
    return (
      <div className="product-order-section">
        {/* <Link to="/items">Go back</Link> */}
        <Link to="/items" style={{ color: "black" }}>
          Go back
        </Link>
        <Grid container spacing={10} style={{ padding: "50px 20px" }}>
          <Grid item md={6} style={{ padding: "50px 125px" }}>
            <img
              style={{
                margin: "auto",
                boxShadow: "10px 10px 5px #ccc",
                borderRadius: "15px",
              }}
              src={
                this.props.allProducts.find(
                  (product) =>
                    product.id === parseInt(this.props.match.params.id, 10)
                ).image_url
              }
              alt=""
              height="300"
              width="400"
            />
          </Grid>
          <Grid item md={6}>
            <Grid item md={12}>
              <form
                onSubmit={this.handleSubmitOrderSearch}
                className="input-center"
              >
                <div onChange={this.handleRadioButton}>
                  <label>
                    <input
                      style={{ height: "16px" }}
                      type="radio"
                      value="All Order"
                      name="All Order"
                      checked={this.props.productOrderRadio === "All Order"}
                      onChange={this.handleRadioButton}
                    />
                    &nbsp;&nbsp;All Order
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      style={{ height: "16px" }}
                      type="radio"
                      value="On Order"
                      name="On Order"
                      checked={this.props.productOrderRadio === "On Order"}
                      onChange={this.handleRadioButton}
                    />
                    &nbsp;&nbsp;On Order
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      style={{ height: "16px" }}
                      type="radio"
                      value="Received"
                      name="Received"
                      checked={this.props.productOrderRadio === "Received"}
                      onChange={this.handleRadioButton}
                    />
                    &nbsp;&nbsp;Received
                  </label>
                  &nbsp;&nbsp;
                </div>

                <label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter By Order Date:{" "}
                  <input
                    type="text"
                    value={this.props.productOrdersSearchInput}
                    onChange={(event) =>
                      this.props.handleProductOrdersSearchInput(
                        event.target.value
                      )
                    }
                    placeholder="YYYY-MM-DD"
                  />
                </label>
                <button style={{ marginLeft: "10px" }} type="submit">
                  Search
                </button>
              </form>
            </Grid>
            <Grid md={12}>
              <ul>
                {this.props.productOrdersListing.map((order) => (
                  <ProductOrder order={order} key={UUID()} />
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
        {/* <form onSubmit={this.handleSubmitOrderSearch}>

  <label><input type="radio" value="All Order" name="All Order" checked={this.props.productOrderRadio === "All Order"} onChange={this.handleRadioButton}/>&nbsp;&nbsp;All Order&nbsp;&nbsp;</label>
  <label><input type="radio" value="On Order" name="On Order" checked={this.props.productOrderRadio === "On Order"} onChange={this.handleRadioButton}/>&nbsp;&nbsp;On Order&nbsp;&nbsp;</label>
  <label><input type="radio" value="Received" name="Received" checked={this.props.productOrderRadio === "Received"} onChange={this.handleRadioButton} />&nbsp;&nbsp;Received</label>

  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter By Order Date:<input type="text" value={this.props.productOrdersSearchInput} onChange={(event)=>this.props.handleProductOrdersSearchInput(event.target.value)} placeholder="YYYY-MM-DD" /></label>
  <input type="submit" value="Search"/>
  </form> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    productOrderRadio: state.productOrderRadio,
    productOrdersSearchInput: state.productOrdersSearchInput,
    productOrdersListing: state.productOrdersListing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleProductOrderRadio: (data) => {
      dispatch({ type: "PRODUCT_ORDER_RADIO_INPUT", payload: data });
    },
    handleProductOrdersSearchInput: (data) => {
      dispatch({ type: "PRODUCT_ORDER_SEARCH_INPUT", payload: data });
    },
    handleProductOrdersListing: (data) => {
      dispatch({ type: "PRODUCT_ORDER_LISTING", payload: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrdersList);
