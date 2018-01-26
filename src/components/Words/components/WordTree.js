import * as React from "react";
import { Classes, ITreeNode, ButtonGroup, Icon, Intent,Position,Tree, Button,Popover,PopoverInteractionKind } from "@blueprintjs/core";
import { BaseExample } from "@blueprintjs/docs-theme";
import {fetchNewSkill} from "../../Crawler/wordActions";
import {Row, Col} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class WordTree extends BaseExample {
  constructor(props) {
    super(props);

    this.state = ({
      words: props.words
    });

    let i = 0;
    this.forEachNode(this.state.words, n => (n.id = i++));
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.words !== this.props.words) {
      this.setState({words: this.props.words});
    }
  }


  render() {
    return (
      <Row>
        <Col xs={8}>
          <Tree
            contents={this.state.words}
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

    const popover = <Popover
      interactionKind={PopoverInteractionKind.HOVER}
      popoverClassName="pt-popover-content-sizing"
      position={Position.LEFT}
    >
        <Icon intent={Intent.PRIMARY} iconName = 'pt-icon-export' />
        <ButtonGroup minimal={true} large={true}>
          <Button className="pt-intent-danger">Stop words</Button>
          <Button onClick={() => this.props.addNewSkill(nodeData.label)} className="pt-intent-success">Skill</Button>
        </ButtonGroup>
    </Popover>;

    if (!e.shiftKey) {
      this.forEachNode(this.state.words, n => {
        n.isSelected = false;
        n.secondaryLabel = '';
      });
    }
    nodeData.isSelected = originallySelected === null ? true : !originallySelected;
    this.forEachNode(this.state.words, n => {
      n.secondaryLabel = '';
    });
    nodeData.secondaryLabel = nodeData.isSelected ? popover : '';

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

const mapStateToProps = state => {
  const { words } = state;

  return {
    words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSkill: bindActionCreators(fetchNewSkill, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordTree);
