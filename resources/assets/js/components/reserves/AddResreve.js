import React, { Component } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    TimePicker,
    notification,
    Icon
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
import axios from "axios";

class AddReserve extends Component {
    constructor(props) {
        super(props);

        //bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    "date-time-picker": fieldsValue["date-time-picker"].format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                    token: localStorage.getItem("token")
                };
                this.props.addNewReserve(values);
                // this.props.form.resetFields();
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        const config = {
            rules: [
                {
                    type: "object",
                    required: true,
                    message: "Please select time!"
                }
            ]
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Name">
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please input Name"
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Count of people">
                    {getFieldDecorator("count", {
                        rules: [
                            {
                                required: true,
                                message: "Please input count of people"
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="DatePicker[showTime]">
                    {getFieldDecorator("date-time-picker", config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Phone Number">
                    {getFieldDecorator("phone", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your phone number!"
                            }
                        ]
                    })(<Input style={{ width: "100%" }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Select Area" hasFeedback>
                    {getFieldDecorator("area", {
                        rules: [
                            {
                                required: true,
                                message: "Please select your area!"
                            }
                        ]
                    })(
                        <Select placeholder="Please select an area">
                            <Option value="0">No Smoking</Option>
                            <Option value="1">Smoking</Option>
                            <Option value="2">Outside</Option>
                            <Option value="3">Waiting List</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Number Table">
                    {getFieldDecorator("table", {
                        rules: [
                            {
                                required: true,
                                message: "Please input number of table"
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedAddReserve = Form.create()(AddReserve);

export default WrappedAddReserve;
