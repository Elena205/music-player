import React from 'react';
import MusicListItem from '../components/musiclistitem';

function MusicList(props) {
    const numbers = props.musiclist;
    const listEle=numbers.map((item) =>
        <MusicListItem 
            key={item.id}
            musicItem={item}
            focus={item === props.currentMusicItem}
        >
            {item.title}
        </MusicListItem>
    );
    return (
        <ul>
            {listEle}
        </ul>
    );
}

export default MusicList;