import React from 'react';


const UserMixtapesList = (props) => {
    const { searchResults } = props;
    console.log(props);
    return (
        <ul className="list-group col-sm-10 col-md-8 search-list">
            <li className="list-group-item active bg-info">My Mixtapes:</li>
            
        </ul>
    )
}

// {searchResults.map((searchResult, i) => <SearchListItem searchResult={searchResult} key={i} />)}

export default UserMixtapesList;