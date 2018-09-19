import React from 'react';
import $ from 'jquery';
import Header from './components/header';
import Player from './page/player';
import {Router,Route} from 'react-router-dom';
import {MUSIC_LIST} from './song/musiclist';
import {randomRange} from './page/util';
import MusicList from './page/musiclist';
import Pubsub from 'pubsub-js';
import createHistory from 'history/createHashHistory';

const history = createHistory();
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            musiclist: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            repeatType: 'cycle',
        };
    };
    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex = randomRange(0,this.state.musiclist.length - 1);
            while (randomIndex === index) {
                randomIndex = randomRange(0,this.state.musiclist.length - 1);
            }
            this.playMusic(this.state.musiclist[randomIndex]);
        }else if(this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        }else{
            this.playNext();
        }
    };
    playMusic(musicItem) {
        let player=$('#player')[0];
        player.src=musicItem.file;
        player.play();
        this.setState({
            currentMusicItem:musicItem
        });
    };
    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musiclist.length;
        if(type === 'next'){
            newIndex=(index + 1) % musicListLength;
        }else{
            newIndex=(index + 1 + musicListLength) % musicListLength
        }
        this.playMusic(this.state.musiclist[newIndex]);
    };
    findMusicIndex(musicItem) {
        return this.state.musiclist.indexOf(musicItem);
    };
    componentDidMount() {
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind('ended',(e)=>{
            this.playWhenEnd();
        });
        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) => {
            this.setState({
                musiclist:this.state.musiclist.filter(item => (item!==musicItem))
            });
        });
        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) => {
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('CHANGE_REPEAT',() => {
            let repeatList = ['cycle','once','random'];
            let index =repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
        Pubsub.subscribe('PLAY_NEXT',(msg,musicItem) => {
            this.playNext();
        });
        Pubsub.subscribe('PLAY_PREV',(msg,musicItem) => {
            this.playNext();
        });
    };
    componentWillMount() {
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('CHANGE_REPEAT');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('PLAY_PREV');
        $('#player').unbind('ended');
    };
    render() {
        const Home=()=>(
            <Player 
                currentMusicItem={this.state.currentMusicItem}
                repeatType={this.state.repeatType}
            >
            </Player>
        );
        const List=()=>(
            <MusicList
                currentMusicItem={this.state.currentMusicItem}
                musiclist={this.state.musiclist} 
                >
            </MusicList>
        );
        return (
            <Router history={history}>
                <div>
                    <Header/>
                    <audio id="player"></audio>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/list" component={List}></Route>
                </div>
            </Router>  
        );
    };
};

export default Main;