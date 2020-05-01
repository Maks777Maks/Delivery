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
import hero_2 from "../../../assets/img/hero_2.jpg";
import { connect } from "react-redux";
import get from "lodash.get";
import Dishes from "../Dishes";
import * as R from "ramda";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import stylesTypes from "./styleTypes.css";
import styles from "./../../defaultViews/scss/style.scss";

class TypesOfDishes extends Component {
  state = {
    currentPage: 1,
    activeTypeId: 0,
    searchValue: "",
    cart: [],
    count: 0,
    totalPrice: 0
    // name: "Бумеранг не запущен",
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    const { activeTypeId } = this.state;
    this.props.getAllTypesOfDishesData({ currentPage });
    this.setState({
      activeTypeId: activeTypeId,
    });
  };

  FilterDishes(typeId) {
    //const activeTypeId = this.props.
    console.log(typeId);
    this.setState({
      activeTypeId: typeId,
    });
    return typeId;
  }

  SearchDishes(name) {
    console.log();
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  updateData = (value, number, totalPrice) => {
    this.setState({
      cart: value,
      count: number,
      totalPrice: totalPrice
    });
  };

  render() {
    let counter = 1;
    const { listTypesOfDishes } = this.props;

    const cartN = this.state.cart;
    return (
      <div>
        <div
          className="slider-item"
          style={{
            backgroundImage: "url(" + hero_2 + ")",
            height: "550px",
          }}
        ></div>

        <div>
          {/* <p>State: {this.state.name}</p> */}

          <div className="container">
            <div className="row">
              <div className="col-md-3">
                {/* <p> Types:</p> */}
                {listTypesOfDishes.map((item) => {
                  return (
                    <div key={item.id}>
                      <ul>
                        <li onClick={this.FilterDishes.bind(this, item.id)}>
                          {" "}
                          {item.typeOfDishName}{" "}
                        </li>
                      </ul>
                    </div>
                  );
                })}
                <ul>
                  <li onClick={this.FilterDishes.bind(this, 0)}>All Types</li>
                </ul>
                {/* <p> State types: {this.state.activeTypeId} </p> */}
                <div className="input-group">
                  <form onSubmit={this.handleSubmit}>
                    <input
                    className="inputSearch"
                      type="text"
                      onChange={this.handleChange.bind(this)}
                      placeholder="Search"
                    />
                   
                  </form>
                </div>
                <div>
                  <p> TotalCount: {this.state.count}</p>
                  <p> Total Price: {this.state.totalPrice}</p>
                  <p>
                    {" "}
                    Cart:{" "}
                    {cartN.map((item) => {
                      return <p className="cartItem"> {item} </p>;
                    })}
                  </p>
                </div>
              </div>
              <div className="col-md-9">
                <Dishes
                  activeTypeId={this.state.activeTypeId}
                  searchValue={this.state.searchValue}
                  updateData={this.updateData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToPropsDishes", state);
  return {
    listTypesOfDishes: get(state, "typesOfDishes.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTypesOfDishesData: (filter) => {
      dispatch(getListActions.getAllTypesOfDishesData(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypesOfDishes);
