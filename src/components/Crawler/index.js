import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runCrawler, fetchResultCrawler, fetchCrawlers } from "./crawlerActions";
import { fetchNewSkills } from "../WordTree/treeActions";
import Crawler from "./Crawler";

const mapStateToProps = state => {
  const { crawlersInfo, tree } = state;

  return {
    crawlersInfo,
    tree
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch),
    fetchNewSkills: bindActionCreators(fetchNewSkills, dispatch),
    fetchResultCrawler: bindActionCreators(fetchResultCrawler, dispatch),
    fetchCrawlers: bindActionCreators(fetchCrawlers, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crawler);