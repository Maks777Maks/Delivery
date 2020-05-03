import React, { Component } from "react";
import * as getListActions from "./reducer";
import { cartData } from "./reducer";
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
import * as R from "ramda";
import TypesOfDishes from "../TypesOfDishes";
import styles from "./style.css"

class Cart extends Component {
  state = {
    currentPage: 1,
    activeTypeId: this.props.activeTypeId,
    searchValue: this.props.searchValue,
    cart: [],
  };

  componentDidMount = () => {
    console.log("componentDidMount");
    const { currentPage } = this.state;
    const activeTypeId = this.props.activeTypeId;
    const { cart } = this.state;

    // console.log("activeTypeId", activeTypeId)
    // this.props.cartData({ currentPage });
  };

  render() {
    let counter = 1;
    console.log("number:" + this.props.number);
    //const { listDishes } = this.props;
    //console.log("all dishes", listDishes)
    console.log("Cart from state:" + this.state.cart);
    let listCart = this.props.newResultCart;
    

    return (
      <div>
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            {/* <li> number: {this.props.number}</li> */}
            <li>State Cart: {listCart}</li>
          </ul>
        </div>

        {/* TABLE*/}

        <div className="cart-box-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-main table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Images</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listCart.map(item => {
                        return (
                          <tr>
                          <td className="thumbnail-img">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/img-pro-01.jpg"
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="name-pr">
  
                            <a href="#">{item}</a>
                          </td>
                          <td className="price-pr">
                            <p>$ 80.0</p>
                          </td>
                          <td className="quantity-box">
                            <input
                              type="number"
                              size="4"
                              value="1"
                              min="0"
                              step="1"
                              className="c-input-text qty text"
                            />{" "}
                          </td>
                          <td className="total-pr">
                            <p>$ 80.0</p>
                          </td>
                          <td className="remove-pr">
                            <a href="#">
                              <i className="fas fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        )
                      } )}
                   
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row my-5">
              <div className="col-lg-6 col-sm-6">
                <div className="coupon-box">
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control"
                      placeholder="Enter your coupon code"
                      aria-label="Coupon code"
                      type="text"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-theme" type="button">
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="update-box">
                  <input className="Update Cart" type="submit" />
                </div>
              </div>
            </div>

            <div className="row my-5">
              <div className="col-lg-8 col-sm-12"></div>
              <div className="col-lg-4 col-sm-12">
                <div className="order-box">
                  <h3>Order summary</h3>
                  <div className="d-flex">
                    <h4>Sub Total</h4>
                    <div className="ml-auto font-weight-bold"> $ 130 </div>
                  </div>
                  <div className="d-flex">
                    <h4>Discount</h4>
                    <div className="ml-auto font-weight-bold"> $ 40 </div>
                  </div>
                  <hr className="my-1" />
                  <div className="d-flex">
                    <h4>Coupon Discount</h4>
                    <div className="ml-auto font-weight-bold"> $ 10 </div>
                  </div>
                  <div className="d-flex">
                    <h4>Tax</h4>
                    <div className="ml-auto font-weight-bold"> $ 2 </div>
                  </div>
                  <div className="d-flex">
                    <h4>Shipping Cost</h4>
                    <div className="ml-auto font-weight-bold"> Free </div>
                  </div>
                  <hr />
                  <div className="d-flex gr-total">
                    <h5>Grand Total</h5>
                    <div className="ml-auto h5"> $ 388 </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="col-12 d-flex shopping-box">
                <a href="checkout.html" className="ml-auto btn hvr-hover">
                  Checkout
                </a>{" "}
              </div>
            </div>
          </div>
        </div>

        {/* END TABLE*/}
      </div>
    );
  }
}

//Dishes.defaultProps = {searchValue:  ''};

const mapStateToProps = (state) => {
  // console.log("mapStateToPropsDishes", state);
  return {
    ListCart: get(state, "dishes.list.data"),
    newResultCart: state.dishes.list.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   cartData: (filter) => {
    //     dispatch(getListActions.cartData(filter));
    //   },
  };
};
export default connect(mapStateToProps, null)(Cart);
//export default Cart;
