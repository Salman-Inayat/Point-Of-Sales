import React from "react";
import ReactExport from "react-data-export";
import {connect} from "react-redux"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {

  // <th>Product Name</th>
  // <th>Quantity</th>
  // <th>Selling Price</th>
  // <th>Pomo Price</th>
  // <th>Total</th>
  // <th>Saving</th>
  // <th>Transcation Date</th>

      handleReportData =()=>{
        let dataArray=[]
        this.props.reportData.forEach(sale=>{
            let data = {name:sale.product_name,
              qty:sale.qty,
              sellingPrice:sale.retail_price,
              pomoPrice:sale.pomo_price,
              total:sale.total,
              saving:sale.total_saving,
              date:sale.created_at.slice(0,10),
            }
             dataArray.push(data)
})
return dataArray
}

    render() {
        return (
            <ExcelFile element={<button style={{marginTop:'20px'}} >Export Data to Excel</button>}>
                <ExcelSheet data={this.handleReportData()} name="SalesData">
                    <ExcelColumn label="Product Name" value="name"/>
                    <ExcelColumn label="Quantity" value="qty"/>
                    <ExcelColumn label="Selling Price" value="sellingPrice"/>
                    <ExcelColumn label="Pomo Price" value="pomoPrice"/>
                    <ExcelColumn label="Total" value="total"/>
                    <ExcelColumn label="Saving" value="saving"/>
                    <ExcelColumn label="Transaction Date" value="date"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

function mapStateToProps(state) {
  return{
    reportData: state.reportData
  }
}

export default connect(mapStateToProps)(Download)
