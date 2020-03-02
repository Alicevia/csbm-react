import React from 'react';
import { Table, Tag, Button } from 'antd';
import styles from './index.less';

function sta(status) {
  switch (status) {
    case 0:
      return '开通';
      break;
    case 1:
      return '审核未通过';
      break;
    case 2:
      return '正在审核';
      break;
    case 3:
      return '已开通';
      break;
    default:
      return '已过期';
  }
}
function btnDisabled(status) {
  switch (status) {
    case 0:
      return false;
      break;
    case 1:
      return false;
      break;
    case 2:
      return true;
      break;
    case 3:
      return true;
      break;
    default:
      return false;
  }
}

const TableShow = props => {
  let {
    categoryItemInfo: { list = [], total = 0 },
    current,
    openService,
    onChange,
  } = props;

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
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },

    {
      title: '操作',
      key: 'id',
      align: 'center',
      render: (text, record) => (
        <Button onClick={() => openService(record.id)} disabled={btnDisabled(record.status)}>
          {sta(record.status)}
        </Button>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      bordered
      rowClassName={styles['row-style']}
      columns={columns}
      dataSource={list}
      pagination={{
        current,
        total,
        onChange,
      }}
    />
  );
};

export default TableShow;
