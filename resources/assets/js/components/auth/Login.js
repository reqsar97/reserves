import React, { Component } from "react";
import { Row, Col } from "antd";
import { Form, Icon, Input, Button, Checkbox } from "antd";
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);

        //bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.props.onLogin(this.props.history, values);
            } else {
                console.log(err);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <h2>Login</h2>
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form"
                        >
                            <FormItem>
                                {getFieldDecorator("email", {
                                    rules: [
                                        {
                                            required: true,
                                            type: "email",
                                            message:
                                                "The input is not valid E-mail!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Email"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            min: 6,
                                            message:
                                                "Please input your Password!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    className="login-form-button loginFormItem"
                                >
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
