import React, { Component } from "react";
import * as getListActions from "./reducer";
import { addDishToBasket } from "./reducer";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
import {} from "reactstrap";
import { connect } from "react-redux";
import get from "lodash.get";
import * as R from "ramda";
import TypesOfDishes from "../TypesOfDishes";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { getTotalCount } from "./selectors";
import stylesDishes from "./styles.css"
import styles from "./../../defaultViews/scss/style.scss"

class Dishes extends Component {
  state = {
    currentPage: 1,
    activeTypeId: this.props.activeTypeId,
    searchValue: this.props.searchValue,
    totalCount: this.props.totalCount,
    totalCount: this.props.getTotalCount,
 
    cart: [],
    totalPrice: 0
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    const { totCount } = this.props;
    const activeTypeId = this.props.activeTypeId;


    this.props.getAllDishesData({ currentPage });
  };

  AddToCart(item) {
    let newCart = this.state.cart;
    let totalPriceCart = this.state.totalPrice;
    console.log("totalPriceCart was" + totalPriceCart);
    console.log("Cart" + this.state.cart)
    
    newCart.push(item.name);
    totalPriceCart +=item.price;
    this.props.addDishToBasket(newCart);
    this.setState({
      cart: newCart,
      totalPrice: totalPriceCart
    });
    
    this.props.updateData(this.state.cart, this.state.cart.length, totalPriceCart);
    // console.log("NewCArt State: " + this.state.cart);
    // console.log("newCart From props:" + this.props.newResultCart)

  }

  render() {
  

    console.log("in render: totalCount" + this.state.cart.length);
   
    let counter = 1;
    const { listDishes } = this.props;
    const cartN = this.state.cart;
 

    return (
      <div>
       
        <div className="clearfix mb-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center heading-wrap">
              <h2>Our Menu</h2>
              <span className="back-text-dark">Menu</span>
            </div>
          </div>
        </div>
      </div>

       
        <div className="container">
          
          <div className="row">
   
            {listDishes.map((item) => {
              if (this.props.searchValue !== "") {
                let hasName = R.contains(
                  R.toLower(this.props.searchValue),
                  R.toLower(item.name)
                );

                return hasName ? (
                  <div className="col-md-4">
                    <Card>
                      <CardImg
                        top
                        width="100%"
                        src={item.image}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <CardSubtitle style={{color: "red"}}>Price: {item.price} UAH </CardSubtitle>
                        <CardSubtitle>{item.description}</CardSubtitle>
                        <CardText><strong>Ingredients: </strong>{item.ingredients}</CardText>
                                                <Button className="addToCart"
                        onClick={this.AddToCart.bind(this, item)}>
                          Add To Cart
                        </Button>
                      </CardBody>
                    </Card>
                  </div>
                ) : null;
              } else {
                if (!this.props.activeTypeId) {
                  return (
                    <div className="col-md-4">
                      <Card>
                        <CardImg
                          top
                          width="100%"
                          src={item.image}
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardTitle>{item.name}</CardTitle>
                          <CardSubtitle style={{color: "red", marginBottom: "10px"}}>Price: {item.price} UAH</CardSubtitle>
                          <CardSubtitle>{item.description}</CardSubtitle>
                          <CardText><strong>Ingredients: </strong> {item.ingredients}</CardText>
                          <Button
                          style={{  backgroundColor: "red"}}
                          className="addToCart"
                           onClick={this.AddToCart.bind(this, item)}>
                            Add To Cart
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  );
                } else {
                  return item.typeOfDishId === this.props.activeTypeId ? (
                    <div className="col-md-4">
                      <Card>
                        <CardImg
                          top
                          width="100%"
                          src={item.image}
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardTitle>{item.name}</CardTitle>
                          <CardSubtitle style={{color: "red"}}>Price: {item.price} UAH</CardSubtitle>
                          <CardSubtitle>{item.description}</CardSubtitle>
                          <CardText><strong>Ingredients: </strong> {item.ingredients}</CardText>
                          <Button 
                           className="addToCart"
                          onClick={this.AddToCart.bind(this, item)}>
                            Add To Cart
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  ) : null;
                }
              }
            })}
          </div>
        </div>


      </div>
    );
  }
}

Dishes.defaultProps = { searchValue: "" };

const mapStateToProps = (state) => {
  console.log("mapStateToPropsDishes, totcount", state);
  return {
    listDishes: get(state, "dishes.list.data"),
    totalCount: getTotalCount(state),
    totCount: state.totCount,
    newResultCart: state.dishes.list.cart,
    //newResultCart: get(state, "dishes.list.cart"),
    //activeTypeId: state.getAllDishesReducer.activeTypeId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDishesData: (filter) => {
      dispatch(getListActions.getAllDishesData(filter));
    },
    // addToCart: (item) => {
    //   dispatch(getListActions.addToCart(item));
    // },
    addDishToBasket: (item) => {
      dispatch(addDishToBasket(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
