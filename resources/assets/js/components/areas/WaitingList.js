import React, { Component } from "react";
import { List, Button, Popconfirm, Icon } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  subscribeToReserveCancelled,
  subscribeToAddReserve,
} from "../../api";
class WaitingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reserves: []
    };

    subscribeToReserveCancelled((err, data) => {
      if (this._mounted) {
        console.log('data');
        const { reserves } = this.state;
        const newReserves = reserves.filter(value => {
          if (value.id == data) {
            return false;
          }
          return true;
        });
        this.setState({ reserves: newReserves });
      }
    });

    subscribeToAddReserve((err, data) => {
      if (this._mounted) {
        if (data) {
          if (data.area == 3) {
            const { reserves } = this.state;
            const newReserves = [data, ...reserves];
            this.setState({ reserves: newReserves });
          }
        }
      }
    });

  }

  componentDidMount() {
    this._mounted = true;
    this.getData(data => {
      this.setState({
        reserves: data,
      });
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getData(callback) {
    const data = {
      token: localStorage.getItem("token")
    };
    axios
      .post(`/api/reserves/area/3`, data)
      .then(response => {
        const data = response.data.data;
        const newDate = data.map(value => {
          let date = new Date(value.time);
          let time = date.toLocaleString("ru", {
            hour: "numeric",
            minute: "numeric"
          });
          return {
            ...value,
            time
          };
        });
        callback(newDate);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleReserveCancel(id) {
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

  render() {
    const { reserves } = this.state;
    return (
      <div>
        <h2>Waiting List</h2>
        <List
          bordered
          dataSource={reserves}
          renderItem={item => (
            <List.Item
              actions={[
                <Link to={`/reserve/edit/${item.id}`}>
                  <Button shape="circle" icon="edit" />
                </Link>,
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.handleReserveCancel.bind(this, item.id)}
                >
                  <Icon type="delete" />
                </Popconfirm>
              ]}
            >
              {item.name} {item.time}
              <br />
              Count of people: {item.count}
              <br />
              Phone: {item.phone}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default WaitingList;
