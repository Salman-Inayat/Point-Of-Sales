/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";
import { Dashboard, Dashboard as DashboardView } from "./views";
import Reports from "./views/Reports/reports";
import POS from "./views/POS/pos";
import Item from "./views/Products/Item";
import Adjustment from "./views/Adjustment/adjustment";
import Order from "./views/Order/order";
import ProfilePage from "./views/Profilepage/profilepage";
import ProductOrdersList from "../src/views/Products/ProductOrderList";
import SalesSummary from "../src/views/Sales/SalesSummary";
import SalesDashboard from "../src/views/Sales/SalesDashboard";
import EditProduct from "../src/views/Products/EditProduct";
import ShowAdjustments from "../src/views/Adjustment/ShowAdjustments";
import SeeAllOrders from "../src/views/Order/SeeAllOrders";
import CreateNewItem from "../src/views/Products/CreateNewItem";
import AllTasks from "../src/views/Profilepage/AllTasks";
import Login from "../src/views/Login/login";
import CreateTask from "../src/views/Profilepage/Create_Task";
import CreateUser from "../src/views/Profilepage/Create_user";
import HomeComponent from "../src/landing_pages/home_page/index";
import AboutUs from "../src/landing_pages/about_page/index";
import ContactUs from "../src/landing_pages/contactus_page/index";
import Video from "../src/views/Video/js/video";

class Routes extends Component {
  getAllSalesData = (data) => {
    this.props.fetchAllSalesData(data);
  };
  getAllProducts = (data) => {
    this.props.fetchAllProducts(data);
  };

  getAllProductsSales = (data) => {
    this.props.fetchAllProductsSales(data);
  };

  getAllAdjustment = (data) => {
    this.props.fetchAllAdjustments(data);
  };

  getAllOrder = (data) => {
    this.props.fetchAllOrders(data);
  };
  getCurrentUser = (user, toDoList) => {
    user.todolists = toDoList;
    const userinfo = user;
    this.props.handleLogin(userinfo);
  };
  componentDidMount() {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then((data) => this.getAllProducts(data));
    fetch(
      "http://localhost:3000/sales_transcations"
    )
      .then((r) => r.json())
      .then((data) => this.getAllSalesData(data));
    fetch("http://localhost:3000/product_sales")
      .then((r) => r.json())
      .then((data) => this.getAllProductsSales(data));
    fetch("http://localhost:3000/adjustments")
      .then((r) => r.json())
      .then((data) => this.getAllAdjustment(data));
    fetch("http://localhost:3000/orders")
    .then((r) => r.json())
    .then((data) => this.getAllOrder(data));
    let token = localStorage.getItem("token");
    if (token) {
      fetch("https://limitless-fjord-48119.herokuapp.com/api/v1/current_user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((r) => r.json())
        .then((data) => this.getCurrentUser(data.user_details, data.todolists))
        .catch((err) => {
          localStorage.removeItem("token");
          this.props.history.push("/");
        });
    }
  }

  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/contactus" component={ContactUs} />
        <Route
          exact
          path="/login"
          render={(routerProps) => <Login {...routerProps} />}
        />
        {!localStorage.getItem("token") &&
        this.props.history.location.pathname !== "/login" ? (
          <Redirect to="/" />
        ) : this.props.currentUser ? (
          this.props.currentUser.role.toLowerCase().includes("cashier") ? (
            <Switch>
               <RouteWithLayout
                path="/dashboard"
                component={SalesDashboard}
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={(routerProps) => <ProfilePage {...routerProps} />}
                path="/profile"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={POS}
                path="/pos"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Item}
                path="/items"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                path="/createtask"
                component={CreateTask}
                exact
                layout={MainLayout}
              />
              <Route path="/alltasks" component={AllTasks} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/createtask" component={CreateTask} />
              <Route path="/alltasks" component={AllTasks} />
              <RouteWithLayout
                component={(routerProps) => <ProfilePage {...routerProps} />}
                path="/profile"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={POS}
                path="/pos"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Item}
                path="/items"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Video}
                path="/video"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                path="/createtask"
                component={CreateTask}
                exact
                layout={MainLayout}
              />
              {/* <Route
            component={Login}
            path="/login"
            exact
          /> */}
              {/* <RouteWithLayout
                component={DashboardView}
                path="/dashboard"
                exact
                layout={MainLayout}
              /> */}
             
              <RouteWithLayout
                path="/createnewitems"
                component={CreateNewItem}
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Reports}
                path="/reports"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Adjustment}
                path="/adjustment"
                exact
                layout={MainLayout}
              />
              <RouteWithLayout
                path="/allorders"
                component={SeeAllOrders}
                layout={MainLayout}
              />
              <RouteWithLayout
                component={Order}
                path="/order"
                exact
                layout={MainLayout}
              />
               {/* <RouteWithLayout
                component={SalesDashboard}
                path="/dashboard"
                exact
                layout={MainLayout}
              /> */}
              <RouteWithLayout
                path="/createuser"
                component={CreateUser}
                layout={MainLayout}
              />
              <Route
                path="/products/:id/orders"
                render={(routerProps) => {
                  let id = routerProps.match.params.id;
                  // eslint-disable-next-line
                  let ordersList = this.props.allOrders.filter(
                    (order) => order.product_id === parseInt(id)
                  );
                  return (
                    <ProductOrdersList {...routerProps} orders={ordersList} />
                  );
                }}
              />

              <Route
                path="/products/:id/sales"
                render={(routerProps) => {
                  let id = routerProps.match.params.id;
                  // eslint-disable-next-line
                  let sales = this.props.allProductsSales.filter(
                    (sale) => sale.product_id === parseInt(id)
                  );
                  console.log(sales);
                  return <SalesSummary {...routerProps} sales={sales} />;
                }}
              />
              <Route
                path="/products/:id/edit"
                render={(routerProps) => {
                  let id = routerProps.match.params.id;
                  // eslint-disable-next-line
                  let product = this.props.allProducts.find(
                    (product) => product.id === parseInt(id)
                  );
                  return <EditProduct {...routerProps} product={product} />;
                }}
              />
              <Route
                path="/products/:id/adjustments"
                render={(routerProps) => {
                  let id = routerProps.match.params.id;
                  let adjustments = this.props.allAdjustments.filter(
                    (adjustment) => adjustment.product_id === parseInt(id)
                  );
                  return (
                    <ShowAdjustments
                      {...routerProps}
                      adjustments={adjustments}
                    />
                  );
                }}
              />
            </Switch>
          )
        ) : null}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    allOrders: state.allOrders,
    allProducts: state.allProducts,
    allAdjustments: state.allAdjustments,
    allProductsSales: state.allProductsSales,
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllProducts: (data) => {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
    },
    fetchAllSalesData: (data) => {
      dispatch({ type: "GET_ALL_SALES_DATA", payload: data });
    },
    fetchAllProductsSales: (data) => {
      dispatch({ type: "GET_ALL_PRODUCTS_SALES", payload: data });
    },
    fetchAllAdjustments: (data) => {
      dispatch({ type: "GET_ALL_ADJUSTMENTS", payload: data });
    },
    fetchAllOrders: (data) => {
      dispatch({ type: "GET_ALL_ORDERS", payload: data });
    },
    handleLogin: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
