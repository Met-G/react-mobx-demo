import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout, Menu, Popconfirm, Breadcrumb } from 'antd';
import {
  HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined
} from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '@/store';
import './index.scss'

const { Header, Content, Footer, Sider } = Layout;

function GeekLayout() {
  const { pathname } = useLocation();

  const { userStore, loginStore, channelStore } = useStore()

  useEffect(() => {
    try {
      userStore.getUserInfo();
      channelStore.loadChannelList();
    } catch (err) { }
  }, [userStore])

  const navigate = useNavigate();
  const onLogout = () => {
    loginStore.logOut();
    navigate('/login');
  }

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ overflow: 'hidden' }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
        >
          <Menu.Item icon={<HomeOutlined />} key="/">
            <Link to="/">主页</Link>
          </Menu.Item>
          <Menu.Item icon={<DiffOutlined />} key="/article">
            <Link to="/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<EditOutlined />} key="/publish">
            <Link to="/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background"  >
          <div className="user-info">
            <span className="user-name">{userStore.userInfo.name}</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)