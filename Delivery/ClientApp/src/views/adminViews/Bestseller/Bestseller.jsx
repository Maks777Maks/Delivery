import React, { Component } from 'react';
import * as getListActions from './reducer';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge} from 'reactstrap';
import { connect } from 'react-redux';
import get from "lodash.get";

class Dishes extends Component{
    state={
        currentPage: 1
    }

componentDidMount = ()=> {
    const { currentPage } = this.state;
    this.props.getDishesData({currentPage});
}

render() { 
    let counter = 1;
    const { listDishes } =this.props;
    console.log("ListDishes:",listDishes);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-user-circle-o"></i> Страви
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Назва</th>
                      <th>Опис</th>
                      <th>Ціна</th>
                      <th>Вага</th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center">
                    {listDishes.map(item => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">{counter++}</th>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>{item.weight}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
}
}

const mapStateToProps = state => {
console.log("mapStateToProps", state);
return {
    listDishes: get(state, "bestseller.list.data")
};
}

const mapDispatchToProps = (dispatch) => {
return {
getDishesData: filter =>{
    dispatch(getListActions.getDishesData(filter))
}
}
}
export default connect(mapStateToProps, mapDispatchToProps ) (Dishes);