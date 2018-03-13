import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListDirections from "./components/ListDirections";

class Directions extends Component {
    static propTypes = {
        dirs: PropTypes.array.isRequired,
        fetchDirections: PropTypes.func.isRequired,
        sendAddedDirection: PropTypes.func.isRequired,
        editDirection: PropTypes.func.isRequired,
        deleteDirection: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { fetchDirections, dirs } = this.props;
        if (!dirs.length)
            fetchDirections();
    }

    render() {
        const {dirs, fetchDirections, sendAddedDirection, deleteDirection, editDirection} = this.props;

        return (
            <div>
                <h2>Directions</h2>
                <ListDirections
                    dirs={dirs}
                    fetchDirections={fetchDirections}
                    deleteDirection={deleteDirection}
                    editDirection={editDirection}
                    sendAddedDirection={sendAddedDirection}
                />
            </div>
        );
    }
}

export default Directions;

