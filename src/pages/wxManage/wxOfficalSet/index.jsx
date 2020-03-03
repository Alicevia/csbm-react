import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Switch, Row, Col } from 'antd';
import { connect } from 'dva';
import Upload from '@/components/Upload/Upload';
import utils from '@/utils/myutils';
import styles from './index.less';

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

const WxOfficalSet = props => {
  let { weChatInfo, dispatch } = props;
  let [logoImg, setLogoImg] = useState(weChatInfo.customerIcon);

  let [form] = Form.useForm();
  const [switchValue, setSwitchValue] = useState(false);
  const onFill = () => {
    form.setFieldsValue(weChatInfo);
  };
  useEffect(() => {
    onFill();
    setLogoImg(weChatInfo.customerIcon);
  }, [weChatInfo]);
  useEffect(() => {
    form.setFieldsValue({ customerIcon: logoImg });
  }, [logoImg]);

  const onFinish = values => {
    values = { ...weChatInfo, ...values };
    let data = createFormdata(values);
    if (weChatInfo.id) {
      dispatch({
        type: 'wx/getModiWeChatInfo',
        payload: data,
      });
    } else {
      dispatch({
        type: 'wx/getInitWeChatInfo',
        payload: data,
      });
    }
  };
  const createFormdata = data => {
    let formdata = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        if (key === 'customerIcon') {
          continue;
        }
        formdata.append([key], data[key]);
      }
    }
    // 如果上传了图片那么将图片追加到formdata
    if (data.customerIcon && data.customerIcon.startsWith('http')) {
      return formdata;
    } else if (data.customerIcon) {
      let file = utils.dataURLtoFile(data.customerIcon, 'logo.png');
      formdata.append('file', file);
      return formdata;
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const switchChange = checked => {
    setSwitchValue(checked);
  };

  const changeValue = e => {
    console.log(e.target.value);
  };
  return (
    <div>
      <Form
        form={form}
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // initialValues={weChatInfo}
      >
        <Form.Item
          label="APPID"
          name="appId"
          rules={[
            {
              required: true,
              message: '请填写appid',
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item label="公众号原始id" name="originalId">
          <Input />
        </Form.Item>
        <Form.Item label="APPSecret" name="appSecret">
          <Input />
        </Form.Item>
        <Form.Item label="Token" name="token">
          <Input />
        </Form.Item>
        <Form.Item label="微信授权">
          <span style={{ marginRight: 10 }}>{weChatInfo.isAuthorize ? '已授权' : '未授权'}</span>
          <Button>微信授权</Button>
        </Form.Item>
        <Form.Item label="微信推送通知开关">
          <Switch disabled={weChatInfo.id ? false : true} onChange={switchChange}></Switch>
        </Form.Item>
        {switchValue ? (
          <Fragment>
            <Form.Item key="1" label="上线通知" name="onlineTemplateId">
              <Input />
            </Form.Item>
            <Form.Item key="2" label="下线通知" name="offlineTemplateId">
              <Input />
            </Form.Item>
            <Form.Item key="3" label="报警消息" name="warnTemplateId">
              <Input />
            </Form.Item>
            <Form.Item key="4" label="检测报告" name="reportTemplateId">
              <Input />
            </Form.Item>
          </Fragment>
        ) : null}
        <Form.Item
          label="微信公众号名称"
          rules={[
            {
              required: true,
              message: '请填写公众号名称',
            },
          ]}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="微信公众号logo"
          name="customerIcon"
          rules={[
            {
              required: true,
              message: '请上传logo图片',
            },
          ]}
        >
          <Upload setLogoImg={setLogoImg} logoImg={logoImg}></Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {weChatInfo.id ? '保存' : '初始化'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({ wx: { weChatInfo } }) => {
  return {
    weChatInfo,
  };
})(WxOfficalSet);
