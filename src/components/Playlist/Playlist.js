import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css'

class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    
    render() {
        return (
            <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
            <TrackList 
                name={this.props.playlistName} 
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemove={true}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        );
    }
}

export default Playlist;