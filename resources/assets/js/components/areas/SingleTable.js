import React, { Component } from "react";
import { Col, Card, Icon, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

class SingleTable extends Component {
    constructor(props) {
        super(props);

        //bind functions
        this.handleReserveArrived = this.handleReserveArrived.bind(this);
        this.handleReserveCancel = this.handleReserveCancel.bind(this);
    }

    handleReserveArrived() {
        const { reserve } = this.props;
        if (reserve) {
            const id = reserve.id;
            const data = {
                token: localStorage.getItem("token")
            };
            axios
                .post(`/api/reserves/arrived/${id}`, data)
                .then(response => {
                    // const data = response.data.data;
                    // this.setState({ reserves: data });
                    console.log(response);
                })
                .catch(error => {
                    // this.setState({ showProgres: false, progres: 0 });
                    console.log(error);
                });
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
        const { reserve } = this.props;

        let time = "";
        let reservedColor = "";
        let id = "";
        let iconReservArrived = (
            <Icon onClick={this.handleReserveArrived} type="check" />
        );
        if (reserve) {
            let date = new Date(reserve.time);
            time = date.toLocaleString("ru", {
                hour: "numeric",
                minute: "numeric"
            });
            id = reserve.id;

            if (reserve.is_arrived == 1) {
                reservedColor = "arrivedTable";
                iconReservArrived = (
                    <Icon type="close" onClick={this.handleReserveArrived} />
                );
            } else {
                reservedColor = "reservedTable";
            }
        }
        const edit = (
            <Link to={`/smoking/${id}`}>
                <Button shape="circle" icon="edit" />
            </Link>
        );
        return (
            <Col xs={12} sm={8} md={6} lg={4} xl={3}>
                <div className={reservedColor}>
                    <Card
                        bodyStyle={{
                            fontSize: "12px"
                        }}
                        title={this.props.title}
                        bordered={true}
                        hoverable={true}
                        actions={[
                            iconReservArrived,
                            edit,
                            <Popconfirm
                                title="Are you sure？"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={this.handleReserveCancel}
                            >
                                <Icon type="delete" />
                            </Popconfirm>
                        ]}
                    >
                        {reserve && (
                            <div>
                                <p>Name: {reserve.name}</p>
                                <p>Time: {time}</p>
                                <p>People: {reserve.count}</p>
                            </div>
                        )}
                        {!reserve && (
                            <div>
                                <p>Name:</p>
                                <p>Time:</p>
                                <p>People:</p>
                            </div>
                        )}
                    </Card>
                </div>
            </Col>
        );
    }
}

export default SingleTable;
