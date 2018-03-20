import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {sortByKey} from '../../../utils/sorting';
import { Table, Input, Button, Icon, Divider, Modal, Row, Col, Alert, Popover, Tooltip, Progress, Timeline} from 'antd';
import { DatePicker } from 'antd';
import style from './style.css';
import dateFormat from 'dateformat';
import Runner from './Runner';
import Merge from './Merge';
import CrawlerStatus from './CrawlerStatus';
const { RangePicker } = DatePicker;
const {Column} = Table;

class ListCrawlers extends Component {
  static propTypes = {
    crawlers: PropTypes.array,
    skills: PropTypes.array,
    page: PropTypes.number,
    fetchResultCrawler: PropTypes.func.isRequired,
    mergeGraph: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    setCrawler: PropTypes.func.isRequired,
    runCrawler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      crawlers: sortByKey(this.props.crawlers || [],'createdDate', 'descend'),
      pagination: {},
      ownFilters: [{
        type: 'searchCondition',
        filtered: false,
        applyFilter: (array) => this.searchFilter('', 'searchCondition', array)
      }, {
        type: 'createdDate',
        filtered: false,
        applyFilter: (array) => this.datesFilter([''], 'createdDate', array)
      }, {
        type: 'modifiedDate',
        filtered: false,
        applyFilter: (array) => this.datesFilter([''], 'modifiedDate', array)
      }
      ],
      visibleSearch: false,
      textSearch: '',
      filters: {

      },
      loading: false,
      selectedRow: '',
      steps: [
        {
          desc: 'Preparing to start crawler',
          done: true
        }, {
          desc: 'Executing parser of vacancies',
          done: true
        }, {
          desc: 'Making graph skills',
          done: false
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.crawlers !== this.props.crawlers) {
      const newCrawlers = sortByKey(
        this.props.crawlers || [],
        'createdDate', 'ascend'
      );
      this.setState({
        crawlers: newCrawlers,
        filtered: newCrawlers
      });
    }
  }

  searchFilter = (text, field, array) => {
    const reg = new RegExp(text, 'gi');

    return array.filter(record => record[field].match(reg));
  };
  datesFilter = (dates, field, array) => {
    const begin = Date.parse(dates[0]);
    const end = Date.parse(dates[1]);

    return dates[0].length ? array.filter(item =>
      item[field] >= begin && item[field] <= end) : array;
  };
  filter = (array, filters) => {
    let result = array;

    for(let filter of filters)
      result = filter.applyFilter(result);

    return result;
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      loading: true
    });

    this.setState((prevState, props) => {
      const {crawlers, ownFilters} = prevState;
      const pager = { ...prevState.pagination };
      pager.current = pagination.current;
      const filtered = this.filter(crawlers, ownFilters);

      return {
        pagination: pager,
        crawlers: sortByKey(filtered, sorter.field, sorter.order),
        filters,
        sorter
      }
    });

    setTimeout(() => this.setState({
      loading: false
    }), 100)
  };

  handleInputChange = e => {
    this.setState({
      textSearch: e.target.value
    });
  };

  onRow = (record) => {
    return {
      onMouseEnter: () => {this.setState({selectedRow: record.id})}
    };
  };
  setSearchFilter = () => {
    const { textSearch } = this.state;

    this.setState({
      loading: true
    });

    this.setState(prevState => {
      return {
        ownFilters: prevState.ownFilters.map(item => item.type === 'searchCondition'
          ? {
            applyFilter: (array) => this.searchFilter(textSearch, 'searchCondition', array),
            type: 'searchCondition',
            filtered: !(textSearch === '')
          } : item),
        visibleSearch: false
      };
    });

    setTimeout(() => this.setState({
      loading: false
    }), 100);
  };
  setCreateDateFilter = (date, dateString) => {
    this.setState({
      loading: true
    });

    this.setState(prevState => {
      return {
        ownFilters: prevState.ownFilters.map(item => item.type === 'createdDate'
          ? {
            applyFilter: (array) => this.datesFilter(dateString, 'createdDate', array),
            type: 'createdDate',
            filtered: !(dateString[0] === '')
          } : item)
      };
    });

    setTimeout(() => this.setState({
      loading: false
    }), 100);
  };
  setModifyDateFilter = (date, dateString) => {
    this.setState({
      loading: true
    });

    this.setState(prevState => {
      return {
        ownFilters: prevState.ownFilters.map(item => item.type === 'modifiedDate'
          ? {
            applyFilter: (array) => this.datesFilter(dateString, 'modifiedDate', array),
            type: 'modifiedDate',
            filtered: !(dateString[0] === '')
          } : item)
      };
    });

    setTimeout(() => this.setState({
      loading: false
    }), 100);
  };

  handleFetchCrawlers = (params = {}) => {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    const {fetchCrawlers} = this.props;
    pagination.total = 20;

    this.setState({
      loading: false,
      pagination,
    });

    fetchCrawlers(params.page);
  };

  renderDates = (text, record) => {
    const date = <p>{dateFormat(text, "dd-mm-yyyy")}</p>;
    const time = <span>{dateFormat(text, "h:MM TT")}</span>;

    return !text ? (<a>
        <Icon type="minus" />
        <Icon type="minus" />
        <Icon type="minus" />
        <Icon type="minus" />
        <Icon type="minus" />
      </a>) : (<Tooltip trigger={'hover'} title={time}>
        {date}
      </Tooltip>);
  };
  renderID = (text, record) => {
    const len = text.length;
    const right = (len > 6) ? `...${text.slice(len - 5, len)}` : '';

    return (<Tooltip trigger={'hover'} title={text}>
      {`${text.slice(0,5)}${right}`}
    </Tooltip>);
  };

  render() {
    const filters = this.state.filters || {};
    const {textSearch, visibleSearch, ownFilters}  = this.state;
    const tableProps = {
      dataSource: this.filter(this.state.crawlers, ownFilters),
      bordered:true,
      title: () =>  <Row>
        <Col span={8}>
          <Runner runCrawler={this.props.runCrawler}/>
        </Col>
        <Col>
          <Icon
            type="rocket"
            style={{ margin:'3px', float:'right', fontSize: 28, color: '#08c' }} />
        </Col>
      </Row>,
      pagination: this.state.pagination,
      rowKey: record => record.id,
      loading: this.state.loading,
      onChange: this.handleTableChange,
      onRow: this.onRow
    };
    const suffix = textSearch
      ? <Icon type="close-circle" onClick={() => {
        this.searchInput.focus();
        this.setState({ textSearch: '' });
      }} />
      : null;

    return (
      <Table {...tableProps}>
        <Column
          title="ID crawler"
          dataIndex="id"
          key="id"
          render={this.renderID}
          sorter={true}
        />
        <Column
          title="Search condition"
          dataIndex="searchCondition"
          key="searchCondition"
          sorter={true}
          filterDropdown={(
            <div>
              <div className="custom-filter-dropdown">
                <Input
                  ref={ele => this.searchInput = ele}
                  placeholder="Search"
                  suffix={suffix}
                  value={textSearch || ''}
                  onChange={this.handleInputChange}
                  onPressEnter={this.setSearchFilter}
                  addonAfter={<a onClick={this.setSearchFilter}>OK</a>}
                />
              </div>
            </div>
          )}

          filterDropdownVisible={visibleSearch || false}
          filterIcon={<Icon type="search" style={{ color: textSearch !== '' ? '#108ee9' : '#aaa' }}  />}
          onFilterDropdownVisibleChange={visible => {
            this.setState({
              visibleSearch: visible
            }, () => this.searchInput && this.searchInput.focus());
          }}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          sorter={true}
          render={(text, record) =>
            <CrawlerStatus
              crawler={record}
              steps={this.state.steps}
              selectedRow={this.state.selectedRow}
            />
          }
          filters={[
            { text: 'In progress', value: 'in progress' },
            { text: 'Done', value: 'done' },
            { text: 'Old', value: 'old' },
            { text: 'Fail', value: 'fail'}
          ]}
          filteredValue={filters.status || null}
          onFilter={(value, record) => record.status.toLowerCase() === value}
        />
        <Column
          title="Run date"
          dataIndex="createdDate"
          render={this.renderDates}
          sorter={true}
          filterDropdown={(
            <div className="custom-filter-dropdown">
              <RangePicker
                format="YYYY-MM-DD"
                placeholder={['Start Date', 'End Date']}
                onChange={this.setCreateDateFilter}
              />
            </div>
          )}
          filterIcon={<Icon
            type="clock-circle-o"
            style={{ color:
              ownFilters.find(item => item.type === 'createdDate').filtered
                ? '#108ee9' : '#aaa' }}
          />}
        />
        <Column
          title="Modified date"
          dataIndex="modifiedDate"
          render={this.renderDates}
          sorter={true}
          filterDropdown={(
            <div className="custom-filter-dropdown">
              <RangePicker
                format="YYYY-MM-DD"
                placeholder={['Start Date', 'End Date']}
                onChange={this.setModifyDateFilter}
              />
            </div>
          )}
          filterIcon={<Icon
            type="clock-circle-o"
            style={{ color:
              ownFilters.find(item => item.type === 'modifiedDate').filtered
                ? '#108ee9' : '#aaa' }}
          />}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              {
                record.status === 'done' || record.status === 'old'
                  ? <span>
                        <a
                         onClick={() => this.showResultCrawler(record.id)}>
                          Show results
                        </a>
                      <Divider type="vertical" />
                      <Merge
                        skills={this.props.skills}
                        mergeGraph={this.props.mergeGraph}
                        fetchSkills={this.props.fetchSkills}
                      />
                  </span> : <span>
                    <a>
                      <Icon type="minus" />
                      <Icon type="minus" />
                      <Icon type="minus" />
                      <Icon type="minus" />
                      <Icon type="minus" />
                    </a>
                    <Divider type="vertical" />
                    <a>
                      <Icon type="minus" />
                      <Icon type="minus" />
                      <Icon type="minus" />
                    </a>
                  </span>
              }
            </span>
          )}
        />
      </Table>
    );
  }

  showResultCrawler = id_crawler => {
    const {fetchResultCrawler, setCrawler} = this.props;
    setCrawler(id_crawler);
    fetchResultCrawler(id_crawler, 1);
  };
}

export default ListCrawlers;

