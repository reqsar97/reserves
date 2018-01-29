import React, { Component } from "react";
import { Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";

class SingleTable extends Component {
    render() {
        const edit = (
            <Link to={`/smoking/${this.props.index}`}>
                <Icon type="edit" />
            </Link>
        );

        return (
            <Col xs={12} sm={8} md={6} lg={4} xl={3}>
                <div className="">
                    <Card
                        bodyStyle={{
                            "font-size": "10px"
                        }}
                        title={this.props.title}
                        bordered={true}
                        hoverable={true}
                        actions={[
                            <Icon
                                style={{
                                    color: "green"
                                }}
                                type="check"
                            />,
                            edit,
                            <Icon type="close" />
                        ]}
                    >
                        <p>Name: </p>
                        <p>When Come: </p>
                        <p>Count People: </p>
                    </Card>
                </div>
            </Col>
        );
    }
}

export default SingleTable;
