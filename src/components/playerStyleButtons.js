// PlayerStyleButtons.js

import React from 'react';
import { svgIcons } from './svgIcons';

const PlayerStyleButtons = ({ handlePlayerStyleChange, color, textColor }) => {
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
            {svgIcons.map((icon, index) => {
                const svgIcon = icon.replace(/{{playBackground}}/g, color).replace(/{{playIcon}}/g, textColor);
                return (
                    <button
                        key={index}
                        aria-label={ariaLabels[index]}
                        onClick={() => handlePlayerStyleChange(`style${index + 1}`)}
                        className="player-style-button"
                        dangerouslySetInnerHTML={{ __html: svgIcon }} // Directly set the SVG as inner HTML
                    />
                );
            })}
        </fieldset>
    );
};

export default PlayerStyleButtons;
