import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import '../../App.css'
import Grid from '@material-ui/core/Grid';

 class Card extends Component {

  state = {
    front: true
  }

  orderTotal = ()=>{
    const productOrders=this.props.allOrders.filter(order=> order.product_id === this.props.product.id)
    const initialOrder = 0
    return productOrders.reduce(function(acc, cur) {
      // eslint-disable-next-line
      return parseInt(acc) + parseInt(cur.qty)
    }, initialOrder)
  }




onOrder =() => {
  const productOrders=this.props.allOrders.filter(order=> order.product_id === this.props.product.id && order.on_order)
  const initialOrder = 0
  return productOrders.reduce(function(acc, cur) {
    // eslint-disable-next-line
    return parseInt(acc) + parseInt(cur.qty)
  }, initialOrder)
}

  clickToView = (event) => {
    event.preventDefault()

    if(this.props.product.id){
      this.setState({
        front: !this.state.front
      })
    }else {
        window.location.reload(true)
    }
  }

  render() {

    return (
      <Grid item xs={12} md={4} sm={6}>
        <div className="image">
        {
          this.state.front
            ? <img className="card-image" src={this.props.product.image_url} alt=""/>
            : <ul>
                <li>Retail Price: {this.props.product.retail_price}</li>
                <li>Pomo Price: {this.props.product.pomo_price}</li>
                <li>Last Cost: {this.props.product.last_cost}</li>
                <li>Unit:{this.props.product.unit}</li>
                <li>Most Recent Vendor: {this.props.product.most_recent_vendor}</li>
                <li>Total Order: {this.orderTotal()}   <Link to={"/products/"+this.props.product.id+"/orders"}><img src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-2-1/32/Success-Place-Order-Complete-Shopping-Tick-512.png" alt="" height="32" width="42" className="icon-image" /></Link></li>
                <li>On Order: {this.onOrder()}</li>
                <li>Received: {this.props.product.order}</li>
                <li>Inventory on Hand: {this.props.product.inventory}</li>
                <li>Adjustment: {this.props.product.adjustment} <Link to={"/products/"+this.props.product.id+"/adjustments"}><img src="data:image/png;base64,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" alt="" height="32" width="42" className="icon-image" /></Link></li>
                <li>Status: {this.props.product.status}</li>
                <li>Sales: {this.props.product.sales} <Link to={"/products/"+this.props.product.id+"/sales"}><img src="https://image.flaticon.com/icons/svg/950/950576.svg" alt="" height="32" width="42" className="icon-image"/></Link></li>
                <li>Forecast Sales for the next 3 months: {this.props.product.forecast_sales_three_months}</li>
                <li>Need to order for the next 3 months: {this.props.product.need_to_order_for_next_three_months}</li>
                <li>Annualized Sales: {this.props.product.annualized_sales}</li>
                <li>Annualized QTY: {this.props.product.annualized_qty}</li>
                <li>Category: {this.props.product.category}</li>
                <li>Last Edited by: {this.props.product.last_edited_by}</li>
                <li>Barcode: {this.props.product.barcode}</li>
                <button className="card-button"><Link to={"/products/"+this.props.product.id+"/edit"}>Click To Edit</Link></button>
              </ul>
        }
        <div onClick={this.clickToView} className="flip-section" tabIndex="0">
          <div className="visible-content">{this.props.product.item_name}</div>
          <div className="hidden-content">
            <span>&#8618;</span>Click to flip
          </div>
        </div>
      </div>
      </Grid>

    )
  }
}

function mapStateToProps(state) {
  return {
    allOrders:state.allOrders,
    allAdjustments:state.allAdjustments,
    allProductsSales:state.allProductsSales,
  }
}

export default connect(mapStateToProps)(Card);



// render() {

//   return (
//   <div>
//     <Grid className="card-grid" container spacing={5} container direction="row" justify="space-between" alignItems="center" style={{margin:'40px 5px'}}>

//       <Grid className='image-grid' item xs={12} md={5} sm={6}>
//         <img className="image-of-cards" src={this.props.product.image_url} alt=""/>
//       </Grid>
//       <Grid item xs={12} md={7}>
//         <Grid container md={12}  sm={12}> 
//           <Grid item md={5} sm={12}>
//             <ul>
//               <li data-icon="🦄">Retail Price: {this.props.product.retail_price}</li>
//               <li>Pomo Price: {this.props.product.pomo_price}</li>
//               <li>Last Cost: {this.props.product.last_cost}</li>
//               <li>Unit:{this.props.product.unit}</li>
//               <li>Most Recent Vendor: {this.props.product.most_recent_vendor}</li>
//               <li>Total Order: {this.orderTotal()}   <Link to={"/products/"+this.props.product.id+"/orders"}><img className="icon-image" src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-2-1/32/Success-Place-Order-Complete-Shopping-Tick-512.png" alt="" height="32" width="42"  /></Link></li>
//               <li>On Order: {this.onOrder()}</li>
//               <li>Received: {this.props.product.order}</li>
//               <li>Inventory on Hand: {this.props.product.inventory}</li>
//               <li>Adjustment: {this.props.product.adjustment} <Link to={"/products/"+this.props.product.id+"/adjustments"}><img className="icon-image" src="data:image/png;base64,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" alt="" height="32" width="42"  /></Link></li>
//             </ul>
//           </Grid>
//           <Grid item md={5} sm={12}>
//             <ul>
//               <li>Status: {this.props.product.status}</li>
//               <li>Sales: {this.props.product.sales} <Link to={"/products/"+this.props.product.id+"/sales"}><img className="icon-image" src="https://image.flaticon.com/icons/svg/950/950576.svg" alt="" height="32" width="42"/></Link></li>
//               <li>Forecast Sales for the next 3 months: {this.props.product.forecast_sales_three_months}</li>
//               <li>Need to order for the next 3 months: {this.props.product.need_to_order_for_next_three_months}</li>
//               <li>Annualized Sales: {this.props.product.annualized_sales}</li>
//               <li>Annualized QTY: {this.props.product.annualized_qty}</li>
//               <li>Category: {this.props.product.category}</li>
//               <li>Last Edited by: {this.props.product.last_edited_by}</li>
//               <li>Barcode: {this.props.product.barcode}</li>
//             </ul>
//           </Grid>      
//         </Grid>
//         <Grid item xs={12} className="card-button">
//           <button><Link to={"/products/"+this.props.product.id+"/edit"}>Click To Edit</Link></button>
//         </Grid>
//       </Grid> */}
//     </Grid>

//              <div onClick={this.clickToView} className="flip-section" tabIndex="0">
//               <div className="visible content"> {this.props.product.item_name}</div>
//               <div className="hidden content">
//                 <i className="right arrow icon"></i>Click to flip
//             </div>
//     </div>
//     </div>
//   )
// }