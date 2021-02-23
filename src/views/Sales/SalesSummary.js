import React,{Fragment} from 'react';
import {Link} from 'react-router-dom'
import {BarChart} from 'react-easy-chart';
import {Table, TableCell, TableBody, TableContainer, TableHead, Paper, TableRow} from "@material-ui/core";

const SalesSummary = (props) => {


  const salesTotal=(month)=>{

    const monthlySales=props.sales.filter(sale=>sale.created_at.includes(month))
    const initialValue = 0
    return monthlySales.reduce(function(acc, cur) {
      // eslint-disable-next-line
      return parseFloat(acc) + parseFloat(cur.qty)
    }, initialValue)
  }

// function allSaleData() {
  const mydata=[{
    x: '2017-Jan',
    y: salesTotal("2017-01"),color: '#f48642'
  },
  {
    x: '2018-Jan',
    y: salesTotal("2018-01"),color: '#f48642'
  },
  {
    x: '2017-Feb',
    y: salesTotal("2017-02"),color: '#41f471'
  },
  {
    x: '2018-Feb',
    y: salesTotal("2018-02"),color: '#41f471'
  },
  {
    x: '2017-Mar',
    y: salesTotal("2017-03"),color: '#163084'
  },
  {
    x: '2018-Mar',
    y: salesTotal("2018-03"),color: '#163084'
  },
  {
    x: '2017-Apr',
    y: salesTotal("2017-04"),color: '#431584'
  },
  {
    x: '2018-Apr',
    y: salesTotal("2018-04"),color: '#431584'
  },
  {
    x: '2017-May',
    y: salesTotal("2017-05"),color: '#93384f'
  },
  {
    x: '2018-May',
    y: salesTotal("2018-05"),color: '#93384f'
  },
  {
    x: '2017-Jun',
    y: salesTotal("2017-06"),color: '#3076a8'
  },
  {
    x: '2018-Jun',
    y: salesTotal("2018-06"),color: '#3076a8'
  },
  {
    x: '2017-Jul',
    y: salesTotal("2017-07"),color: '#5b5408'
  },
  {
    x: '2018-Jul',
    y: salesTotal("2018-07"),color: '#5b5408'
  },
  {
    x: '2017-Aug',
    y: salesTotal("2017-08"),color: '#3c0144'
  },
  {
    x: '2018-Aug',
    y: salesTotal("2018-08"),color: '#3c0144'
  },
  {
    x: '2017-Sep',
    y: salesTotal("2017-09"),color: '#440024'
  },
  {
    x: '2018-Sep',
    y: salesTotal("2018-09"),color: '#440024'
  },
  {
    x: '2017-Oct',
    y: salesTotal("2017-10"),color: '#b81cdb'
  },
  {
    x: '2018-Oct',
    y: salesTotal("2018-10"),color: '#b81cdb'
  },
  {
    x: '2017-Nov',
    y: salesTotal("2017-11"),color: '#1c88db'
  },
  {
    x: '2018-Nov',
    y: salesTotal("2018-11"),color: '#1c88db'
  },
  {
    x: '2017-Dec',
    y: salesTotal("2017-12"),color: '#1ccedb'
  },
  {
    x: '2018-Dec',
    y: salesTotal("2018-12"),color: '#1ccedb'
  }
]

// return mydata
// }



  return(
    <Fragment>
    <Link to="/items" style={{margin:'30px', color:'black'}}>Go Back</Link>

    <center><h1>Sales Summary By Month (Unit Sales)</h1></center>
    <div className="center-SalesSummary">
      <TableContainer component={Paper} style={{width:'60%', margin:'20px auto'}}>
    <Table  aria-label="simple table">
  <TableHead style={{backgroundColor:'#cc19ff'}}>
    <TableRow  >
      <TableCell style={{color:'white'}}>Month</TableCell>
      <TableCell style={{color:'white'}}>2017</TableCell>
      <TableCell style={{color:'white'}}>2018</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Jan</TableCell>
      <TableCell>{salesTotal("2017-01")}</TableCell>
      <TableCell>{salesTotal("2018-01")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Feb</TableCell>
      <TableCell>{salesTotal("2017-02")}</TableCell>
      <TableCell>{salesTotal("2018-02")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Mar</TableCell>
      <TableCell>{salesTotal("2017-03")}</TableCell>
      <TableCell>{salesTotal("2018-03")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Apr</TableCell>
      <TableCell>{salesTotal("2017-04")}</TableCell>
      <TableCell>{salesTotal("2018-04")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>May</TableCell>
      <TableCell>{salesTotal("2017-05")}</TableCell>
      <TableCell>{salesTotal("2018-05")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jun</TableCell>
      <TableCell>{salesTotal("2017-06")}</TableCell>
      <TableCell>{salesTotal("2018-06")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jul</TableCell>
      <TableCell>{salesTotal("2017-07")}</TableCell>
      <TableCell>{salesTotal("2018-07")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Aug</TableCell>
      <TableCell>{salesTotal("2017-08")}</TableCell>
      <TableCell>{salesTotal("2018-08")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Sep</TableCell>
      <TableCell>{salesTotal("2017-09")}</TableCell>
      <TableCell>{salesTotal("2018-09")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Oct</TableCell>
      <TableCell>{salesTotal("2017-10")}</TableCell>
      <TableCell>{salesTotal("2018-10")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Nov</TableCell>
      <TableCell>{salesTotal("2017-11")}</TableCell>
      <TableCell>{salesTotal("2018-11")}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Dec</TableCell>
      <TableCell>{salesTotal("2017-12")}</TableCell>
      <TableCell>{salesTotal("2018-12")}</TableCell>
    </TableRow>
  </TableBody>
</Table>
</TableContainer>
</div>
<center>
  <BarChart axisLabels={{x: 'Month 2018 vs 2017', y: 'Units Sales'}}
    axes
    grid
    colorBars
    height={500}
    width={1260}
    data={mydata}/>
</center>
</Fragment>)
}

export default SalesSummary;