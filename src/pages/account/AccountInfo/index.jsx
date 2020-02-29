import React, { useState, useRef } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import ChangePwdModal from '../components/ChangePwdModal/ChangePwdModal';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 15,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

const RegistrationForm = props => {
  let { phone, email, company, address } = props.currentUser || {};
  const [form] = Form.useForm();
  const pwdModal = useRef(null);
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const changePwd = () => {
    pwdModal.current.showModal();
    // console.log(pwdModal)
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item label="账号">
          <Input disabled defaultValue={phone} />
        </Form.Item>

        <Form.Item label="密码" style={{ marginBottom: 0 }}>
          <Form.Item style={{ display: 'inline-block', width: 'calc(100%)', marginRight: 8 }}>
            <Input placeholder="******" disabled />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'auto', marginLeft: -96 }}>
            <Button onClick={changePwd}>修改密码</Button>
          </Form.Item>
        </Form.Item>

        <Form.Item label="手机号">
          <Input disabled defaultValue={phone} />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input defaultValue={email} />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <Input defaultValue={address} />
        </Form.Item>
        <Form.Item name="company" label="公司">
          <Input defaultValue={company} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
      <ChangePwdModal ref={pwdModal}></ChangePwdModal>
    </div>
  );
};

// export default RegistrationForm
// ReactDOM.render(<RegistrationForm />, mountNode);
export default RegistrationForm;
