import React, { Component } from 'react';
import * as getListActions from './reducer';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge,
    Modal, ModalBody, ModalFooter, ModalHeader, Label, Input } from 'reactstrap';
    import { connect } from 'react-redux';
    import get from "lodash.get";
class UsersStats extends Component {
    state = { 
        currentPage: 1
     }

    componentDidMount = ()=> {
        const { currentPage } = this.state;
        this.props.getAllUsersData({currentPage});
    }

    render() { 
        let counter = 1;
        const { listUsers } =this.props;
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-user-circle-o"></i> Брокери
                  </CardHeader>
                  <CardBody>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Прiзвище</th>
                          <th>Iм'я</th>
                          <th>Телефон</th>
                          <th>Вік</th>
                          <th>Пошта</th>
                          <th> Статус</th>
                        </tr>
                      </thead>
                      <tbody className="align-items-center">
                        {listUsers.map(item => {
                          return (
                            <tr key={item.id}>
                              <th scope="row">{counter++}</th>
                              <td>{item.lastName}</td>
                              <td>{item.name}</td>
                              <td>{item.phone}</td>
                              <td>{item.age}</td>
                              <td>{item.email}</td>
                              <td className="align-items-center" style={{ width: "70px" }}>
                                {item.status ? (
                                  <Badge
                                    onClick={this.changeUnBlock}
                                    color="danger"
                                    className="btn-pill mr-1"
                                    style={{ cursor: "pointer" }}
                                    size="lg"
                                    data-id={item.id}
                                    data-description={item.description}
                                  >
                                    Заблокований
                                  </Badge>
                                ) : (
                                  <Badge
                                    onClick={this.changeBlock}
                                    color="success"
                                    className="btn-pill"
                                    style={{ cursor: "pointer" }}
                                    size="lg"
                                    data-id={item.id}
                                  >
                                    Активний
                                  </Badge>
                                )}
                              </td>
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
      listUsers: get(state, "usersStats.list.data")
};
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersData: filter =>{
        dispatch(getListActions.getAllUsersData(filter))
    }
    }
}
export default connect(mapStateToProps, mapDispatchToProps ) (UsersStats);