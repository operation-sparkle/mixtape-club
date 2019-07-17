import React from 'react';
const Search = (props) => {
    const {onChange, onSearch} = props;
    return (
        <div className="navbar navbar-light bg-light search">
            <input onChange={onChange} style={{maxWidth: "380px"}} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={onSearch}>Search</button>
        </div>
    )
};

export default Search;