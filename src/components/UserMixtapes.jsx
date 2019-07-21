import React from 'react';
import { Link } from "react-router-dom";

const UserMixtapesList = (props) => {
    const { searchResults, userPlaylists, pageRefresh } = props;
    console.log(props);
    return (
        <ul className="list-group col-12 mx-auto my-mixtape-list">
            <li className="list-group-item active  border border-info bg-info">My Mixtapes:</li>
            {userPlaylists.map(playlist => {
                return (<li className="list-group-item" onClick={pageRefresh} >
                    <Link to={`/mixtape-player?id=${playlist._id}`} className="navbar-brand" >{playlist.tapeLabel}</Link>
            </li>) })}
        </ul>
    )
}


export default UserMixtapesList;