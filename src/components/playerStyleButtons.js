// PlayerStyleButtons.js

import React from 'react';
import { svgIcons } from './svgIcons';

const PlayerStyleButtons = ({ handlePlayerStyleChange }) => {
    const ariaLabels = [
        'Original',
        'Rounded',
        'Box',
        'Box Rounded',
        'Play',
        'Play Rounded'
    ];

    return (
        <fieldset className="player-style-buttons">
            <legend className='block-sidebar-legend'>Style</legend>
            {svgIcons.map((icon, index) => (
                <button
                    key={index}
                    aria-label={ariaLabels[index]}
                    onClick={() => handlePlayerStyleChange(`style${index + 1}`)}
                    className="player-style-button"
                    dangerouslySetInnerHTML={{ __html: icon }} // Directly set the SVG as inner HTML
                />
            ))}
        </fieldset>
    );
};

export default PlayerStyleButtons;
