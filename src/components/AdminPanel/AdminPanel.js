import React, { Component } from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
import CrawlerContainer from '../Crawler/';
import SKillContainer from '../Skill/';
import MaterialContainer from '../Material/';
import DirectionContainer from '../Directions';
import StopWordContainer from '../StopWord';
import GraphContainer from '../Graph';
import { Route, Link } from 'react-router-dom';
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
    const { Header, Sider, Content } = Layout;

    const panel = (<Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Affix>
            <div className='logo'>
              <img className='logo-img' src={'images/platform.png'} width={40} height={40}/>
              <span className='pt-navbar-heading' style={{'font-size':'20px'}}>
                {this.state.collapsed ? '' : 'Platform'}
              </span>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to={'/crawlers'}>
                  <Icon type="rocket" />
                  <span>Extractor</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/skills'}>
                  <Icon type="book" />
                  <span>Skills</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/directions'}>
                  <Icon type="appstore-o" />
                  <span>Directions</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={'/materials'}>
                  <Icon type="file" />
                  <span>Materials</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                    <Link to={'/stopwords'}>
                        <Icon type="file-word" />
                        <span>Stop Words</span>
                    </Link>
               </Menu.Item>
              <Menu.Item key="6">
                <Link to={'/graph'}>
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 600 }}>
            <Route path="/crawlers" component = { CrawlerContainer } />
            <Route path="/skills" component = { SKillContainer } />
            <Route path="/directions" component = { DirectionContainer } />
            <Route path="/materials" component = { MaterialContainer } />
            <Route path="/stopwords" component = { StopWordContainer } />
            <Route path="/graph" component = { GraphContainer } />
          </Content>
        </Layout>
    </Layout>);

    return (panel);
  }
}

export default AdminPanel;