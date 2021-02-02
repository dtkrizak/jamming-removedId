import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <ul>
                    {this.props.tracks.map(track => {
                        return (
                            <li key={track.id}>
                                <Track 
                                    track={track}
                                    onAdd={this.props.onAdd}
                                    onRemove={this.props.onRemove}
                                    isRemove={this.props.isRemove}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default TrackList;