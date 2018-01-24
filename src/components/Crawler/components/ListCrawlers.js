import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {fetchWords} from "../wordActions";
import { Table, Row, Col, Button } from 'react-bootstrap';
import store from "../../../store";

class ListCrawlers extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired
  };

  render() {

    const { crawlers } = this.props;
    //console.log(crawlers);
    const crawlersList = crawlers.map(crawler => <tr>
      <td>{crawler.id}</td>
      <td>{crawler.searchCondition}</td>
      <td>{crawler.createdDate}</td>
      <td>{crawler.status}</td>
      <td>
        <Button onClick={() => this.handleResult(crawler.id)}>
          View
        </Button>
      </td>
      <td>
        <Button>
          Merge
        </Button>
      </td>
    </tr>);

    return (
      <Row>
        <Col xs={8}>
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

  handleResult = id_crawler => {
    store.dispatch(fetchWords(id_crawler));
  };
}

export default ListCrawlers;

