import React, { useState, useEffect } from 'react';
import { svgIcons } from './svgIcons';

const PlayButtonPresets = ({ handlePlayerStyleChange, initialStyleIndex }) => {
    const color = '#3c3c3c'; // Black
    const textColor = '#FFFFFF'; // White

    const ariaLabels = [
        'Original',
        'Rounded',
        'Box',
        'Box Rounded',
        'Play',
        'Play Rounded'
    ];

    const [activeIndex, setActiveIndex] = useState(initialStyleIndex);

    // Update activeIndex when initialStyleIndex changes
    useEffect(() => {
        console.log('Initial Style Index:', initialStyleIndex);
        setActiveIndex(initialStyleIndex);
    }, [initialStyleIndex]);

    return (
        <fieldset className="player-style-buttons">
            <legend className='block-sidebar-legend'>Style</legend>
            {svgIcons.map((icon, index) => {
                const svgIcon = icon.replace(/{{playBackground}}/g, color).replace(/{{playIcon}}/g, textColor);
                const isActive = index == activeIndex; // Check if the button is active
                return (
                    <button
                        key={index}
                        aria-label={ariaLabels[index]}
                        onClick={() => {
                            handlePlayerStyleChange(`style${index + 1}`);
                            setActiveIndex(index); // Update active index
                        }}
                        className={`player-style-button ${isActive ? 'active' : ''}`} // Add 'active' class if the button is active
                        dangerouslySetInnerHTML={{ __html: svgIcon }} // Set the SVG as inner HTML
                    />
                );
            })}
        </fieldset>
    );
};

export default PlayButtonPresets;