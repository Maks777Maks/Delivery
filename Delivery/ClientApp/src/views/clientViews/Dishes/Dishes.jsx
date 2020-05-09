import React, { Component } from "react";
import * as getListActions from "./reducer";
import { addDishToBasket } from "./reducer";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {} from "reactstrap";
import { connect } from "react-redux";
import get from "lodash.get";
import * as R from "ramda";

class Dishes extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      cart: [],
      totalPrice: 0,
    };
  }

  state = {
    currentPage: 1,
    activeTypeId: 0,
    searchValue: 0,
    totalCount: 0,
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    this.props.getAllDishesData({ currentPage });
  };

  handleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      showNameItem: item.name,
      showImageItem: item.image,
      showPriceItem: item.price,
      showIngredientsItem: item.ingredients,
      showWeightItem: item.weight,
      showVegeterianItem: item.isVegetarian,
      showAvailableItem: item.isAvailable,
      showTypeCuisine: item.typeOfCuisineId,
      showTypeCuisineName: item.typeOfCuisineName,
    });
  }

  AddToCart(item) {
    let newCart = this.state.cart;
    let totalPriceCart = this.state.totalPrice;

    newCart.push(item.name);
    totalPriceCart += item.price;
    this.props.addDishToBasket(newCart);
    this.setState({
      cart: newCart,
      totalPrice: totalPriceCart,
    });

    this.props.updateData(
      this.state.cart,
      this.state.cart.length,
      totalPriceCart
    );
  }

  renderDish(item) {
    return (
      <div className="col-md-4" key={item.id}>
        <Card>
          <CardImg top width="100%" src={item.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardSubtitle style={{ color: "red" }}>
              Price: {item.price} UAH
            </CardSubtitle>
            <CardSubtitle>{item.description}</CardSubtitle>
            <CardText>
              <strong>Ingredients: </strong> {item.ingredients}
            </CardText>
            <Button color="warning" onClick={this.AddToCart.bind(this, item)}>
              Add To Cart
            </Button>
            <i
              className="fas fa-shopping-cart"
              onClick={this.AddToCart.bind(this, item)}
            ></i>
            <Button color="info" onClick={this.handleModal.bind(this, item)}>
              Show info
            </Button>

            <Modal
              size="lg"
              isOpen={this.state.showModal}
              aria-labelledby="example-custom-modal-styling-title"
            >
              <ModalHeader>
                <strong>{this.state.showNameItem}</strong>
              </ModalHeader>
              <ModalBody>
                <img
                  src={this.state.showImageItem}
                  style={{ maxHeight: "300px" }}
                />
                <br />
                Price: {this.state.showPriceItem} UAH <br />
                Ingredients: {this.state.showIngredientsItem} <br />
                Weight: {this.state.showWeightItem} g <br />
                Vegeterian: {this.state.showVegeterianItem ? "yes" : "no"}{" "}
                <br />
                Available: {this.state.showAvailableItem ? "yes" : "no"} <br />
                Type of Cuisine: {this.state.showTypeCuisineName}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.setState({
                      showModal: false,
                    });
                  }}
                >
                  Close
                </Button>
                <Button
                  color="warning"
                  onClick={this.AddToCart.bind(this, {
                    name: this.state.showNameItem,
                    price: this.state.showPriceItem,
                  })}
                >
                  Add To Cart
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </div>
    );
  }

  render() {
    const { listDishes } = this.props;

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
              if (this.props.cuisineChoosenTypeId !== 0) {
                return item.typeOfCuisineId === this.props.cuisineChoosenTypeId
                  ? this.renderDish(item)
                  : null;
              } 
              else {
                if (this.props.searchValue !== "") {
                  let hasName = R.contains(
                    R.toLower(this.props.searchValue),
                    R.toLower(item.name)
                  );

                  return hasName ? this.renderDish(item) : null;
                } else {
                  if (!this.props.activeTypeId) {
                    return this.renderDish(item);
                  } else {
                    return item.typeOfDishId === this.props.activeTypeId
                      ? this.renderDish(item)
                      : null;
                  }
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
  // console.log("mapStateToPropsDishes, totcount", state);
  return {
    listDishes: get(state, "dishes.list.data"),
    newResultCart: state.dishes.list.cart,
    cuisineChoosenTypeId: state.typesOfCuisines.list.cuisineTypeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDishesData: (filter) => {
      dispatch(getListActions.getAllDishesData(filter));
    },
    addDishToBasket: (item) => {
      dispatch(addDishToBasket(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
