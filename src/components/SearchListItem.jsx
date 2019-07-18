import React from 'react';

const SearchListItem = (props) => {
    const { searchResult, onResultClick } = props;
 
    return (
        <li onClick={()=>{onResultClick(searchResult)}} className="list-group-item search-item">{searchResult.snippet.title}</li>
    )
};

export default SearchListItem;