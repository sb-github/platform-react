import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react';
import './components/Page.css';
import CrawlerContainer from '../Crawler/';
import SKillContainer from '../Skill/';
import MaterialContainer from '../Material/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Page extends Component {
  constructor() {
    super();
     this.state = {
    collapsed: false,
  };
  }
 toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {  
    const { Header, Sider, Content } = Layout;
    const page = (
  <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span><a href="/admin-panel">Admin Panel</a></span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span><a href="/crawlers">Extractor</a></span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span><a href="/skills">Skills</a></span>
            </Menu.Item>
             <Menu.Item key="4">
              <Icon type="upload" />
              <span><a href="/materials">Materials</a></span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="upload" />
              <span><a href="/users">Users</a></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Router>
            <Route path="/crawlers" component = { CrawlerContainer } />
          </Router>
          <Router>
            <Route path="/skills" component = { SKillContainer } />
          </Router>
          <Router>
            <Route path="/materials" component = { MaterialContainer } />
          </Router>
          </Content>
        </Layout>
      </Layout>
      </div>

      );
    return (page);
  }
}

export default Page;