import React from 'react';

const SearchListItem = (props) => {
    const { searchResult } = props;
    return (
        <li className="list-group-item search-item">{searchResult.snippet.title}</li>
    )
};

export default SearchListItem;