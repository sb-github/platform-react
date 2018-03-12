import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Divider } from 'antd';


class ListWords extends Component {
  static propTypes = {
    words: PropTypes.array,
    fetchWords: PropTypes.func.isRequired,
    deleteWords: PropTypes.func.isRequired,
  };

  render() {

    const words = this.props.words || [];
    const data = words.map(word => [{
        id: word.id,
        title: word.title,
        crawler_id: word.crawler_id,
    }]);
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
    },    {
        title: 'Word',
        dataIndex: 'title',
    }, {
        title: 'Crawler',
        dataIndex: 'crawler_id',
    }, {
        title: 'Action',
        key: 'action',
        render: (id) => (
            <span>
                <a href="#">ad</a>
                <Divider type="vertical" />
                <a href="#" onClick={() => this.delete(id)}>Delete</a>
                <Divider type="vertical" />
                <a href="#" className="ant-dropdown-link">
                    More actions <Icon type="down" />
                </a>
            </span>
        ),
    }];
     <Table dataSource={data}
            columns={columns}/>
  }
   delete = word_id => {
    const {deleteWords} = this.props;
    deleteWords(word_id);
   };
}

export default ListWords;
