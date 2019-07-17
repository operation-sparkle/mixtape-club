import React from 'react';

const PlaylistBuilderList = () => {
    return (
        <div className="border border-info col-md-8 playlist-builder">
        <h3>Playlist Builder:</h3>
        <p>
            
            <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Show All Songs</button>
        </p>
        <div className="collapse" id="collapseExample">
            <div className="card card-body">
                    <ul className="list-group col-sm-10 col-md-8 search-list">
                        <li className="list-group-item">Song1</li>
                        <li className="list-group-item">Song2</li>
                        <li className="list-group-item">Song3</li>
                        <li className="list-group-item">Song4</li>
                    </ul>
            </div>
        </div>
    </div>
    )
}

export default PlaylistBuilderList;