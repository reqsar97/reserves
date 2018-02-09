import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import axios from "axios";
//Custom components
import SingleTable from "./SingleTable";
//socket
import {
  subscribeToAddReserve,
  subscribeToReserveArrived,
  subscribeToReserveCancelled,
  subscribeToOpenTable,
  subscribeToUpdateReserve
} from "../../api";

class BaseArea extends Component {
  constructor(props, areaId, areaName) {
    super(props);
    this.state = {
      reserves: [],
      tables: []
    };
    this._mounted = true;
    this.areaId = areaId;
    this.areaName = areaName;
    subscribeToAddReserve((err, data) => {
      if (this._mounted) {
        if (data) {
          if (data.area == this.areaId) {
            const { reserves } = this.state;
            const newReserves = [data, ...reserves];
            this.setState({ reserves: newReserves });
          }
        }
      }
    });

    subscribeToUpdateReserve((err, data) => {
      if (this._mounted) {
        if (data.area == this.areaId) {
          const { reserves } = this.state;
          const newReserves = reserves.map(value => {
            if (value.id == data.id) {
              return data;
            }
            return value;
          });
          this.setState({ reserves: newReserves });
        }
      }
    });

    subscribeToReserveArrived((err, data) => {
      if (this._mounted) {
        const { reserves } = this.state;
        const newReserves = reserves.map(value => {
          if (value.id == data.id) {
            return data;
          }
          return value;
        });
        this.setState({ reserves: newReserves });
      }
    });
    subscribeToReserveCancelled((err, data) => {
      if (this._mounted) {
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

    subscribeToOpenTable((err, data) => {
      if (this._mounted) {
        if (data.area == this.areaId) {
          const { tables } = this.state;
          let newTables = [...tables];
          newTables[`${data.number}`] = data.is_open;

          this.setState({ tables: newTables });
        }
      }
    });
  }

  componentDidMount() {
    this._mounted = true;
    const data = {
      token: localStorage.getItem("token")
    };
    axios
      .post(`/api/reserves/area/${this.areaId}`, data)
      .then(response => {
        const data = response.data.data;
        this.setState({ reserves: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { reserves, tables } = this.state;
    let reservedTables = [];
    if (reserves.length) {
      for (var i = 0; i < reserves.length; i++) {
        let tableNumber = reserves[i].table;
        reservedTables["table_" + tableNumber] = reserves[i];
      }
    }
    return (
      <div>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          <h2>{this.areaName} area</h2>
          <Divider />
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {[1, 2, 3, 4, 5, 6].map(n => {
            return (
              <SingleTable
                area={this.areaId}
                key={n}
                table={n}
                isOpen={tables[`${n}`]}
                className="singleTable"
                title={`Table - ${n}`}
                reserve={reservedTables[`table_${n}`]}
              />
            );
          })}
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {[7, 8, 9, 10, 11, 12].map(n => {
            return (
              <SingleTable
                area={this.areaId}
                key={n}
                table={n}
                isOpen={tables[`${n}`]}
                className="singleTable"
                title={`Table - ${n}`}
                reserve={reservedTables[`table_${n}`]}
              />
            );
          })}
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {[13, 14, 15, 16, 17, 18].map(n => {
            return (
              <SingleTable
                area={this.areaId}
                key={n}
                table={n}
                isOpen={tables[`${n}`]}
                className="singleTable"
                title={`Table - ${n}`}
                reserve={reservedTables[`table_${n}`]}
              />
            );
          })}
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {[19, 20, 21, 22, 23, 24].map(n => {
            return (
              <SingleTable
                area={this.areaId}
                key={n}
                table={n}
                isOpen={tables[`${n}`]}
                className="singleTable"
                title={`Table - ${n}`}
                reserve={reservedTables[`table_${n}`]}
              />
            );
          })}
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {[25, 26, 27, 28, 29, 30].map(n => {
            return (
              <SingleTable
                area={this.areaId}
                key={n}
                table={n}
                isOpen={tables[`${n}`]}
                className="singleTable"
                title={`Table - ${n}`}
                reserve={reservedTables[`table_${n}`]}
              />
            );
          })}
        </Row>
      </div>
    );
  }
}

export default BaseArea;
