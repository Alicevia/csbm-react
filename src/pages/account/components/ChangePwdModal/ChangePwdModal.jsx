import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { reqChangePassword } from '@/services';
import utils from '@/utils/myutils';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
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
export default class ChangePwdModal extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };
  formRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleOk = () => {
    this.formRef.current.submit();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onFinish = async values => {
    let tem = {
      oldpass: values.oldpass,
      newpass: values.newpass,
    };
    let { data } = await reqChangePassword(tem);
    utils.detailBackCode(data, { s: '更改密码成功' });
    this.showModal();
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal with async logic
        </Button> */}
        <Modal
          title="更改密码"
          width={700}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout} ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="oldpass"
              label="旧密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              name="newpass"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              name="newpass2"
              label="再次输入"
              dependencies={['newpass']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入新密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newpass') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
