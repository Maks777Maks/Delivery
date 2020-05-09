import React, { Component } from "react";
import * as getListActions from "./reducer";
import { chooseCuisineType } from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";


class TypesOfCuisines extends Component {
  state = {
    currentPage: 1,
    cuisineTypeId: 0,
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    const { cuisineTypeId } = this.state;
    this.props.getAllTypesOfCuisinesData({ currentPage });

    this.setState({
      cuisineTypeId: cuisineTypeId,
    });
  };

  FilterCuisines(typeId) {
    this.setState({
      cuisineTypeId: typeId,
    });
    this.props.chooseCuisineType(typeId);

  }

  render() {
       const { listTypesOfCuisines } = this.props;

    return (
      <div>
        {listTypesOfCuisines.map((item) => {
          return (
            <div key={item.id}>
              <ul>
                <li
                  onClick={this.FilterCuisines.bind(this, item.id)}
                                  >
                  {" "}
                  {item.typeOfCuisineName}{" "}
                </li>
              </ul>
            </div>
          );
        })}
        <li onClick={this.FilterCuisines.bind(this, 0)}>All Types</li>
      </div>
    );
  
  }
}

const mapStateToProps = (state) => {
  return {
    listTypesOfCuisines: get(state, "typesOfCuisines.list.data"),
    cuisineChoosenTypeId: state.typesOfCuisines.list.cuisineTypeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTypesOfCuisinesData: (filter) => {
      dispatch(getListActions.getAllTypesOfCuisinesData(filter));
    },
    chooseCuisineType: (id) => {
      dispatch(chooseCuisineType(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypesOfCuisines);
