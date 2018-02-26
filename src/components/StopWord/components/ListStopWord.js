import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pager } from 'react-bootstrap';
import { Tag, Classes, Intent, Button } from "@blueprintjs/core";

class ListWords extends Component {
  static propTypes = {
    words: PropTypes.array,
    page: PropTypes.number,
    fetchWords: PropTypes.func.isRequired,
    deleteWords: PropTypes.func.isRequired,
  };

  render() {

    const { page } = this.props;
    const words = this.props.words || [];
    const wordsList = words.map(word =>
          <Tag
              active={word.id}
              className={Classes.LARGE}
              intent={Intent.DEFAULT}
          >
              {word.key}
              <Button onClick={() => this.delete(page, word.id)}>X</Button>
          </Tag>);

    return (
        <Row>
          <Col xs={8}>
            {wordsList}
            <Pager>
                <Pager.Item
                    href="#"
                    disabled={page === 0}
                    onClick={() => {
                        this.handleFetchStopWords(page-1);
                    }}>
                    Previous
                </Pager.Item>
                <Pager.Item
                    href="#"
                    onClick={() => this.handleFetchStopWords(page+1)}>
                    Next
                </Pager.Item>
            </Pager>
          </Col>
        </Row>
    );
  }


   delete = (page, word_id) => {
    const {deleteWords} = this.props;
    console.log(page, word_id);
    deleteWords(page, word_id);
   };

    handleFetchStopWords = page => {
      const {fetchWords} = this.props;

      fetchWords(page);
    };
}

export default ListWords;
