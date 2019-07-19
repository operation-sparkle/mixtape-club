import React from 'react';

import PlaylistImageSelector from './PlaylistImageSelector.jsx';
import Search from './Search.jsx';
import SearchList from './SearchList.jsx';
import PlaylistBuilderList from './PlaylistBuilderList.jsx';
import SearchPlayer from './SearchPlayer.jsx';

const CreateMixtapes = (props) => {
    const { searchResults, onSearch, onChange, onPlayVideo, onPauseVideo, onReady, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB, displayImageSelector, onSaveImage, onSavePlaylist } = props;
   
  
    return (
        <div style={{marginTop: '4rem'}}>
        {displayImageSelector ? <PlaylistImageSelector tapeImages={tapeImages} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onSaveImage={onSaveImage} /> :
        <div className="mx-auto" style={{maxWidth: '860px'}}>
            <Search onSearch={onSearch} onChange={onChange} />
            <SearchPlayer onPlayVideo={onPlayVideo} onReady={onReady} onPauseVideo={onPauseVideo} playing={playing} searchResults={searchResults} selectedResult={selectedResult} onPassToSideA={onPassToSideA} onPassToSideB={onPassToSideB} />
            <SearchList searchResults={searchResults} onResultClick={onResultClick}/>
            <PlaylistBuilderList builderImage={builderImage} tapeLabel={tapeLabel} sideA={sideA} sideB={sideB} onSaveImage={onSaveImage} onSavePlaylist={onSavePlaylist}/>
        </div>}
        </div>
    )
}

// <SearchList searchResults={searchResults} onPlayVideo={onPlayVideo} onReady={onReady} />

export default CreateMixtapes;