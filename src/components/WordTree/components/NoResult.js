import React, {Component} from "react";
import PropTypes from 'prop-types';
import { NonIdealState } from "@blueprintjs/core";

class NoResult extends Component {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string.isRequired
  };

  render() {
    const {desc, title, icon} = this.props;

    return (
      <NonIdealState
        visual={icon || "search"}
        title={title || "No search results"}
        description={desc}
      />
    );
  }
}

export default NoResult;