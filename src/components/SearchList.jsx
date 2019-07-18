import React from 'react';
import SearchListItem from './SearchListItem.jsx';
import YouTube from 'react-youtube';

const SearchList = (props) => {
    const { searchResults, onPlayVideo , onReady} = props;
    
    const divStyle = {
        opacity: 0,
    }
    
    return (
        <div> 
            <div style={divStyle}>
            <YouTube videoId='4D2qcbu26gs' onReady={onReady}/>
            </div>
            <button onClick={onPlayVideo}>Play</button>
        <ul className="list-group col-sm-10 col-md-8 search-list">
            <li className="list-group-item active bg-info">Top Results:</li>
            {searchResults.map((searchResult, i) => <SearchListItem searchResult={searchResult} key={i}/>)}
        </ul>
        </div>
    )
};

export default SearchList;