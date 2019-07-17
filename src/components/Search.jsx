import React from 'react';
const Search = (props) => {
    const {onChange, onSearch} = props;
    return (
        <nav className="navbar navbar-light bg-light search">
            <form className="form-inline">
                <input className="form-control mr-sm-2" onChange={onChange} type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={onSearch}>Search</button>
            </form>
        </nav>
    )
};

export default Search;