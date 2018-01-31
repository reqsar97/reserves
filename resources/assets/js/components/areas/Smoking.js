import React, { Component } from "react";
import { Row, Col } from "antd";
import axios from "axios";
//Custom components
import SingleTable from "./SingleTable";
//socket
import {
    subscribeToAddReserve,
    subscribeToReserveArrived,
    subscribeToReserveCancelled
} from "../../api";

class Smoking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserves: []
        };
        subscribeToAddReserve((err, data) => {
            if (data) {
                if (data.area === 1) {
                    const { reserves } = this.state;
                    const newReserves = [data, ...reserves];
                    this.setState({ reserves: newReserves });
                }
            }
        });
        subscribeToReserveArrived((err, data) => {
            const { reserves } = this.state;
            const newReserves = reserves.map(value => {
                if (value.id == data.id) {
                    return data;
                }
                return value;
            });
            this.setState({ reserves: newReserves });
            // console.log("reserveArrived: ", data);
        });
        subscribeToReserveCancelled((err, data) => {
            const { reserves } = this.state;
            const newReserves = reserves.filter(value => {
                if (value.id == data) {
                    return false;
                }
                return true;
            });
            this.setState({ reserves: newReserves });
        });
    }

    componentDidMount() {
        const data = {
            token: localStorage.getItem("token")
        };
        axios
            .post("/api/reserves/area/1", data)
            .then(response => {
                const data = response.data.data;
                this.setState({ reserves: data });
            })
            .catch(error => {
                // this.setState({ showProgres: false, progres: 0 });
                console.log(error);
            });
    }

    render() {
        const { reserves } = this.state;
        let reservedTables = [];
        if (reserves.length) {
            for (var i = 0; i < reserves.length; i++) {
                let tableNumber = reserves[i].table;
                reservedTables["table_" + tableNumber] = reserves[i];
            }
        }
        return (
            <div>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    {[1, 2, 3, 4, 5, 6].map(n => {
                        return (
                            <SingleTable
                                key={n}
                                className="singleTable"
                                title={`Table - ${n}`}
                                reserve={reservedTables[`table_${n}`]}
                            />
                        );
                    })}
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    {[7, 8, 9, 10, 11, 12].map(n => {
                        return (
                            <SingleTable
                                key={n}
                                className="singleTable"
                                title={`Table - ${n}`}
                                reserve={reservedTables[`table_${n}`]}
                            />
                        );
                    })}
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    {[13, 14, 15, 16, 17, 18].map(n => {
                        return (
                            <SingleTable
                                key={n}
                                className="singleTable"
                                title={`Table - ${n}`}
                                reserve={reservedTables[`table_${n}`]}
                            />
                        );
                    })}
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    {[19, 20, 21, 22, 23, 24].map(n => {
                        return (
                            <SingleTable
                                key={n}
                                className="singleTable"
                                title={`Table - ${n}`}
                                reserve={reservedTables[`table_${n}`]}
                            />
                        );
                    })}
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    {[25, 26, 27, 28, 29, 30].map(n => {
                        return (
                            <SingleTable
                                key={n}
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

export default Smoking;
