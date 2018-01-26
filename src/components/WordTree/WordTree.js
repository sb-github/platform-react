import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Classes, ITreeNode, ButtonGroup, Icon, Intent,Position,Tree, Button,Popover,PopoverInteractionKind } from "@blueprintjs/core";
import {Row, Col} from 'react-bootstrap';
import SelectMenu from './components/SelectMenu'

export class WordTree extends Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired,
    addNewSkill: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = ({
      nodes: null
    });

    let i = 0;
    this.forEachNode(this.state.nodes, n => (n.id = i++));
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.nodes !== this.props.nodes) {

      if(this.state.nodes === null){
        const nodes = this.props.nodes.map(item => Object.assign({},{
          label: item.skill,
          childNodes: item.connects.map(i => Object.assign({},{label: i.subSkill}))
        }));

        this.setState({nodes: nodes});
      }
    }

  }

  render() {
    return (
      <Row>
        <Col xs={8}>
          <Tree
            contents={this.state.nodes}
            onNodeClick={this.handleNodeClick}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
            className={Classes.ELEVATION_0}
          />
        </Col>
      </Row>
    );
  }

  // noinspection JSAnnotator
  handleNodeClick = (nodeData: ITreeNode, _nodePath, e) => {
    const originallySelected = nodeData.isSelected;

    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => {
        n.isSelected = false;
        n.secondaryLabel = '';
      });
    }

    nodeData.isSelected = originallySelected === null ? true : !originallySelected;

    this.forEachNode(this.state.nodes, n => {
      n.secondaryLabel = '';
    });

    nodeData.secondaryLabel = nodeData.isSelected
      ? <SelectMenu
          addStopWord={() => this.handleRemoveWord(nodeData.label)}
          addNewSkill={() => this.handleSaveSkill(nodeData.label)}
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

  handleSaveSkill = skill => {
    this.handleRemove();

    this.props.addNewSkill(skill);
  };

  handleRemoveWord = word => {
    this.handleRemove();
  };

  handleRemove = () => {
    this.state = ({
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
