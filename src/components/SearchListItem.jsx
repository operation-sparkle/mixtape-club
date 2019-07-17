import React from 'react';

const SearchListItem = (props) => {
    const { searchResult } = props;
    return (
        <li className="list-group-item">{searchResult}</li>
    )
};

export default SearchListItem;