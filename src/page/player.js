import React from 'react';
import $ from 'jquery';
import Progress from '../components/progress';
import '../css/player.less';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            progress: 0,
            duration: 0,
            barColor:'#c9f',
            volume: 0,
            isPlay: true,
            leftTime: '',
        };
    };
    progressChangeHandler(progress){
        let player=$('#player')[0];
        player.currentTime=this.state.duration * progress;
    };
    changeVolumeHandler(progress){
        this.setState({
            volume: progress * 100,
        });
        $('#player')[0].volume=progress;
    };
    play(){
        let player=$('#player')[0];
        let imgAnimation = this.refs.imgAnimation;
        if(this.state.isPlay){
            player.pause();
            imgAnimation.style= 'animation-play-state: paused';
        }else{
            player.play();
            imgAnimation.style='animation-play-state: running';
        }
        this.setState({
            isPlay:!this.state.isPlay
        });
    };
    playNext(){
        Pubsub.publish('PLAY_NEXT');
    };
    playPrev(){
        Pubsub.publish('PLAY_PREV');
    };
    changeRepeat(){
        Pubsub.publish('CHANGE_REPEAT');
    };
    formattime(time){
        if(time){
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}`:seconds;
        return `-${minutes}:${seconds}`;
        }
    };
    componentDidMount(){
        $('#player').bind('timeupdate', (e) => {
            let percent = Math.floor(100 * (e.target.currentTime / e.target.duration));
            this.setState({
                volume: e.target.volume * 100,
                progress: percent,
                duration: e.target.duration,
                leftTime:this.formattime(this.state.duration * (1-e.target.currentTime / e.target.duration))
            });
        });
    };
    componentWillUnmount(){
        $('#player').unbind('timeupdate');
    };
    render(){
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">My Favorite Music &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top:5,left:5}}></i>
                                <div className="volume-wrapper">
                                <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler.bind(this)} barColor="#aaa"/>
                                </div>
                            </div>
                        </div>
                        <div style={{height:10,lineHeight:'10px',marginTop:'10px'}}>
                            <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)} barColor={this.state.barColor}/>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                                <i className={`icon m120 ${this.state.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}></i>
                                <i className="icon next m120" onClick={this.playNext.bind(this)}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img ref="imgAnimation" src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;