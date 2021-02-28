import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import UUID from "uuid"
import Download from "./Download"
import DisplayProductSale from "./DisplayProductSale"


class Reports extends Component {

  filterData = (event) => {
    event.preventDefault()
    if(new Date(this.props.dateRangeFrom)<= new Date(this.props.dateRangeTo)){
          const reportData = this.props.allProductsSales.filter(sale=>new Date(sale.created_at.slice(0,10))<=new Date(this.props.dateRangeTo) && new Date(sale.created_at.slice(0,10))>=new Date(this.props.dateRangeFrom))
          this.props.filterSalesData(reportData)

    }else {
      const reportData = []
      this.props.filterSalesData(reportData)
    }
  }

  render() {
    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <div className="reports-section ">
        <Link style={{color:'black'}} to="/dashboard">See Dashboard</Link>
        <form onSubmit={this.filterData} className="reports-form">
          <label>From&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeFrom} onChange={(event) => this.props.changeDataRangeFrom(event)} required/></label>
          <label>&nbsp;&nbsp;To&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeTo} onChange={(event) => this.props.changeDataRangeTo(event)} required/></label>
          <button type="submit" value="Get Sales Data" style={{marginLeft:'20px'}}>Get Sales Data</button>
        </form>
        <Download />
        </div>
        
      {
        this.props.reportData.length === 0
          ? null
          :
          <div className="center-SalesSummary">
          <table style={{padding:'20px 40px', backgroundColor:'#d0cece', borderRadius:'10px', margin:'0px auto'}}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Selling Price</th>
                  <th>Pomo Price</th>
                  <th>Total</th>
                  <th>Saving</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.reportData.map(product => <DisplayProductSale productSale={product} key={UUID()}/>)
                }
              </tbody>
            </table>
            </div>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {allProductsSales: state.allProductsSales, dateRangeFrom: state.dateRangeFrom, dateRangeTo: state.dateRangeTo, reportData: state.reportData}
}

function mapDispatchToProps(dispatch) {
  return {
    changeDataRangeFrom: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_FROM", payload: event.target.value})
    },
    changeDataRangeTo: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_TO", payload: event.target.value})
    },
    filterSalesData: (data) => {
      dispatch({type: "FILTER_SALES_DATA", payload: data})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)

