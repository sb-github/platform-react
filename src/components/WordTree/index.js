import WordTree from './WordTree';
import {fetchNewSkills} from './treeActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchResultCrawler } from "../Crawler/crawlerActions";

const mapStateToProps = state => {
  const { treeInfo } = state;

  return {
    nodes: treeInfo.nodes,
    page: treeInfo.page,
    crawler_id: treeInfo.crawler_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSkills: bindActionCreators(fetchNewSkills, dispatch),
    fetchResultCrawler: bindActionCreators(fetchResultCrawler, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordTree);

