import React from 'react';
import { Table, Tag, Button } from 'antd';
import styles from './index.less';
const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, item) => (
      <div className={styles['table-item']}>
        <img src={item.serverPicture} alt="" />
        <div>
          <h3>{item.name}</h3>
          <p>{item.content}</p>
        </div>
      </div>
    ),
  },
  {
    title: '服务状态',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: '操作',
    key: 'id',
    align: 'center',
    render: (text, record) => <Button>开通</Button>,
  },
];

const TableShow = props => {
  let {
    categoryItemInfo: { list = [], total = 0 },
  } = props;

  return (
    <Table
      rowKey="id"
      bordered
      rowClassName={styles['row-style']}
      columns={columns}
      dataSource={list}
    />
  );
};

export default TableShow;
