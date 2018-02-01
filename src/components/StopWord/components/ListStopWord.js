import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Tag, Classes, Intent, Button } from "@blueprintjs/core";


class ListWords extends Component {
  static propTypes = {
    words: PropTypes.array,
    fetchWords: PropTypes.func.isRequired,
    deleteWords: PropTypes.func.isRequired,
  };

  render() {

    const words = this.props.words || [];
    const wordsList = words.map(word =>
          <Tag
              active={word.id}
              className={Classes.LARGE}
              intent={Intent.DEFAULT}
              onRemove={this.deleteTag(this)}
          >
              {word.key}
              <Button onClick={() => this.delete(word.id)}>X</Button>
          </Tag>);

    return (
        <Row>
          <Col xs={8}>
            {wordsList}
          </Col>
        </Row>
    );
  }

deleteTag = (data) => console.log(data);

   delete = stopword_id => {
    const {deleteWords} = this.props;

    deleteWords(stopword_id);
   };
}

export default ListWords;
