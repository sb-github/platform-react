import React, { Component } from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { Header, Sider, Content, Footer } = Layout;

    const panel = (<Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Affix>
            <div className='logo'>
              <img className='logo-img' src={'images/platform.png'} width={40} height={40}/>
              <span className='pt-navbar-heading' style={{'fontSize':'20px'}}>
                {this.state.collapsed ? '' : 'Platform'}
              </span>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={'1'} defaultOpenKeys={'1'} >
              <Menu.Item key="1">
                <Link to={'/admin/crawlers'}>
                  <Icon type="rocket" />
                  <span>Extractor</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/admin/skills'}>
                  <Icon type="book" />
                  <span>Skills</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/admin/directions'}>
                  <Icon type="appstore-o" />
                  <span>Directions</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={'/admin/materials'}>
                  <Icon type="file" />
                  <span>Materials</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                    <Link to={'/admin/stopwords'}>
                        <Icon type="file-word" />
                        <span>Stop Words</span>
                    </Link>
               </Menu.Item>
              <Menu.Item key="6">
                <Link to={'/admin/graph'}>
                  <Icon type="share-alt" />
                  <span>Graph skill</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>

          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              {this.props.children}
          </Content>
            <Footer style={{ textAlign: 'center' }}>
                Soft Bistro ©2018 Created by SoftBistro trainees
            </Footer>
        </Layout>
    </Layout>);

    return (panel);
  }
}

export default AdminPanel;