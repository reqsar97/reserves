import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function GuestMenu(props) {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
        >
            <Menu.Item className="headerMenuItem" key="1">
                <Link to="/login">Login</Link>
            </Menu.Item>
        </Menu>
    );
}

export default GuestMenu;
