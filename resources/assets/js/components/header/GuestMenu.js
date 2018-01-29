import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function GuestMenu(props) {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
        >
            <Menu.Item className="headerMenuItem" key="1">
                <Link to="/login">Login</Link>
            </Menu.Item>

            <Menu.Item className="headerMenuItem" key="2">
                <Link to="/register">Register</Link>
            </Menu.Item>
        </Menu>
    );
}

export default GuestMenu;
