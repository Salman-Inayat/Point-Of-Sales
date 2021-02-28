import React from "react";
import { Link } from "react-router-dom";
import { BarChart } from "react-easy-chart";
import { connect } from "react-redux";
import { PieChart } from "react-easy-chart";

const SalesDashboard = (props) => {
  const monthlySalesTotal = (month) => {
    const monthlySales = props.allProductsSales.filter((sale) =>
      sale.created_at.includes(month)
    );
    const initialValue = 0;
    return monthlySales.reduce(function(acc, cur) {
      // eslint-disable-next-line
      return parseFloat(acc) + parseFloat(cur.total);
    }, initialValue);
  };

  // const allSaleData = () => {
    const mydata_allSaleData = [
      // ...{},
      {
        x: "Jan-20",
        y: monthlySalesTotal("2020-01"),
        color: "#f48642",
      },
      {
        x: "Jan-21",
        y: monthlySalesTotal("2021-01"),
        color: "#f48642",
      },
      {
        x: "Feb-20",
        y: monthlySalesTotal("2020-02"),
        color: "#41f471",
      },
      {
        x: "Feb-21",
        y: monthlySalesTotal("2021-02"),
        color: "#41f471",
      },
      {
        x: "Mar-20",
        y: monthlySalesTotal("2020-03"),
        color: "#163084",
      },
      {
        x: "Mar-21",
        y: monthlySalesTotal("2021-03"),
        color: "#163084",
      },
      {
        x: "Apr-20",
        y: monthlySalesTotal("2020-04"),
        color: "#431584",
      },
      {
        x: "Apr-21",
        y: monthlySalesTotal("2021-04"),
        color: "#431584",
      },
      {
        x: "May-20",
        y: monthlySalesTotal("2020-05"),
        color: "#93384f",
      },
      {
        x: "May-21",
        y: monthlySalesTotal("2021-05"),
        color: "#93384f",
      },
      {
        x: "Jun-20",
        y: monthlySalesTotal("2020-06"),
        color: "#3076a8",
      },
      {
        x: "Jun-21",
        y: monthlySalesTotal("2021-06"),
        color: "#3076a8",
      },
      {
        x: "Jul-20",
        y: monthlySalesTotal("2020-07"),
        color: "#5b5408",
      },
      {
        x: "Jul-21",
        y: monthlySalesTotal("2021-07"),
        color: "#5b5408",
      },
      {
        x: "Aug-20",
        y: monthlySalesTotal("2020-08"),
        color: "#3c0144",
      },
      {
        x: "Aug-21",
        y: monthlySalesTotal("2021-08"),
        color: "#3c0144",
      },
      {
        x: "Sep-20",
        y: monthlySalesTotal("2020-09"),
        color: "#440024",
      },
      {
        x: "Sep-21",
        y: monthlySalesTotal("2021-09"),
        color: "#440024",
      },
      {
        x: "Oct-20",
        y: monthlySalesTotal("2020-10"),
        color: "#b81cdb",
      },
      {
        x: "Oct-21",
        y: monthlySalesTotal("2021-10"),
        color: "#b81cdb",
      },
      {
        x: "Nov-20",
        y: monthlySalesTotal("2020-11"),
        color: "#1c88db",
      },
      {
        x: "Nov-21",
        y: monthlySalesTotal("2021-11"),
        color: "#1c88db",
      },
      {
        x: "Dec-20",
        y: monthlySalesTotal("2020-12"),
        color: "#1ccedb",
      },
      {
        x: "Dec-21",
        y: monthlySalesTotal("2021-12"),
        color: "#1ccedb",
      },
    ];
  //   return mydata;
  // };

  // const lastYearSale = () => {
    const mydata_lastYearSale = [
      // ...{},
      {
        key: "Jan-20",
        value: monthlySalesTotal("2020-01"),
      },
      {
        key: "Feb-20",
        value: monthlySalesTotal("2020-02"),
      },
      {
        key: "Mar-20",
        value: monthlySalesTotal("2020-03"),
      },
      {
        key: "Apr-20",
        value: monthlySalesTotal("2020-04"),
      },
      {
        key: "May-20",
        value: monthlySalesTotal("2020-05"),
      },
      {
        key: "Jun-20",
        value: monthlySalesTotal("2020-06"),
      },
      {
        key: "Jul-20",
        value: monthlySalesTotal("2020-07"),
      },
      {
        key: "Aug-20",
        value: monthlySalesTotal("2020-08"),
      },
      {
        key: "Sep-20",
        value: monthlySalesTotal("2020-09"),
      },
      {
        key: "Oct-20",
        value: monthlySalesTotal("2020-10"),
      },
      {
        key: "Nov-20",
        value: monthlySalesTotal("2020-11"),
      },
      {
        key: "Dec-20",
        value: monthlySalesTotal("2020-12"),
      },
    ];
  //   // return mydata;
  // };

  // const thisYearSale = () => {
    const mydata_thisYearSale = [
      // ...{},
      {
        key: "Jan-21",
        value: monthlySalesTotal("2021-01"),
      },
      {
        key: "Feb-21",
        value: monthlySalesTotal("2021-02"),
      },
      {
        key: "Mar-21",
        value: monthlySalesTotal("2021-03"),
      },
      {
        key: "Apr-21",
        value: monthlySalesTotal("2021-04"),
      },
      {
        key: "May-21",
        value: monthlySalesTotal("2021-05"),
      },
      {
        key: "Jun-21",
        value: monthlySalesTotal("2021-06"),
      },
      {
        key: "Jul-21",
        value: monthlySalesTotal("2021-07"),
      },
      {
        key: "Aug-21",
        value: monthlySalesTotal("2021-08"),
      },
      {
        key: "Sep-21",
        value: monthlySalesTotal("2021-09"),
      },
      {
        key: "Oct-21",
        value: monthlySalesTotal("2021-10"),
      },
      {
        key: "Nov-21",
        value: monthlySalesTotal("2021-11"),
      },
      {
        key: "Dec-21",
        value: monthlySalesTotal("2021-12"),
      },
    ];
  //   return mydata;
  // };



  return (
    <div>
      <Link to="/home">
        <i className="home icon big ui left floated teal"></i>
      </Link>
      <br></br>
      <br></br>
      <center>
        <h1>This Year vs Last Year Sales Summary by Month (Unit Sales)</h1>
      </center>
      <center>
        <BarChart
          axisLabels={{ x: "Month 2021 vs 2020", y: "Dollar Sales" }}
          axes
          grid
          colorBars
          height={500}
          width={1000}
          data={mydata_allSaleData}
        />
      </center>

      <br></br>
      <br></br>
      <center>
        <h1>Last Year Sales Summary by Month (Dollar Sales)</h1>
      </center>
      <center>
        <PieChart
          labels
          data={mydata_lastYearSale}
          styles={{
            ".chart_text": {
              fontSize: "1em",
              fill: "#fff",
            },
          }}
        />
      </center>
      <center>
        <h1>This Year Sales Summary by Month (Dollar Sales)</h1>
      </center>
      <center>
        <PieChart
          labels
          data={mydata_thisYearSale}
          styles={{
            ".chart_text": {
              fontSize: "1em",
              fill: "#fff",
            },
          }}
        />
      </center>
    </div>
  );
};

function mapStateToProps(state) {
  return { allProductsSales: state.allProductsSales };
}

export default connect(mapStateToProps)(SalesDashboard);
