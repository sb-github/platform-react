import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListSkills from "./components/ListSkills";

class Skill extends Component {
    static propTypes = {
        skills: PropTypes.array.isRequired,
        fetchSkills: PropTypes.func.isRequired,
        sendAddedSkill: PropTypes.func.isRequired,
        editSkill: PropTypes.func.isRequired,
        deleteSkill: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { fetchSkills, skills } = this.props;
        if (!skills.length)
            fetchSkills();
    };

    render() {
        const {skills, sendAddedSkill, deleteSkill, editSkill, fetchSkills} = this.props;
        return (
            <div>
                <h2>Skills</h2>
                <ListSkills
                    skills={skills}
                    deleteSkill={deleteSkill}
                    editSkill={editSkill}
                    fetchSkills={fetchSkills}
                    sendAddedSkill={sendAddedSkill}
                />
            </div>
        );
    }
}

export default Skill;

