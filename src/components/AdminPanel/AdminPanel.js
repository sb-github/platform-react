import React, { Component } from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
import asyncComponent from '../../hoc/AsyncComponent';
import { Route, Link } from 'react-router-dom';
import styles from './styles.css';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    const GraphSkillContainer = asyncComponent(() =>
      import('../GraphSkill').then(module => module.default)
    );

    const CrawlerContainer = asyncComponent(() =>
      import('../Crawler').then(module => module.default)
    );

    const SKillContainer = asyncComponent(() =>
      import('../Skill').then(module => module.default)
    );

    const DirectionContainer = asyncComponent(() =>
      import('../Directions').then(module => module.default)
    );

    const MaterialContainer = asyncComponent(() =>
      import('../Material').then(module => module.default)
    );

    const StopWordContainer = asyncComponent(() =>
      import('../StopWord').then(module => module.default)
    );

    this.state = {
      collapsed: false,
      components:{
        GraphSkillContainer,
        CrawlerContainer,
        SKillContainer,
        DirectionContainer,
        MaterialContainer,
        StopWordContainer
      }
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
            <Route path="/crawlers" component = { this.state.components.CrawlerContainer } />
            <Route path="/skills" component = { this.state.components.SKillContainer } />
            <Route path="/directions" component = { this.state.components.DirectionContainer } />
            <Route path="/materials" component = { this.state.components.MaterialContainer } />
            <Route path="/stopwords" component = { this.state.components.StopWordContainer } />
            <Route path="/graph" component = { this.state.components.GraphSkillContainer } />
          </Content>
        </Layout>
    </Layout>);

    return (panel);
  }
}

export default AdminPanel;