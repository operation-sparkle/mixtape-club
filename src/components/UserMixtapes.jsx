import React from 'react';
import { Link } from "react-router-dom";

const UserMixtapesList = (props) => {
    const { searchResults, userPlaylists, userName, pageRefresh } = props;
    
    return (
        <ul className="list-group col-12 mx-auto my-mixtape-list">
            <li className="list-group-item active  border border-info bg-info">My Mixtapes:</li>
            {userPlaylists.map((playlist, i) => {
                return (<li className="list-group-item" key={i} onClick={pageRefresh} >
                    <Link to={`/mixtape-player?id=${playlist._id}`} className="navbar-brand  user-mixes" >{playlist.tapeLabel} {userName !== '' ? `by ${userName}` : null}</Link>

            </li>) })}
        </ul>
    )
}


export default UserMixtapesList;