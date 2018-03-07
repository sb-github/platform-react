import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {sortByKey} from '../../../utils/sorting';
import { Table, Input, Button, Icon, Divider, Modal, Row, Col, Alert} from 'antd';
import { DatePicker } from 'antd';
import style from './style.css';
import dateFormat from 'dateformat';
import Runner from './Runner';
const { RangePicker } = DatePicker;
const {Column} = Table;

class ListCrawlers extends Component {
  static propTypes = {
    crawlers: PropTypes.array,
    page: PropTypes.number,
    fetchResultCrawler: PropTypes.func.isRequired,
    fetchCrawlers: PropTypes.func.isRequired,
    setCrawler: PropTypes.func.isRequired,
    runCrawler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      crawlers: [],
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
      }],
      visibleSearch: false,
      textSearch: '',
      filters: {

      },
      loading: false,
      searchText: null
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.crawlers !== this.props.crawlers)
      this.setState({
        crawlers: this.props.crawlers,
        filtered: this.props.crawlers
      });
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
      const {crawlers} = prevState;
      const pager = { ...prevState.pagination };
      pager.current = pagination.current;

      return {
        pagination: pager,
        crawlers: sortByKey(crawlers, sorter.field, sorter.order),
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

  render() {
    const filters = this.state.filters || {};
    const sorter = this.state.sorter || {};
    const {textSearch, visibleSearch, ownFilters}  = this.state;
    const tableProps = {
      dataSource: this.filter(this.state.crawlers, ownFilters),
      bordered:true,
      title: () =>  <Row>
        <Col span={8}>
          <Runner runCrawler={this.props.runCrawler}/>
        </Col>
        <Col>
          <Icon type="rocket" style={{float:'right', fontSize: 28, color: '#08c' }}></Icon>
        </Col>
      </Row>,
      rowKey: record => (record.registered),
      pagination: this.state.pagination,
      rowKey: record => record.registered,
      loading: this.state.loading,
      onChange: this.handleTableChange
    };

    return (
      <Table {...tableProps}>
        <Column
          title="ID crawler"
          dataIndex="id"
          key="id"
          render={(text, record) => {
            const len = text.length;
            const right = (len > 6) ? `...${text.slice(len - 6, len - 1)}` : '';
            return `${text.slice(0,5)}${right}`;
          }}
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
                  value={textSearch || ''}
                  onChange={this.handleInputChange}
                  onPressEnter={this.setSearchFilter}
                />
                <Button type="primary" onClick={this.setSearchFilter}>OK</Button>
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
          render={(text, record) => <Alert
            message={text}
            type={text.toLowerCase() === 'done'
              ? 'success' : (text.toLowerCase() === 'fail'
                ? 'error' : (text.toLowerCase() === 'in progress'
                    ? 'info'
                    : 'warning'
                  )
              )}
            showIcon
          />}
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
          render={(text, record) => dateFormat(text, "dd-mm-yyyy, h:MM TT")}
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
          render={(text, record) => dateFormat(text, "dd-mm-yyyy, h:MM TT")}
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
              <a href="#"
                 onClick={() => this.showResultCrawler(record.id)}>
                Show results
              </a>
              <Divider type="vertical" />
              <a href="#">Merge</a>
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

