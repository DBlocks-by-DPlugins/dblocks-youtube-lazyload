// PlayerStyleButtons.js

import React from 'react';
import { svgIcons } from './svgIcons';

const PlayerStyleButtons = ({ handlePlayerStyleChange }) => {
    return (
        <fieldset className="player-style-buttons">
            <legend className='block-sidebar-legend'>Play Icon</legend>
            {svgIcons.map((icon, index) => (
                <button
                    key={index}
                    aria-label={`Style ${index + 1}`}
                    onClick={() => handlePlayerStyleChange(`style${index + 1}`)}
                    className="player-style-button"
                    dangerouslySetInnerHTML={{ __html: icon }} // Directly set the SVG as inner HTML
                />
            ))}
        </fieldset>
    );
};

export default PlayerStyleButtons;
