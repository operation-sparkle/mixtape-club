import React from 'react';

const SearchListItem = (props) => {
    const { searchResult, onResultClick } = props;
   
    let title = searchResult.snippet.title.replace(/&amp;/g, '&');
    title = title.replace(/&#39;/g,'\'');
    return (
        <li onClick={()=>{onResultClick(searchResult)}} className="list-group-item search-item">{title}</li>
    )
};

export default SearchListItem;