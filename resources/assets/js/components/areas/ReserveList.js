import React, { Component } from 'react';
import { DatePicker, Row, Col, Divider, List, Button, Icon, Tag, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
class ReserveList extends Component {

  constructor(props){
    super(props);
    this.handleReserveCancel = this.handleReserveCancel.bind(this);
  }

  handleReserveCancel() {
    const { item } = this.props;
    this.props.cancele(item.id)
  }

  render() {
    const { item } = this.props;
    let title = '';
    if(item.area == 0){
      title= `V ${item.table}`
    }else if(item.area == 1){
      title= `N ${item.table}`
    }else if(item.area == 2){
      title= `D ${item.table}`
    }else{
      title= `W ${item.table}`
    }
    const edit = (
      <Link to={`/reserve/edit/${item.id}`}>
        <Button shape="circle" icon="edit" />
      </Link>
    );
    const deleteIcon = (
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={this.handleReserveCancel}
      >
        <Button shape="circle" icon="delete" />
      </Popconfirm>
    );
    return (
      <List.Item actions={[edit, deleteIcon]}>
        <List.Item.Meta
          title={title}
        />
        <div>
          <Tag color="#15B371">{`Name: ${item.name}`}</Tag>
          <Tag color="#15B371">{`Count: ${item.count}`}</Tag>
          <Tag color="#15B371">{`Phone: ${item.phone}`}</Tag>
          <Tag color="#15B371">{`Info: ${item.info}`}</Tag>
          <Tag color="#15B371">{`Time: ${item.time}`}</Tag>
        </div>
      </List.Item>
    )
  }
}

export default ReserveList;
