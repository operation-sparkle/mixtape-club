import React from 'react';

const TapeLabel = (props) => {
    const { onLabelChange } = props;
    
    return (
        <div className="navbar navbar-light bg-light search">
            <input onChange={onLabelChange} style={{ maxWidth: "380px" }} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Save</button>
        </div>
    )
}

export default TapeLabel;