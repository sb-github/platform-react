import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Classes, Icon, ITreeNode,Tree } from "@blueprintjs/core";
import {Row, Col} from 'react-bootstrap';
import SelectMenu from './components/SelectMenu'
import NoResult from './components/NoResult';
import { Button } from 'antd';

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
      nodes: null,
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
    if(prevProps.nodes !== this.props.nodes) {


      //if(this.state.nodes === null){
        const nodes = this.props.nodes.map(item => Object.assign({},{
          skill: item.skill,
          label: <Icon iconName = 'pt-icon-circle'> {item.skill}</Icon>,
          childNodes: item.connects.map(i => Object.assign({},{
            skill: i.subSkill,
            label: <Icon iconName = 'pt-icon-circle'> {i.subSkill}</Icon>
          }))
        }));

        this.setState({nodes: nodes});
      }
    //}

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
    const originallySelected = nodeData.isSelected;

    nodeData.isSelected = originallySelected === null ? true : !originallySelected;

    const selected = !nodeData.isSelected
      ? this.state.selected.filter(i => i !== nodeData.skill)
      : [...this.state.selected, nodeData.skill];

    this.state = ({
      ...this.state,
      selected: selected
    });

    console.log(selected);

    const icon = nodeData.isSelected ? 'pt-icon-tick-circle':'pt-icon-circle';

    nodeData.label = <Icon iconName={icon}> {nodeData.skill}</Icon>;

    this.forEachNode(this.state.nodes, n => {
      n.secondaryLabel = '';
    });

    nodeData.secondaryLabel = nodeData.isSelected
      ? <SelectMenu
          addStopWord={() => this.handleRemoveWords()}
          addNewSkill={() => this.handleSaveSkills()}
        />
      : '';

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
    this.handleRemove();

    this.props.addNewSkills(this.state.selected);
  };

  handleRemoveWords = word => {
    this.handleRemove();
  };

  handleRemove = () => {
    this.state = ({
      ...this.state,
      nodes: this.state.nodes.map(item => {
        return {
          ...item,
          childNodes: item.childNodes.filter(word => word.isSelected !== true)
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
