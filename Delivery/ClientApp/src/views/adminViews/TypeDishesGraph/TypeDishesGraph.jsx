import React, { Component } from 'react';
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { Pie, Line } from "react-chartjs-2";
import get from "lodash.get";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Link,
  Grid,
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { red } from '@material-ui/core/colors';
class TypeDishesGraph extends Component {
  state = {}
  componentDidMount = () => {
    console.log("componentDidMount");
    this.props.getAllTypeDishesData();
  }
  render() {
    const { data } = this.props;
    let nameData = [];
    let countData = [];
    console.log("render", data)
    if (data != undefined) {
      data.forEach(element => {
        nameData.push(element.name);
        countData.push(element.count);
        console.log(nameData)
      });
    }
   

    const pie = {
      labels: nameData,
      datasets: [
        {
          data: countData,
          backgroundColor: ["#FF6384", "#FFCE56", "#FF0000"],
          hoverBackgroundColor: ["#FF6384", "#FFCE56", "#FF0000"],
        },
      ],
    };

    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
      },
      maintainAspectRatio: false,
    };
    console.log(data);
    return (
      <Grid className="mt-4" container>
        <Grid item lg={6} md={6} xl={6} xs={12}>

          <Card className="mt-3 mb-3 mr-3">
            <form>
              <CardHeader
                avatar={<FaceIcon></FaceIcon>}
                title="Відсоток типів страв"
              />

              <CardContent>
                {data == null ? (
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <div className="d-flex flex-column">
                      <Skeleton
                        animation="wave"
                        height={15}
                        width="100%"
                        style={{ marginBottom: 2 }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                ) : (
                    <div>
                      {/* <Typography
                        className="text-color"
                        variant="h4"
                        gutterBottom
                      >
                        {100 - data.countOfDays}%
                        </Typography>
                      <Typography variant="h6" gutterBottom>
                        Відвідано
                        </Typography> */}
                      <div className="chart-wrapper">
                        <Pie data={pie} />
                      </div>
                    </div>
                  )}
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("mapStateToProps",state)
  return {
    data: get(state, "typeDishesGraph.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTypeDishesData: () => {
      dispatch(getListActions.getAllTypeDishesData());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (TypeDishesGraph);