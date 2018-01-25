import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {fetchWords} from "../../WordTree/treeActions";
import { Table, Row,Pager, Col, Button } from 'react-bootstrap';
import { ButtonGroup, Classes, Icon, Intent,Position, Button as BlurButton,Popover,PopoverInteractionKind } from "@blueprintjs/core";


class ListCrawlers extends Component {
  static propTypes = {
    crawlers: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    fetchResultCrawler: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired
  };

  render() {

    const { page } = this.props;
    const crawlers = this.props.crawlers || [];
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
             <th>
               <Popover
                 interactionKind={PopoverInteractionKind.CLICK}
                 popoverClassName="pt-popover-content-sizing"
                 position={Position.TOP_RIGHT}
               >
                 <ButtonGroup minimal={true}>
                   <BlurButton className="pt-intent-primary">Run crawler</BlurButton>
                 </ButtonGroup>
                 <div>
                   <label className={Classes.LABEL}>
                     Enter search text

                     <div class="pt-input-group .modifier">
                       <span class="pt-icon pt-icon-search"></span>
                       <input type="text" class="pt-input" placeholder="Search" />
                     <button class="pt-button pt-minimal pt-intent-primary pt-icon-arrow-right"></button>
                 </div>
                   </label>
                 </div>
               </Popover>
             </th>
           </tr>
         </thead>
         <tbody>
          { crawlersList }
         </tbody>
       </Table>
          <Pager>
            <Pager.Item
              href="#"
              disabled={page === 1}
              onClick={() => this.handleFetchCrawlers(page-1)}>
              Previous
            </Pager.Item>
            <Pager.Item
              href="#"
              onClick={() => this.handleFetchCrawlers(page+1)}>
              Next
            </Pager.Item>
          </Pager>
        </Col>
      </Row>
    );
  }

  handleResult = id_crawler => {
    const {fetchResultCrawler} = this.props;

    fetchResultCrawler(id_crawler);
  };

  handleFetchCrawlers = page => {
    const {fetchCrawlers} = this.props;

    fetchCrawlers(page);
  };
}

export default ListCrawlers;

