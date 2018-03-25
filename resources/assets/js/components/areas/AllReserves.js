import React, { Component } from 'react';
import { DatePicker, Row, Col, Divider, List, Button, Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

//cuustom components
import SingleTable from './SingleTable';
import ReserveList from './ReserveList';
const dateFormat = 'YYYY/MM/DD';

class AllReserves extends Component {

  constructor(props){
    super(props);
    this.state = {
      reserves : [],
      date: moment()
    };
    this.handleCancele = this.handleCancele.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.hadnleGetAllReserves = this.hadnleGetAllReserves.bind(this);
  }

  componentDidMount(){
    const now = moment().startOf('day');
    axios.get(`/api/reserves?date=${now}`)
      .then((response) => {
        const { data:reserves } = response.data;
        console.log(reserves);
        this.setState({reserves})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  hadnleGetAllReserves(){
    axios.get(`/api/reserves`)
      .then((response) => {
        const { data:reserves } = response.data;
        console.log(reserves);
        this.setState({reserves})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleCancele(id) {
    const { reserves } = this.state;
    const config = {
      token: localStorage.getItem("token")
    };
    axios
      .post(`/api/reserves/delete/${id}/`, config)
      .then(response => {
        console.log(response);
        const newReserves = reserves.filter(v => {
          if(v.id == id){
            return false;
          }
          return true;
        })
        this.setState({reserves: newReserves});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeDate(date){
    const now = date.startOf('day');
    this.setState({date: now}, () => {
      axios.get(`/api/reserves?date=${now}`)
      .then((response) => {
        const { data:reserves } = response.data;
        console.log(reserves);
        this.setState({reserves})
      })
      .catch((err) => {
        console.log(err);
      })
    })
  }

  render() {
    const { reserves, date } = this.state;
    return (
      <div>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          <h2>AllReserves</h2>
          <Divider />
          <DatePicker
            onChange={this.handleChangeDate}
            // defaultValue={date}
            value={date}
            format={dateFormat}
            />
          <Button onClick={this.hadnleGetAllReserves}>
            Get all
          </Button>
          <Divider />
        </Row>
        <Row gutter={12} className="tableRow" type="flex" justify="center">
          <List
            size="large"
            itemLayout='vertical'
            dataSource={reserves}
            renderItem={item=> {
              return (
                <ReserveList
                  cancele={this.handleCancele}
                  item={item}
                />
              )
            }}
          />
        </Row>
      </div>
    );
  }
}

export default AllReserves;
