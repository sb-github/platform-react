import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {runCrawler, fetchResultCrawler, fetchCrawlers, setCrawler, mergeGraph} from "./crawlerActions";
import {fetchSkills} from "../Skill/skillActions";
import { fetchNewSkills } from "../WordTree/treeActions";
import Crawler from "./Crawler";

const mapStateToProps = state => {
  const { crawlersInfo, treeInfo, skills } = state;

  return {
    crawlersInfo,
    treeInfo,
    skills
  };
};

const mapDispatchToProps = dispatch => {
  return {
    runCrawler: bindActionCreators(runCrawler, dispatch),
    fetchSkills: bindActionCreators(fetchSkills, dispatch),
    mergeGraph: bindActionCreators(mergeGraph, dispatch),
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