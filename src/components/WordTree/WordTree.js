import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Colors, Classes, Icon, ITreeNode,Tree } from "@blueprintjs/core";
import {Row, Col} from 'react-bootstrap';
import SelectMenu from './components/SelectMenu'
import NoResult from './components/NoResult';
import { Button } from 'antd';
import styles from './styles.css';

export class WordTree extends Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    crawler_id: PropTypes.string.isRequired,
    addNewSkills: PropTypes.func.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = ({
      nodes: [],
      selected: [],
      selectedMode: false
    });

    let i = 0;
    this.forEachNode(this.state.nodes, n => (n.id = i++));
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.crawler_id !== this.props.crawler_id)
      this.setState({nodes: []});

    if(prevProps.nodes !== this.props.nodes) {
      if(!Object.keys(this.state.nodes).length)
        this.setState({nodes: WordTree.renderNodes(this.props.nodes)});

      if(prevProps.page !== this.props.page)
        this.setState({nodes: [
          ...this.state.nodes,
          ... WordTree.renderNodes(this.props.nodes)
        ]});
    }

  }

  static renderNodes(data) {
    return data.map(item => {
      const icon = item.tag === 'new' ? 'pt-icon-circle' : 'pt-icon-full-circle';

      return {
        skill: item.skill,
        new: 4,
        tag: item.tag,
        label: <Icon className={item.tag} iconName={icon}> {item.skill}</Icon>,
        childNodes: item.connects.map(i => {
          const icon = i.tag === 'new' ? 'pt-icon-circle' : 'pt-icon-full-circle';

          return {
            skill: i.subSkill,
            tag: i.tag,
            label: <Icon className={i.tag} iconName={icon}> {i.subSkill}</Icon>
          };
        })
      };
    });
  }

  render() {
    const {fetchResultCrawler, page, crawler_id} = this.props;
    const description = (
      <span>
        Your search didn't match any skills.<br />Try select another crawler.
      </span>
    );

    const result = Object.keys(this.state.nodes || {}).length === 0
      ?  <Col xs={8}>
           <NoResult
             title={'No search results by crawler'}
             desc={description}
             icon={'search'}
           />
      </Col>
      : <div>
        <Col xs={8}>
          <Tree
            contents={this.state.nodes}
            onNodeClick={this.handleNodeClick}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
            className={Classes.ELEVATION_0}
          />
        </Col>
        <Col xs={8}>
          <br/>
          <Button onClick={() => fetchResultCrawler(crawler_id, page + 1)} type="primary" icon={'down-circle'}>
            Show more
          </Button>
        </Col>
    </div>;

    return (
      <Row>
        {result}
      </Row>

    );
  }

  // noinspection JSAnnotator
  handleNodeClick = (nodeData: ITreeNode, _nodePath, e) => {
    if(nodeData.tag !== 'new')
      return;
    const originallySelected = nodeData.isSelected;

    nodeData.isSelected = originallySelected === null ? true : !originallySelected;

    const selected = !nodeData.isSelected
      ? this.state.selected.filter(i => i !== nodeData.skill)
      : [...this.state.selected, nodeData.skill];

    this.state = ({
      ...this.state,
      selected: selected
    });

    const icon = nodeData.isSelected ? 'pt-icon-tick-circle':'pt-icon-circle';

    nodeData.label = <Icon iconName={icon}> {nodeData.skill}</Icon>;

    this.forEachNode(this.state.nodes, n => {
      const newNodes = n.new || null;
      n.secondaryLabel = newNodes === null
        ? ''
        : (newNodes <= 0
            ? <Icon iconName='pt-icon-eye-on'/>
            :'');
    });

    const newNodes = nodeData.new || null;

    nodeData.secondaryLabel = nodeData.isSelected
      ? <SelectMenu
          addStopWord={() => this.handleRemoveWords()}
          addNewSkill={() => this.handleSaveSkills()}
        />
      : (newNodes === null ? '' : (newNodes <= 0
          ? <Icon iconName='pt-icon-eye-on'/>
          :'')
      );

    this.setState(this.state);
  };

  // noinspection JSAnnotator
  handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  // noinspection JSAnnotator
  handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  handleSaveSkills = () => {
    this.handleRemove('skill');

    this.props.addNewSkills(this.state.selected);
  };

  handleRemoveWords = word => {
    this.handleRemove('stopword');
  };

  handleRemove = tag => {
    //const selCount = this.state.selected.length;

    this.state = ({
      ...this.state,
      nodes: this.state.nodes.map(item => {
        let selCount = 0;
        console.log(item.new);
        return {
          ...item,
          ...(item.isSelected
            ? {
              tag: tag,
              isSelected: false,
              label: <Icon
                className={tag}
                iconName ='pt-icon-full-circle'>
                {' ' + item.skill}
              </Icon>
            } : {}
          ),
          childNodes: item.childNodes.map(word => {
            selCount = word.isSelected ? selCount + 1 : selCount;

            return word.isSelected
              ? {
                ...word,
                tag: tag,
                isSelected: false,
                label: <Icon
                  className={tag}
                  iconName ='pt-icon-full-circle'>
                  {' ' + word.skill}
                </Icon>,
              }
              : word
          }),
          new: item.new - selCount,
          secondaryLabel: (item.new - selCount <= 0) ? <Icon iconName='pt-icon-eye-on'/> : '',
          isExpanded: (item.new - selCount <= 0) ? false : item.isExpanded
        }
      })
    });
  };

  // noinspection JSAnnotator
  forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
    if (nodes == null) {
      return;
    }
    // noinspection JSAnnotator
    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }
}

export default WordTree;
