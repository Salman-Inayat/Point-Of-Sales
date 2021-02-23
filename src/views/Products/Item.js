import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Card from "./Card"
import UUID from "uuid"
import '../../App.css'
import Grid from '@material-ui/core/Grid';

class Item extends Component {

  createNewItem = () => {
    this.props.history.push("/createnewitems")
  }

  handleSearchItem = (event)=>{
    const searchInput = event.target.value
    this.props.handleSearchItemInput(searchInput)
    const items = this.props.allProducts.filter(product => product.category.toLowerCase().includes(searchInput.toLowerCase()) || product.item_name.toLowerCase().includes(searchInput.toLowerCase()) )
    this.props.searchItem(items)
  }

  render() {

    return (
      <div className='items-section'>
        <div className="card-search">
          <div className="search" id="search-Item">
            <div className="ui icon input">
            <input type="text" value={this.props.searchItemInput} onChange={this.handleSearchItem} style={{width:'260px'}} placeholder="Search items by name or category name" size="80"/>
            <i className="search icon"></i>
            </div>
          </div>
          <button onClick={this.createNewItem} className="create-item-button button">Create New Item</button>
        </div>

      <Grid container spacing={5}>
        {this.props.searchItemsList.length === 0 && this.props.searchItemInput.length<1 ? this.props.allProducts.map(product => <Card product={product} key={UUID()}/>) :
            this.props.searchItemsList.map(product => <Card product={product} key={UUID()}/>)
        }
      </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {allProducts: state.allProducts,
  searchItemInput:state.searchItemInput,
  searchItemsList:state.searchItemsList,
}
}

function mapDispatchToProps(dispatch) {
  return{
    handleSearchItemInput: (data) => {
      dispatch({type: "ITEM_SEARCH_INPUT", payload: data})
    },
    searchItem: (data) => {
      dispatch({type: "ITEM_SEARCH_OUTCOME", payload: data})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);