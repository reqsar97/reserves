import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Button, Popconfirm, Tag, Popover, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverShow: false,
      visibleFrokPopover: false,
      forkTitle: props.forkTitle,
    };
    //bind functions
    this.handleReserveArrived = this.handleReserveArrived.bind(this);
    this.handleReserveCancel = this.handleReserveCancel.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this); 
    this.hadnleAddBusy = this.hadnleAddBusy.bind(this);
    this.hadnleVisibleFrokPopover = this.hadnleVisibleFrokPopover.bind(this);
    this.hadnleHideVisibleFrokPopover = this.hadnleHideVisibleFrokPopover.bind(this);
    this.handleOnChangeForkTitle = this.handleOnChangeForkTitle.bind(this);
    this.handleClickSaveFork = this.handleClickSaveFork.bind(this);
    this.handleClickCanselFork = this.handleClickCanselFork.bind(this);
  }

  handleVisibleChange(visible) {
    this.setState({popoverShow: visible});
  }

  handleClickSaveFork(){
    const { forkTitle } = this.state;
    const { area, table } = this.props;
    axios.put(`/api/tables/fork/${area}/${table}`, {
      title: forkTitle
    }).then(() => {
      this.setState({visibleFrokPopover: false});
    }).catch(err => {
      console.log(err);
    });
  }

  handleClickCanselFork(){
    const { area, table } = this.props;
    axios.put(`/api/tables/fork/${area}/${table}`, {
      title: ''
    }).then(() => {
      this.setState({visibleFrokPopover: false});
    }).catch(err => {
      console.log(err);
    });
  }

  handleOnChangeForkTitle(e){
    this.setState({forkTitle: e.target.value});
  }

  hadnleVisibleFrokPopover(visible){
    this.setState({visibleFrokPopover: visible});
  }

  hadnleHideVisibleFrokPopover(){
    this.setState({visibleFrokPopover: false});
  }

  hadnleAddBusy(){
    const { area, table } = this.props;
    axios.put(`/api/tables/busy/${area}/${table}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleReserveArrived() {
    const { reserve } = this.props;
    if (reserve) {
      axios.post(`/api/reserves/arrived/${reserve.id}`);
    }
  }

  handleReserveCancel() {
    const { reserve } = this.props;
    if (reserve) {
      axios
        .post(`/api/reserves/delete/${reserve.id}/`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { reserve, area, isBusy, isOpen, forkTitle } = this.props;
    const actions = [];
    let time = '';
    let reservedColor = 'singleTable';
    let iconReservArrived = null;
    let infoIcon = null;
    const busyIconTitle = isBusy ? 'This table free？' : 'This table busy？';
    let busyIcon = (<Popconfirm
      title={busyIconTitle}
      okText="Yes"
      cancelText="No"
      onConfirm={this.hadnleAddBusy}
    >
      {isBusy ? 
        <Button shape="circle" icon="unlock"/> 
        : <Button shape="circle" icon="lock"/> }
    </Popconfirm>);
    let edit = (
      <Link to={`/reserves/${area}/${this.props.table}`}>
        <Button shape="circle" icon="user-add" />
      </Link>
    );
    let deleteIcon = null;
    if (reserve) {
      deleteIcon = (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={this.handleReserveCancel}
        >
          <Button shape="circle" icon="delete"/>
        </Popconfirm>
      );
      let date = new Date(reserve.time);
      time = date.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric'
      });
      let today = new Date();
      edit = (
        <Link to={`/reserve/edit/${reserve.id}`}>
          <Button shape="circle" icon="edit" />
        </Link>
      );
      
      if (reserve.is_arrived == 1) {
        reservedColor = 'arrivedTable';
        iconReservArrived = (
          <Button shape="circle" icon="close" onClick={this.handleReserveArrived}/>
        );
      } else {
        reservedColor = 'reservedTable';
        iconReservArrived = (
          <Button shape="circle" icon="check-circle-o" onClick={this.handleReserveArrived}/>
        );
      }
      if (today > date && reserve.is_arrived != 1) {
        reservedColor = 'reserveLate';
      }
      //Icon info about reserve
      infoIcon = (<Popover
        title='Reserve info'
        content={reserve.info}
        visible={this.state.popoverShow}
        onVisibleChange={this.handleVisibleChange}
      ><Button shape="circle" icon="info-circle-o"/></Popover>);
    }

    let forkIcon = (
      <Popover
        content={
          <div>
            <Input onChange={this.handleOnChangeForkTitle} value={this.state.forkTitle}/>
            <Button type='primary' onClick={this.handleClickSaveFork}>Save</Button>
            <Button type='danger' onClick={this.handleClickCanselFork}>Delete</Button>
          </div>
        }
        title="Title"
        trigger="click"
        visible={this.state.visibleFrokPopover}
        onVisibleChange={this.hadnleVisibleFrokPopover}
      >

        <Button shape="circle" icon="fork"/>
      </Popover>
    );
    
    if(isBusy){
      reservedColor = 'busyTable';
    }

    if(forkTitle){
      reservedColor = 'forkTable';
    }

    if (isOpen) {
      reservedColor = 'tableOpen';
    }


    if(iconReservArrived){
      actions.push(iconReservArrived);
      actions.push(edit);
    }else{
      actions.push(edit);
      actions.push(busyIcon);
      actions.push(forkIcon);
    }
    if(deleteIcon){
      actions.push(deleteIcon);
    }
    if(infoIcon){
      actions.push(infoIcon);
    }
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className={reservedColor} style={{marginBottom: 10}}>
          <Card
            title={this.props.title + ' ' + this.props.forkTitle}
            bordered={true}
            hoverable={true}
            actions={actions}
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

SingleTable.propTypes = {
  title: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  table: PropTypes.number.isRequired,
  isBusy: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  reserve: PropTypes.object,
  forkTitle: PropTypes.string,
};

export default SingleTable;
