import React from 'react';

const SearchListItem = (props) => {
    const { searchResult } = props;
    // const vid = `https://www.youtube.com/embed/${searchResult.id.videoId}`
    // const video = 'http://www.youtube.com/embed/ygfXKbcW8wQ?rel=0&autohide=0&#8243'

    
    return (
        <li className="list-group-item search-item">{searchResult.snippet.title}</li>
    )
};

export default SearchListItem;