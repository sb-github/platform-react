import React, {Component} from "react";
import PropTypes from 'prop-types';
import { ButtonGroup, Icon, Intent,Position,Popover,PopoverInteractionKind,Button } from "@blueprintjs/core";

class SelectMenu extends Component {
  static propTypes = {
    addStopWord: PropTypes.func.isRequired,
    addNewSkill: PropTypes.func.isRequired
  };

  render() {
    const { addStopWord, addNewSkill } = this.props;
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        popoverClassName="pt-popover-content-sizing"
        position={Position.LEFT}
      >
        <Icon intent={Intent.PRIMARY} iconName = 'pt-icon-export' />
        <ButtonGroup minimal={true} large={true}>
          <Button onClick={addStopWord} className="pt-intent-danger">Stop words</Button>
          <Button onClick={addNewSkill} className="pt-intent-success">Skill</Button>
        </ButtonGroup>
      </Popover>
    );
  }
}

export default SelectMenu;