import React, { Component } from 'react';
import get from 'lodash.get';
import { getListActions } from './reducer';
import { connect } from 'react-redux';
class GraphPercentageDishes extends Component {
    state = {  }
    render() { 
        return ( 
            
         );
    }
}
 

const mapStateToProps= state=>{
    return{
       listSoldDishes: get(state, "soldDishes.list.data")
    };
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getAllSoldDishesData:filter=>{
            dispatch(getListActions.getAllSoldDishesData(filter))
        }
    }
}

export defaul connect(mapStateToProps, mapDispatchToProps) (GraphPercentageDishes);