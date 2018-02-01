import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchWords } from "../../WordTree/treeActions";
import { Row, Col } from 'react-bootstrap';
import { Tag, Classes, Intent } from "@blueprintjs/core";


class ListWords extends Component {
  static propTypes = {
    words: PropTypes.array,
    fetchWords: PropTypes.func.isRequired
  };

  render() {

    const words = this.props.words || [];
    const wordsList = words.map(word =>
          <Tag key={word.id} className={Classes.LARGE} intent={Intent.DEFAULT} onRemove={this.deleteTag(this)}>
              {word.key}
          </Tag>);

    return (
        <Row>
          <Col xs={8}>
            {wordsList}
          </Col>
        </Row>
    );
  }

}

export default ListWords;

