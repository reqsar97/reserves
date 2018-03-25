import React, { Component } from 'react';
import { Row, Divider } from 'antd';
import axios from 'axios';
//Custom components
import SingleTable from './SingleTable';
//socket
import {
  subscribeToAddReserve,
  subscribeToReserveArrived,
  subscribeToReserveCancelled,
  subscribeToOpenTable,
  subscribeToUpdateReserve
} from '../../api';

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
          let isNewReserve = true;
          const newReserves = reserves.map(value => {
            if (value.id == data.id) {
              isNewReserve = false;
              return data;
            }
            return value;
          });
          if(isNewReserve) {
            newReserves.push(data);
          }
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
          let newTables = tables.map((table => {
            if(table.id == data.id){
              return data;
            }
            return table;
          }));
          this.setState({ tables: newTables });
        }
      }
    });
  }

  componentDidMount() {
    this._mounted = true;
    const data = {
      token: localStorage.getItem('token')
    };
    axios.get(`/api/tables/${this.areaId}`)
      .then(response => {
        const data = response.data;
        this.setState({tables: data});
      })
      .catch(err => {
        console.log(err);
      });
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
        reservedTables['table_' + tableNumber] = reserves[i];
      }
    }
    let title = 'V';
    if(this.areaId == 1){
      title = 'N';
    }else if (this.areaId == 2) {
      title = 'D';
    }
    return (
      <div>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          <h2>{this.areaName} area</h2>
          <Divider />
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          {tables.map(table => {
            return (
              <SingleTable
                area={this.areaId}
                key={table.number}
                table={table.number}
                forkTitle={table.fork_title ? table.fork_title : ''}
                isOpen={table.is_open == 1}
                isBusy={table.is_busy == 1}
                className="singleTable"
                title={`${title} - ${table.number}`}
                reserve={reservedTables[`table_${table.number}`]}
              />
            );
          })}
        </Row>      
      </div>
    );
  }
}

export default BaseArea;
