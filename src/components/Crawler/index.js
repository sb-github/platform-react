import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runCrawler, fetchResultCrawler, fetchCrawlers,setCrawler } from "./crawlerActions";
import { fetchNewSkills } from "../WordTree/treeActions";
import Crawler from "./Crawler";

const mapStateToProps = state => {
  const { crawlersInfo, treeInfo } = state;

  return {
    crawlersInfo,
    treeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch),
    fetchNewSkills: bindActionCreators(fetchNewSkills, dispatch),
    fetchResultCrawler: bindActionCreators(fetchResultCrawler, dispatch),
    fetchCrawlers: bindActionCreators(fetchCrawlers, dispatch),
    setCrawler: bindActionCreators(setCrawler, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crawler);