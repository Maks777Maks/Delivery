import React, { Component } from "react";
import * as getListActions from "./reducer";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import get from "lodash.get";
import * as R from 'ramda'
import TypesOfDishes from "../TypesOfDishes";

class Cart extends Component  {
  state = {
    currentPage: 1,
    activeTypeId: this.props.activeTypeId,
    searchValue: this.props.searchValue,
    cart: [],
    number: this.props.number,
  };

  
  componentDidMount = () => {
    const { currentPage } = this.state;
    const activeTypeId = this.props.activeTypeId;

   // console.log("activeTypeId", activeTypeId)
   // this.props.cartData({ currentPage });
  };

  

  render() {
    let counter = 1;
    console.log('number:' + this.props.number)
    //const { listDishes } = this.props;
    //console.log("all dishes", listDishes)
    
    return (
       
       <div>
         

       <div>
           <ul>
               <li>1</li>
               <li>2</li>
               <li>3</li>
               <li> number: {this.props.number}</li>
           </ul>


       </div>



     
      </div>
     
    );
  }
}

//Dishes.defaultProps = {searchValue:  ''};

const mapStateToProps = (state) => {
 // console.log("mapStateToPropsDishes", state);
  return {
    ListCart: get(state, "dishes.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // cartData: (filter) => {
    //   dispatch(getListActions.cartData(filter));
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);