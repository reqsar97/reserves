import React, { Component } from "react";
import { Col, Card, Icon, Button, Popconfirm, Tag, Popover } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

class SingleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverShow: false,
    };
    //bind functions
    this.handleReserveArrived = this.handleReserveArrived.bind(this);
    this.handleReserveCancel = this.handleReserveCancel.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this); 
  }

  handleVisibleChange(visible) {
    this.setState({popoverShow: visible});
  }

  handleReserveArrived() {
    const { reserve } = this.props;
    if (reserve) {
      const id = reserve.id;
      const data = {
        token: localStorage.getItem("token")
      };
      axios.post(`/api/reserves/arrived/${id}`, data);
    }
  }

  handleReserveCancel() {
    const { reserve } = this.props;
    if (reserve) {
      const id = reserve.id;
      const config = {
        token: localStorage.getItem("token")
      };
      axios
        .post(`/api/reserves/delete/${id}/`, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { reserve, area } = this.props;

    let time = "";
    let reservedColor = "singleTable";
    let id = "";
    let iconReservArrived = (
      <Icon onClick={this.handleReserveArrived} type="check" />
    );
    let infoIcon = <Icon type="info-circle-o" />;
    let forcIcon = <Icon type="fork" />;
    let edit = (
      <Link to={`/reserves/${area}/${this.props.table}`}>
        <Button shape="circle" icon="user-add" />
      </Link>
    );
    let deleteIcon = <Icon type="smile-o" />;
    if (reserve) {
      deleteIcon = (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={this.handleReserveCancel}
        >
          <Icon type="delete" />
        </Popconfirm>
      );
      let date = new Date(reserve.time);
      time = date.toLocaleString("ru", {
        hour: "numeric",
        minute: "numeric"
      });
      let today = new Date();
      id = reserve.id;
      edit = (
        <Link to={`/reserve/edit/${id}`}>
          <Button shape="circle" icon="edit" />
        </Link>
      );
      if (reserve.is_arrived == 1) {
        reservedColor = "arrivedTable";
        iconReservArrived = (
          <Icon type="close" onClick={this.handleReserveArrived} />
        );
      } else {
        reservedColor = "reservedTable";
      }
      if (today > date && reserve.is_arrived != 1) {
        reservedColor = "reserveLate";
      }
      //Icon info about reserve
      infoIcon = (<Popover
        title='Reserve info'
        content={reserve.info}
        visible={this.state.popoverShow}
        onVisibleChange={this.handleVisibleChange}
      ><Button shape="circle" icon="info-circle-o"/></Popover>);
    }

    if (this.props.isOpen == 1) {
      reservedColor = "tableOpen";
    }

    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className={reservedColor} style={{marginBottom: 10}}>
          <Card
            title={this.props.title}
            bordered={true}
            hoverable={true}
            actions={[iconReservArrived, edit, deleteIcon, infoIcon, forcIcon]}
          >
            {reserve && (
              <div>
                <Tag color="#15B371">{reserve.name}</Tag>
                <Tag color="#15B371">{time}</Tag>
                <Tag color="#15B371">{reserve.count}</Tag>
              </div>
            )}
            {!reserve && (
              <div>
                <span>Name:</span>
                <span>Time:</span>
                <span>People:</span>
              </div>
            )}
          </Card>
        </div>
      </Col>
    );
  }
}

export default SingleTable;
