import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchSkills, sendAddedSkill, deleteSkill, editSkill} from "./skillActions";
import Skill from "./Skill";

const mapStateToProps = state => {
    const { skills } = state;
    return {
        skills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSkills: bindActionCreators(fetchSkills, dispatch),
        sendAddedSkill: bindActionCreators(sendAddedSkill, dispatch),
        editSkill: bindActionCreators(editSkill, dispatch),
        deleteSkill: bindActionCreators(deleteSkill, dispatch)
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Skill);