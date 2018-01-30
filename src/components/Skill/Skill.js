import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListSkills from "./components/ListSkills";
import SkillAdd from "./components/SkillAdd";



class Skill extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    addSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
  };

  render() {
    const {skills, addSkill, deleteSkill} = this.props;
     return (
      <div>
        <br />
        <SkillAdd addSkill={addSkill}/>
        <ListSkills
          skills={skills}
          deleteSkill={deleteSkill}
        />
      </div>
    );
  }
}

export default Skill;

