import React from 'react';
import {Link} from 'react-router-dom'
import {BarChart} from 'react-easy-chart';
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';

const SalesDashboard =(props) => {

  const allSaleData = () =>{
      const mydata=[...{},{
        x: '2017-Jan',
        y: monthlySalesTotal("2017-01"),color: '#f48642'
      },
      {
        x: '2018-Jan',
        y: monthlySalesTotal("2018-01"),color: '#f48642'
      },
      {
        x: '2017-Feb',
        y: monthlySalesTotal("2017-02"),color: '#41f471'
      },
      {
        x: '2018-Feb',
        y: monthlySalesTotal("2018-02"),color: '#41f471'
      },
      {
        x: '2017-Mar',
        y: monthlySalesTotal("2017-03"),color: '#163084'
      },
      {
        x: '2018-Mar',
        y: monthlySalesTotal("2018-03"),color: '#163084'
      },
      {
        x: '2017-Apr',
        y: monthlySalesTotal("2017-04"),color: '#431584'
      },
      {
        x: '2018-Apr',
        y: monthlySalesTotal("2018-04"),color: '#431584'
      },
      {
        x: '2017-May',
        y: monthlySalesTotal("2017-05"),color: '#93384f'
      },
      {
        x: '2018-May',
        y: monthlySalesTotal("2018-05"),color: '#93384f'
      },
      {
        x: '2017-Jun',
        y: monthlySalesTotal("2017-06"),color: '#3076a8'
      },
      {
        x: '2018-Jun',
        y: monthlySalesTotal("2018-06"),color: '#3076a8'
      },
      {
        x: '2017-Jul',
        y: monthlySalesTotal("2017-07"),color: '#5b5408'
      },
      {
        x: '2018-Jul',
        y: monthlySalesTotal("2018-07"),color: '#5b5408'
      },
      {
        x: '2017-Aug',
        y: monthlySalesTotal("2017-08"),color: '#3c0144'
      },
      {
        x: '2018-Aug',
        y: monthlySalesTotal("2018-08"),color: '#3c0144'
      },
      {
        x: '2017-Sep',
        y: monthlySalesTotal("2017-09"),color: '#440024'
      },
      {
        x: '2018-Sep',
        y: monthlySalesTotal("2018-09"),color: '#440024'
      },
      {
        x: '2017-Oct',
        y: monthlySalesTotal("2017-10"),color: '#b81cdb'
      },
      {
        x: '2018-Oct',
        y: monthlySalesTotal("2018-10"),color: '#b81cdb'
      },
      {
        x: '2017-Nov',
        y: monthlySalesTotal("2017-11"),color: '#1c88db'
      },
      {
        x: '2018-Nov',
        y: monthlySalesTotal("2018-11"),color: '#1c88db'
      },
      {
        x: '2017-Dec',
        y: monthlySalesTotal("2017-12"),color: '#1ccedb'
      },
      {
        x: '2018-Dec',
        y: monthlySalesTotal("2018-12"),color: '#1ccedb'
      }
      ]
    return mydata
    }


      const lastYearSale =()=>{
      const mydata=[...{},{
        key: '2017-Jan',
        value: monthlySalesTotal("2017-01")
      },
      {
        key: '2017-Feb',
        value: monthlySalesTotal("2017-02")
      },
      {
        key: '2017-Mar',
        value: monthlySalesTotal("2017-03")
      },
      {
        key: '2017-Apr',
        value: monthlySalesTotal("2017-04")
      },
      {
        key: '2017-May',
        value: monthlySalesTotal("2017-05")
      },
      {
        key: '2017-Jun',
        value: monthlySalesTotal("2017-06")
      },
      {
        key: '2017-Jul',
        value: monthlySalesTotal("2017-07")
      },
      {
        key: '2017-Aug',
        value: monthlySalesTotal("2017-08")
      },
      {
        key: '2017-Sep',
        value: monthlySalesTotal("2017-09")
      },
      {
        key: '2017-Oct',
        value: monthlySalesTotal("2017-10")
      },
      {
        key: '2017-Nov',
        value: monthlySalesTotal("2017-11")
      },
      {
        key: '2017-Dec',
        value: monthlySalesTotal("2017-12")
      }
    ]
    return mydata
    }


    const thisYearSale =()=>{
      const mydata=[...{},{
        key: '2018-Jan',
        value: monthlySalesTotal("2018-01")
      },
      {
        key: '2018-Feb',
        value: monthlySalesTotal("2018-02")
      },
      {
        key: '2018-Mar',
        value: monthlySalesTotal("2018-03")
      },
      {
        key: '2018-Apr',
        value: monthlySalesTotal("2018-04")
      },
      {
        key: '2018-May',
        value: monthlySalesTotal("2018-05")
      },
      {
        key: '2018-Jun',
        value: monthlySalesTotal("2018-06")
      },
      {
        key: '2018-Jul',
        value: monthlySalesTotal("2018-07")
      },
      {
        key: '2018-Aug',
        value: monthlySalesTotal("2018-08")
      },
      {
        key: '2018-Sep',
        value: monthlySalesTotal("2018-09")
      },
      {
        key: '2018-Oct',
        value: monthlySalesTotal("2018-10")
      },
      {
        key: '2018-Nov',
        value: monthlySalesTotal("2018-11")
      },
      {
        key: '2018-Dec',
        value: monthlySalesTotal("2018-12")
      }
    ]
    return mydata
    }


    const monthlySalesTotal=(month)=>{

      const monthlySales=props.allProductsSales.filter(sale=>sale.created_at.includes(month))
      const initialValue = 0
      return monthlySales.reduce(function(acc, cur) {
        // eslint-disable-next-line
        return parseFloat(acc) + parseFloat(cur.total)
      }, initialValue)
    }



  return(<div>
    <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
    <br></br>
    <br></br>
        <center><h1>This Year vs Last Year Sales Summary by Month (Unit Sales)</h1></center>
        <center><BarChart axisLabels={{x: 'Month 2018 vs 2017', y: 'Dollar Sales'}}
        axes
        grid
        colorBars
        height={750}
        width={1650}
        data={allSaleData()}/></center>


    <br></br>
    <br></br>
        <center><h1>Last Year Sales Summary by Month (Dollar Sales)</h1></center>
        <center><PieChart
    labels
    data={lastYearSale()}
    styles={{
      '.chart_text': {
        fontSize: '1em',
        fill: '#fff'
      }
    }}
  /></center>
  <center><h1>This Year Sales Summary by Month (Dollar Sales)</h1></center>
  <center><PieChart
labels
data={thisYearSale()}
styles={{
'.chart_text': {
  fontSize: '1em',
  fill: '#fff'
}
}}
/></center>
</div>
  )
}

function mapStateToProps(state) {
  return {allProductsSales: state.allProductsSales,
  }
}

export default connect(mapStateToProps)(SalesDashboard)
