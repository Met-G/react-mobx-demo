import React from 'react';
import { Layout, Menu, Popconfirm, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import './index.scss'

const { Header, Content, Footer, Sider } = Layout;

export default function GeekLayout() {

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}>
          <Menu.Item icon={<HomeOutlined />} key="1">
            数据概览
          </Menu.Item>
          <Menu.Item icon={<DiffOutlined />} key="2">
            内容管理
          </Menu.Item>
          <Menu.Item icon={<EditOutlined />} key="3">
            发布文章
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ position: 'sticky', top: 0, padding: 0 }} >
          <div className="user-info">
            <span className="user-name">user.name</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 640 }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}