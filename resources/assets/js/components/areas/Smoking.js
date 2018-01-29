import React, { Component } from "react";
import { Row, Col } from "antd";

//Custom components
import SingleTable from "./SingleTable";

class Smoking extends Component {
    constructor(props) {
        super(props);
        console.log("Smoking", props);
    }

    render() {
        return (
            <div>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    <SingleTable
                        index={1}
                        className="singleTable"
                        title="Table - 1"
                    />

                    <SingleTable className="singleTable" title="Table - 2" />

                    <SingleTable className="singleTable" title="Table - 3" />

                    <SingleTable className="singleTable" title="Table - 4" />

                    <SingleTable className="singleTable" title="Table - 5" />

                    <SingleTable className="singleTable" title="Table - 6" />
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    <SingleTable className="singleTable" title="Table - 7" />

                    <SingleTable className="singleTable" title="Table - 8" />

                    <SingleTable className="singleTable" title="Table - 9" />

                    <SingleTable className="singleTable" title="Table - 10" />

                    <SingleTable className="singleTable" title="Table - 11" />

                    <SingleTable className="singleTable" title="Table - 12" />
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    <SingleTable className="singleTable" title="Table - 13" />

                    <SingleTable className="singleTable" title="Table - 14" />

                    <SingleTable className="singleTable" title="Table - 15" />

                    <SingleTable className="singleTable" title="Table - 16" />

                    <SingleTable className="singleTable" title="Table - 17" />

                    <SingleTable className="singleTable" title="Table - 18" />
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    <SingleTable className="singleTable" title="Table - 19" />

                    <SingleTable className="singleTable" title="Table - 20" />

                    <SingleTable className="singleTable" title="Table - 21" />

                    <SingleTable className="singleTable" title="Table - 22" />

                    <SingleTable className="singleTable" title="Table - 23" />

                    <SingleTable className="singleTable" title="Table - 24" />
                </Row>
                <Row
                    gutter={12}
                    className="tableRow"
                    type="flex"
                    justify="center"
                >
                    <SingleTable className="singleTable" title="Table - 25" />

                    <SingleTable className="singleTable" title="Table - 26" />

                    <SingleTable className="singleTable" title="Table - 27" />

                    <SingleTable className="singleTable" title="Table - 28" />

                    <SingleTable className="singleTable" title="Table - 29" />

                    <SingleTable className="singleTable" title="Table - 30" />
                </Row>
            </div>
        );
    }
}

export default Smoking;
