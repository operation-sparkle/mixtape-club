import React from 'react';

const SearchListItem = (props) => {
    const { searchResult, onResultClick } = props;
   
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    let title = escapeRegExp(searchResult.snippet.title);

    return (
        <li onClick={()=>{onResultClick(searchResult)}} className="list-group-item search-item">{title}</li>
    )
};

export default SearchListItem;