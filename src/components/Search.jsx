import React from 'react';
const Search = (props) => {
    const {onChange, onSearch} = props;
    return (
        <div className="navbar navbar-light rounded-lg search d-flex justify-content-md-end">
            <input onChange={onChange} style={{maxWidth: "380px"}} className="form-control mr-sm-2 col-9" type="text" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-light border border-info my-2 my-sm-0 col-3" style={{ color: '#17a2b8'}} type="submit" onClick={onSearch}>Search</button>
        </div>
    )
};

export default Search;