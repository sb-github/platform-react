import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTable from "./components/ListDirections";
import DirsSender from './components/AddDirection';

class Directions extends Component {
  static propTypes = {
    sendDirs: PropTypes.func.isRequired,
    dirs: PropTypes.array.isRequired,
    fetchDirs: PropTypes.func.isRequired,
    deleteDirs: PropTypes.func.isRequired,
    editDirs: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { fetchDirs } = this.props;

     fetchDirs();
  }

  render() {
    const {dirs, fetchDirs, sendDirs, deleteDirs, editDirs} = this.props;

    return (
      <div>
        <h2>Directions</h2>
        <EditableTable
          dirs={dirs}
          fetchDirs={fetchDirs}
          deleteDirs={deleteDirs}
          editDirs={editDirs}
          sendDirs={sendDirs}
        />
      </div>
    );
  }
}

export default Directions;

