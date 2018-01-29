import React, { Component } from "react";
import { Route } from "react-router-dom";

import Smoking from "./Smoking";
import EditTable from "./table/EditTable";

function SmokingRoutesController(props) {
    return (
        <div>
            <Route exact path={props.path} component={Smoking} />
            <Route path={`${props.path}/:id`} component={EditTable} />
        </div>
    );
}

export default SmokingRoutesController;
