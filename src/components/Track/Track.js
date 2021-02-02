import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.audioClip = React.createRef();
        this.state = {
            isPlaying: false
        }
    }

    renderAction(){
        if(this.props.isRemove) {
           return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    renderButton(){
        if (this.state.isPlaying) {
            return( 
                <button className="Pause" onClick={this.pause} >
                </button>
            );
        } else {
            return(
                <button className="Play" onClick={this.play} >
                </button>
            );
        }
    }

    play() {
        this.audioClip.current.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioClip.current.pause();
        this.setState({ isPlaying: false });
    }


    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div>
                    <audio
                        ref={this.audioClip}
                        id={this.props.track.id}
                        src={this.props.track.previewUrl}>
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    {this.renderButton()}
                </div>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
          
        );
    }
}

export default Track;