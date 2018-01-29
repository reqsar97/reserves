import React from "react";
import { Menu } from "antd";

function UserMenu(props) {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
            onClick={props.onLogout}
        >
            <Menu.Item className="headerMenuItem" key="1">
                Logout
            </Menu.Item>
        </Menu>
    );
}

export default UserMenu;
