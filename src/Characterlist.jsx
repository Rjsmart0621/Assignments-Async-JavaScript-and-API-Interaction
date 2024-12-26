//Exercise 2 Solution 

import React, { useState } from 'react';
import axios from 'axios';
import { useEffect} from 'react';
import PropTypes from 'prop-types';


const CharacterList = ({ handleCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [currentLetter, setCurrentLetter] = useState('A');
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [isRefreshing, setRefresh] = useState(false);
    const [error, setError] = useState('');
    const publicKey = '4d52fb3fa1ef52af3d6b38218aff5477'
    const hash = 'a80ea7d0806646c1f3b6bf37422fc6fd'

    const nextLetter = (letter) => {
        return String.fromCharCode(letter.charCodeAt(0) + 1);
    };

    const fetchTotalCharacters = async () => {
        try {
            const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`);
                setCharacters (response.data.data.results);
        } catch (error) {
            console.error('Error fetching total characters:', error);
            return 0;
        }
    };


    useEffect(() => {
        fetchTotalCharacters()
    }, [currentLetter]);

    return (
        <div className='charactersList'>
            <h2 className='title'>Characters Starting with {currentLetter}</h2>
            {noResultsMessage && <p className='noResultsMessage'>{noResultsMessage}</p>}
            <ul className='charactersContainer'>
                {characters && characters.map(character => {
                    return (
                        <li key={character.id} onClick={() => handleCharacterSelect(character)}>
                            <img className='imgThumbnail' src={`${character.thumbnail.path}.${character.thumbnail.extension}`.replace('http', 'https')} alt={character.name} />
                            <h3 className='characterName'>{character.name}</h3>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
};

CharacterList.propTypes = {
    handleCharacterSelect: PropTypes.func.isRequired
};

export default CharacterList;