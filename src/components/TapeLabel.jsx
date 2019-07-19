import React from 'react';

const TapeLabel = (props) => {
    const { onLabelChange } = props;
    
    return (
        <div className="navbar navbar-light bg-light search">
            <input onChange={onLabelChange} style={{ maxWidth: "380px" }} className="form-control mr-sm-2" type="text" placeholder="Label Your Tape" aria-label="Label Your Tape" />
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Save Tape</button>
        </div>
    )
}

export default TapeLabel;