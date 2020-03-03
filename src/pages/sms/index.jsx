import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 16,
  },
};

const SMS = props => {
  let { aliMessageInfo, dispatch } = props;
  let [form] = Form.useForm();
  const onFill = () => {
    form.setFieldsValue(aliMessageInfo);
  };
  useEffect(() => {
    onFill();
  }, [aliMessageInfo]);
  useEffect(() => {
    dispatch({
      type: 'wx/getAliMessageInfo',
    });
  }, []);
  const onFinish = values => {
    if (!aliMessageInfo.id) {
      message.warnging('清先开通阿里短信服务');
      return;
    }
    values = { ...aliMessageInfo, ...values };
    console.log(values);

    dispatch({
      type: 'wx/getModiAliMessageInfo',
      payload: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          {...layout}
          name="basic"
          onFinish={onFinish}
          // initialValues={aliMessageInfo}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: '请填写公众号名称',
              },
            ]}
            label="签名名称"
            name="signName"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请填写公众号名称',
              },
            ]}
            label="KeyID"
            name="accessKeyID"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请填写公众号名称',
              },
            ]}
            label="KeySecret"
            name="accessKeySecret"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请填写公众号名称',
              },
            ]}
            label="报警通知"
            name="warnSmsNotice"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请填写公众号名称',
              },
            ]}
            label="验证码"
            name="verificationCode"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ wx: { aliMessageInfo } }) => {
  return { aliMessageInfo };
})(SMS);
