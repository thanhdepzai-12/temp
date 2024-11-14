import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../utils/apiServices';

const User = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchListUser = async() => {
      let res = await getAllUser();
      
      if (res) {
        setDataSource(res);
      } else {
        console.log("error");
      }
    }
    fetchListUser();
  },[])


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',

  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];


  return (
    <div style={{width:"100%",marginTop:"2rem"}} >
      <div className='container'>
      <Table dataSource={dataSource} columns={columns} rowKey={"_id"}
      pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30']}}
      />;
      </div>

    </div>
  )
}

export default User