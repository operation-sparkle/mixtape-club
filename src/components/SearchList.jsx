import React from 'react';
import SearchListItem from './SearchListItem.jsx';

const SearchList = (props) => {
    const { searchResults } = props;
    return (
        <ul className="list-group col-sm-10 col-md-8 search-list">
            <li className="list-group-item active bg-info">Top Results:</li>
            {searchResults.map((searchResult, i) => <SearchListItem searchResult={searchResult} key={i}/>)}
        </ul>
    )
};

export default SearchList;