import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { Progress } from "antd";
import axios from "axios";

//Custom components
import Sidebar from "./components/Sidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import GuestMenu from "./components/header/GuestMenu";
import UserMenu from "./components/header/UserMenu";

//areas
import SmokingRoutesController from "./components/areas/SmokingRoutesController";
import Smoking from "./components/areas/Smoking";
import NoSmoking from "./components/areas/NoSmoking";
import Outside from "./components/areas/Outside";
import WaitingList from "./components/areas/WaitingList";
import EditTable from "./components/areas/table/EditTable";
import AddReserve from "./components/reserves/AddResreve";

const FadingRoute = ({ component: Component, path, ...rest }) => (
    <Route
        path={path}
        render={props => {
            return <Component {...props} {...rest} />;
        }}
    />
);

class Master extends Component {
    constructor(props) {
        let isLoged = 1;
        if (
            localStorage.getItem("isLoged") == "0" ||
            !localStorage.getItem("isLoged")
        ) {
            isLoged = 0;
        }
        super(props);
        this.state = {
            progres: 0,
            showProgres: false,
            isLoged
        };
        //bind functions
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewReserve = this.handleNewReserve.bind(this);
    }

    PrivateRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    localStorage.getItem("isLoged") == "1" ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }

    handleLogin(history, value) {
        this.history = history;
        this.setState({ showProgres: true });
        const self = this;
        const config = {
            onUploadProgress: function(progresEvent) {
                let percentCompleted = Math.floor(
                    progresEvent.loaded * 100 / progresEvent.total
                );
                self.setState({ progres: percentCompleted });
            }
        };
        axios
            .post("/api/auth/login", value, config)
            .then(response => {
                this.setState({ showProgres: false, progres: 0, isLoged: 1 });
                const token = response.data.result.token;
                localStorage.setItem("token", token);
                localStorage.setItem("isLoged", 1);
                history.push("/home");
            })
            .catch(error => {
                this.setState({ showProgres: false, progres: 0 });
                console.log(error);
            });
    }

    handleLogout() {
        this.setState({ showProgres: true });
        const self = this;
        const config = {
            onUploadProgress: function(progresEvent) {
                let percentCompleted = Math.floor(
                    progresEvent.loaded * 100 / progresEvent.total
                );
                self.setState({ progres: percentCompleted });
            }
        };

        const value = {
            token: localStorage.getItem("token")
        };

        axios
            .post("/api/auth/logout", value, config)
            .then(response => {
                this.setState({ showProgres: false, progres: 0, isLoged: 0 });
                localStorage.removeItem("token");
                localStorage.setItem("isLoged", 0);
                this.history.push("/login");
            })
            .catch(error => {
                this.setState({ showProgres: false, progres: 0 });
                console.log(error);
            });
    }

    handleNewReserve(values) {
        axios
            .post("/api/reserves", values)
            .then(response => {
                console.log(response);
                // this.history.push("/login");
            })
            .catch(error => {
                // this.setState({ showProgres: false, progres: 0 });
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.showProgres && (
                    <Progress percent={this.state.progres} showInfo={false} />
                )}
                <Layout>
                    <Sidebar />
                    <Layout>
                        <Header style={{ background: "#fff", padding: 0 }}>
                            {this.state.isLoged == 0 && <GuestMenu />}
                            {this.state.isLoged == 1 && (
                                <UserMenu onLogout={this.handleLogout} />
                            )}
                        </Header>
                        <Content style={{ margin: "24px 16px 0" }}>
                            <div
                                style={{
                                    padding: 24,
                                    background: "#fff",
                                    minHeight: 360
                                }}
                            >
                                <FadingRoute
                                    path="/reserve/create"
                                    component={AddReserve}
                                    addNewReserve={this.handleNewReserve}
                                />

                                <FadingRoute
                                    path="/login"
                                    title="Login"
                                    onLogin={this.handleLogin}
                                    component={Login}
                                />
                                <Route path="/register" component={Register} />
                                <this.PrivateRoute
                                    path="/home"
                                    component={Home}
                                />

                                <SmokingRoutesController path="/smoking" />

                                <Route
                                    path="/waiting-list"
                                    component={WaitingList}
                                />
                                <Route
                                    path="/no-smoking"
                                    component={NoSmoking}
                                />
                                <Route path="/outside" component={Outside} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            Dargett Reserves ©2018 Created by Karen
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Master;
