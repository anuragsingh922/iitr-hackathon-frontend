import React, { Component } from "react";
import classes from "./playAudio.module.css";
import song from "./audio.mp3";
import particlesImg from "./particlesImg.png";
import particles from "./particles.gif";

class PlayAudio extends Component {
    state = {
        audio: new Audio(song),
        isPlaying: false,
    };

    playPause = () => {
        let isPlaying = this.state.isPlaying;
        if (isPlaying) {
            this.state.audio.pause();
        }
        else {
            this.state.audio.play();
        }
        this.setState({ isPlaying: !isPlaying });
    };

    render() {
        return (
            <div className={classes.particlesDiv}>
                <img src={this.state.isPlaying ? particles : particlesImg} alt="particles" className={classes.particles} onClick={this.playPause} />
            </div>
        );
    }
}

export default PlayAudio;