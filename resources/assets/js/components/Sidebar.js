import React from "react";
import { Menu, Icon, Layout } from "antd";
const { Sider } = Layout;
import { Link } from "react-router-dom";

function Sidebar(props) {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo">
                <img src="/img/Logo-1.png" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <Menu.Item key="1">
                    <Link to="/reserve/create">
                        <Icon type="plus-circle-o" />
                        <span className="nav-text">Add Reserve</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/smoking">
                        <Icon type="heart-o" />
                        <span className="nav-text">Smoking</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/no-smoking">
                        <Icon type="heart" />
                        <span className="nav-text">No Smoking</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/outside">
                        <Icon type="picture" />
                        <span className="nav-text">Outside</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/waiting-list">
                        <Icon type="usergroup-add" />
                        <span className="nav-text">Waiting list</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;
