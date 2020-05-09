import React, { Component } from "react";
import * as getListActions from "./reducer";
import hero_2 from "../../../assets/img/hero_2.jpg";
import { connect } from "react-redux";
import get from "lodash.get";
import Dishes from "../Dishes";
import TypesOfCuisines from "../../../components/TypesOfCuisines";
import { Link } from "react-router-dom";
import stylesTypes from "./styleTypes.css";
import styles from "./../../defaultViews/scss/style.scss";
import ClientNavbar from "../../../layouts/clientLayout/clientNavbar";
import ClientFooter from "../../../layouts/clientLayout/clientFooter";
import jwt from "jsonwebtoken";

let user;
if (localStorage.jwtToken) {
  let data = {
    token: localStorage.jwtToken,
    refToken: localStorage.refreshToken,
  };
  user = jwt.decode(data.token);
  console.log(user);
  console.log(user.name);
}

class TypesOfDishes extends Component {
  state = {
    currentPage: 1,
    activeTypeId: 0,
    searchValue: "",
    cart: [],
    count: 0,
    totalPrice: 0,
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
    this.setState({
      activeTypeId: typeId,
    });
    return typeId;
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
      totalPrice: totalPrice,
    });
  };

  render() {
    let counter = 1;
    const { listTypesOfDishes } = this.props;

    const cartN = this.state.cart;
    return (
      <div>
        <ClientNavbar />
        <div
          className="slider-item"
          style={{
            backgroundImage: "url(" + hero_2 + ")",
            height: "550px",
          }}
        ></div>

        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
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
                  <p>Hello {user ? user.name : "Guest"}</p>
                  <div>
                    {" "}
                    Dishes:{" "}
                    {cartN.map((item) => {
                      return (
                        <div className="cartItem" key={item.id}>
                          {" "}
                          {item}{" "}
                        </div>
                      );
                    })}
                  <p> Total Price: {this.state.totalPrice} UAH</p>
                    <Link className="nav-link" to="/cart">
                      Go to cart
                    </Link>
                  </div>
                </div>

                <div>
                  <TypesOfCuisines />
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
        <ClientFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
