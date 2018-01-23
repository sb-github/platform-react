import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Glyphicon, Row, Col, InputGroup, FormGroup, FormControl, Button } from 'react-bootstrap';

class ListCrawlers extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired
  };

  render() {

    const { crawlers } = this.props;

    const crawlersList = crawlers.map(crawler => <tr>
      <td>{crawler.id}</td>
      <td>{crawler.word}</td>
      <td>{crawler.date}</td>
      <td>{crawler.status}</td>
      <td>
        <Button>
          View
        </Button>
      </td>
    </tr>);

    return (
      <Row>
        <Col xs={5}>
       <Table responsive>
         <thead>
           <tr>
             <th>ID crawler</th>
             <th>Search word</th>
             <th>Run date</th>
             <th>Status</th>
             <th>View result</th>
           </tr>
         </thead>
         <tbody>
          { crawlersList }
         </tbody>
       </Table>
        </Col>
      </Row>
    );
  }

  handleClick = () => {
    const {runCrawler} = this.props;

    runCrawler(this.state.text);
  };
}

export default ListCrawlers;

