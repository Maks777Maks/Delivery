import React, { Component } from "react";
import * as getListActions from "./reducer";
import { addPhoneToBasket } from "./reducer";

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
//import {AddToCart} from '../Cart/reducer'
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
    //name: "Бумеранг вернулся назад",
    cart: [],
    totalPrice: 0
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    const { totCount } = this.props;
    const activeTypeId = this.props.activeTypeId;

    //1. receive data

    //2. dispatch actions to store
    // console.log("activeTypeId", activeTypeId)
    this.props.getAllDishesData({ currentPage });
  };

  AddToCart(item) {
    let newCart = this.state.cart;
    let totalPriceCart = this.state.totalPrice;
    console.log("totalPriceCart was" + totalPriceCart);
    newCart.push(item.name);
    totalPriceCart +=item.price;
    this.props.addToCart(item.name);
    this.props.addPhoneToBasket(newCart);
    this.setState({
      cart: newCart,
      totalPrice: totalPriceCart
    });
    
    this.props.updateData(this.state.cart, this.state.cart.length, totalPriceCart);

  }

  render() {
    //const { totalCount } = this.props

    console.log("in render: totalCount" + this.state.cart.length);
    // console.log("in render + totCount" + this.props.totCount) // ????

    //   console.log('render + tot count' + this.state.cart.length);
    // console.log('render + tot count props' + this.props.totalCount);
    let counter = 1;
    const { listDishes } = this.props;
    const cartN = this.state.cart;
    //console.log("all dishes", listDishes)

    return (
      <div>
        {/* <p> TotalCount: {this.state.cart.length} </p> */}
        {/* <button
          onClick={() => {
            this.props.updateData(this.state.cart);
          }}
        >
          Запустить бумеранг
        </button> */}
        {/* <p> State dishes: {this.props.activeTypeId} </p>
         <p> activeTypeId: {this.state.activeTypeId} </p> */}

        {/* {" "}
          Cart:{" "} */}
        {/* {cartN.map((item) => {
            return <p> {item} </p>;
          })} */}

        {/* <p> Cart count1: {this.props.totalCount} </p>
        <p> Cart count: {this.state.cart.length} </p> */}
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

        {/* <Link to="/client/cart"> Cart </Link> */}
        {/* <div className="animated fadeIn">
          <Row>
            <Col> */}
        {/* <Card>
                <CardHeader>
                  <i className="fa fa-user-circle-o"></i> Блюда
                </CardHeader>

                <CardBody> */}
        <div className="container">
          
          <div className="row">
            {/* <div className="col-md-3"> */}
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

        {/* </CardBody>
              </Card> */}
        {/* </Col>
          </Row>
        </div> */}
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
    //activeTypeId: state.getAllDishesReducer.activeTypeId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //  AddToCart: (filter) => {
    //   dispatch(getListActions.AddToCart(filter))
    //  },
    getAllDishesData: (filter) => {
      dispatch(getListActions.getAllDishesData(filter));
    },
    addToCart: (item) => {
      dispatch(getListActions.addToCart(item));
    },
    addPhoneToBasket: (item) => {
      dispatch(addPhoneToBasket(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
