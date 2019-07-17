import React from 'react';

import PlaylistImageSelector from './PlaylistImageSelector.jsx';
import Search from './Search.jsx';
import SearchList from './SearchList.jsx';
import PlaylistBuilderList from './PlaylistBuilderList.jsx';

const CreateMixtapes = (props) => {
    const { searchResults, onSearch, onChange } = props;
    console.log(props);
    return (
        <div style={{marginTop: '4rem'}}>
            <PlaylistImageSelector />
            <Search onSearch={onSearch} onChange={onChange} />
            <SearchList searchResults={searchResults} />
            <PlaylistBuilderList />
            <div>Create Mixtapes Component</div>
        </div>
    )
}

export default CreateMixtapes;