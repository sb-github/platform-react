import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListDirs from "./components/list";
import DirsSender from './components/send';

class Directions extends Component {
  static propTypes = {
    sendDirs: PropTypes.func.isRequired,
    dirs: PropTypes.array.isRequired,
    fetchDirs: PropTypes.func.isRequired,
    delDirs: PropTypes.func.isRequired,
    editDirs: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { fetchDirs } = this.props;

     fetchDirs();
  }

  render() {
    const {dirs, fetchDirs, sendDirs, delDirs, editDirs} = this.props;

    return (
      <div>
        <h2>Directions</h2>
        <DirsSender sendDirs={sendDirs}/>
        <ListDirs
          dirs={dirs}
          fetchDirs={fetchDirs}
          delDirs={delDirs}
          editDirs={editDirs}
        />
      </div>
    );
  }
}

export default Directions;

