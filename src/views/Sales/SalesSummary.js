import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "react-easy-chart";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from "@material-ui/core";

const SalesSummary = (props) => {
  const salesTotal = (month) => {
    const monthlySales = props.sales.filter((sale) =>
      sale.created_at.includes(month)
    );
    const initialValue = 0;
    return monthlySales.reduce(function(acc, cur) {
      // eslint-disable-next-line
      return parseFloat(acc) + parseFloat(cur.qty);
    }, initialValue);
  };

  // function allSaleData() {
  const mydata = [
    {
      x: "Jan-20",
      y: salesTotal("2020-01"),
      color: "#f48642",
    },
    {
      x: "Jan-21",
      y: salesTotal("2021-01"),
      color: "#f48642",
    },
    {
      x: "Feb-20",
      y: salesTotal("2020-02"),
      color: "#41f471",
    },
    {
      x: "Feb-21",
      y: salesTotal("2021-02"),
      color: "#41f471",
    },
    {
      x: "Mar-20",
      y: salesTotal("2020-03"),
      color: "#163084",
    },
    {
      x: "Mar-21",
      y: salesTotal("2021-03"),
      color: "#163084",
    },
    {
      x: "Apr-20",
      y: salesTotal("2020-04"),
      color: "#431584",
    },
    {
      x: "Apr-21",
      y: salesTotal("2021-04"),
      color: "#431584",
    },
    {
      x: "May-20",
      y: salesTotal("2020-05"),
      color: "#93384f",
    },
    {
      x: "May-21",
      y: salesTotal("2021-05"),
      color: "#93384f",
    },
    {
      x: "Jun-20",
      y: salesTotal("2020-06"),
      color: "#3076a8",
    },
    {
      x: "Jun-21",
      y: salesTotal("2021-06"),
      color: "#3076a8",
    },
    {
      x: "Jul-20",
      y: salesTotal("2020-07"),
      color: "#5b5408",
    },
    {
      x: "Jul-21",
      y: salesTotal("2021-07"),
      color: "#5b5408",
    },
    {
      x: "Aug-20",
      y: salesTotal("2020-08"),
      color: "#3c0144",
    },
    {
      x: "Aug-21",
      y: salesTotal("2021-08"),
      color: "#3c0144",
    },
    {
      x: "Sep-20",
      y: salesTotal("2020-09"),
      color: "#440024",
    },
    {
      x: "Sep-21",
      y: salesTotal("2021-09"),
      color: "#440024",
    },
    {
      x: "Oct-20",
      y: salesTotal("2020-10"),
      color: "#b81cdb",
    },
    {
      x: "Oct-21",
      y: salesTotal("2021-10"),
      color: "#b81cdb",
    },
    {
      x: "Nov-20",
      y: salesTotal("2020-11"),
      color: "#1c88db",
    },
    {
      x: "Nov-21",
      y: salesTotal("2021-11"),
      color: "#1c88db",
    },
    {
      x: "Dec-20",
      y: salesTotal("2020-12"),
      color: "#1ccedb",
    },
    {
      x: "Dec-21",
      y: salesTotal("2021-12"),
      color: "#1ccedb",
    },
  ];

  // return mydata
  // }

  return (
    <Fragment>
      <Link to="/items" style={{ margin: "30px", color: "black" }}>
        Go Back
      </Link>

      <center>
        <h1>Sales Summary By Month (Unit Sales)</h1>
      </center>
      <div className="center-SalesSummary">
        <TableContainer
          component={Paper}
          style={{ width: "60%", margin: "20px auto" }}
        >
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#cc19ff" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Month</TableCell>
                <TableCell style={{ color: "white" }}>2020</TableCell>
                <TableCell style={{ color: "white" }}>2021</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Jan</TableCell>
                <TableCell>{salesTotal("2020-01")}</TableCell>
                <TableCell>{salesTotal("2021-01")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Feb</TableCell>
                <TableCell>{salesTotal("2020-02")}</TableCell>
                <TableCell>{salesTotal("2021-02")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mar</TableCell>
                <TableCell>{salesTotal("2020-03")}</TableCell>
                <TableCell>{salesTotal("2021-03")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Apr</TableCell>
                <TableCell>{salesTotal("2020-04")}</TableCell>
                <TableCell>{salesTotal("2021-04")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>May</TableCell>
                <TableCell>{salesTotal("2020-05")}</TableCell>
                <TableCell>{salesTotal("2021-05")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jun</TableCell>
                <TableCell>{salesTotal("2020-06")}</TableCell>
                <TableCell>{salesTotal("2021-06")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jul</TableCell>
                <TableCell>{salesTotal("2020-07")}</TableCell>
                <TableCell>{salesTotal("2021-07")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aug</TableCell>
                <TableCell>{salesTotal("2020-08")}</TableCell>
                <TableCell>{salesTotal("2021-08")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sep</TableCell>
                <TableCell>{salesTotal("2020-09")}</TableCell>
                <TableCell>{salesTotal("2021-09")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Oct</TableCell>
                <TableCell>{salesTotal("2020-10")}</TableCell>
                <TableCell>{salesTotal("2021-10")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nov</TableCell>
                <TableCell>{salesTotal("2020-11")}</TableCell>
                <TableCell>{salesTotal("2021-11")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dec</TableCell>
                <TableCell>{salesTotal("2020-12")}</TableCell>
                <TableCell>{salesTotal("2021-12")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <center>
        <BarChart
          axisLabels={{ x: "Month 2021 vs 2020", y: "Units Sales" }}
          axes
          grid
          colorBars
          height={500}
          width={1260}
          data={mydata}
        />
      </center>
    </Fragment>
  );
};

export default SalesSummary;
