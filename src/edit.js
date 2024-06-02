// Edit.js

import { useState, useEffect } from '@wordpress/element';
import {
    TextControl,
    SelectControl,
    PanelBody,
    ToolbarGroup,
    ToolbarButton,
} from '@wordpress/components';
import { BlockControls, InspectorControls, useBlockProps, PanelColorSettings } from '@wordpress/block-editor';
import PlayContent from './components/playContent';
import { qualityOptions, defaultQuality } from './components/qualitySettings';
import PlayerStyleButtons from './components/PlayerStyleButtons';
import { extractYoutubeId } from './components/youtubeHelpers';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const {
        url = '',
        quality = defaultQuality,
        playButtonSize = '100px',
        minHeight = '100px',
        playButtonStyle = 0,
        color = '#800080',
        textColor = '#FFFFFF',
    } = attributes;
    let { containerId } = attributes;
    const [isEditing, setIsEditing] = useState(!url);

    useEffect(() => {
        if (!containerId) {
            const newContainerId = `youtube-container-${Math.floor(Math.random() * 1000000)}`;
            setAttributes({ containerId: newContainerId });
        }

        const fetchGlobalSettings = async () => {
            try {
                const response = await fetch('/wp-json/dblocks-youtube-lazyload/v1/global-settings');
                if (!response.ok) throw new Error('Network response was not ok.');

                const settings = await response.json();
                setAttributes({
                    color: settings.color,
                    textColor: settings.textColor,
                    quality: settings.quality,
                    playButtonSize: settings.playButtonSize,
                    playButtonStyle: settings.playButtonStyle,
                    minHeight: settings.minHeight,
                });
            } catch (error) {
                console.error('Failed to fetch global settings:', error);
            }
        };

        fetchGlobalSettings();
    }, [setAttributes]);

    const updateGlobalSetting = async (attribute, value) => {
        setAttributes({ [attribute]: value });

        try {
            const response = await fetch('/wp-json/dblocks-youtube-lazyload/v1/global-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wpApiSettings.nonce,
                },
                body: JSON.stringify({ [attribute]: value }),
            });

            if (!response.ok) throw new Error(`Network response was not ok when updating ${attribute}.`);
        } catch (error) {
            console.error(`Failed to update global ${attribute}:`, error);
        }
    };

    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    const handleQualityChange = (newQuality) => {
        updateGlobalSetting('quality', newQuality);
    };

    const handlePlayButtonSizeChange = (newSize) => {
        updateGlobalSetting('playButtonSize', newSize);
    };

    const handlePlayerStyleChange = (style) => {
        const styleIndex = parseInt(style.replace('style', ''), 10) - 1;
        updateGlobalSetting('playButtonStyle', styleIndex);
    };

    const handleColorChange = (colorValue) => {
        updateGlobalSetting('color', colorValue);
    };

    const handleTextColorChange = (colorValue) => {
        updateGlobalSetting('textColor', colorValue);
    };

    const youtubeId = extractYoutubeId(url);

    const renderPreview = () => (
        <div className="youtube-preview">
            <PlayContent
                url={url}
                quality={quality}
                playButtonSize={playButtonSize}
                playButtonStyle={playButtonStyle}
                color={color}
                textColor={textColor}
            />
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title="Thumbnail" initialOpen={true}>
                    <SelectControl
                        label="Image Quality"
                        value={quality}
                        options={qualityOptions}
                        onChange={handleQualityChange}
                    />
                </PanelBody>
                <PanelColorSettings
                    title="Color Settings"
                    colorSettings={[
                        {
                            value: textColor,
                            onChange: handleTextColorChange,
                            label: 'Play Color',
                        },
                        {
                            value: color,
                            onChange: handleColorChange,
                            label: 'Play Background Color',
                        },
                    ]}
                />
                <PanelBody title="Player Icon" initialOpen={true}>
                    <PlayerStyleButtons
                        handlePlayerStyleChange={handlePlayerStyleChange}
                        color={color}
                        textColor={textColor}
                    />
                    <SelectControl
                        label="Size"
                        value={playButtonSize}
                        options={[
                            { label: 'Small', value: '32px' },
                            { label: 'Medium', value: '64px' },
                            { label: 'Large', value: '100px' },
                        ]}
                        onChange={handlePlayButtonSizeChange}
                    />
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={isEditing ? 'edit' : 'visibility'}
                        label={isEditing ? 'Edit URL' : 'View Image'}
                        onClick={() => setIsEditing((current) => !current)}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div
                {...useBlockProps()}
                style={{
                    minHeight,
                    '--play-background': color,
                    '--play-icon-color': textColor,
                    '--play-button-size': playButtonSize,
                }}
            >
                {isEditing ? (
                    <div className="lazy-load-edit-wrapper">
                        <div className="lazy-load__title">YouTube URL</div>
                        <div className="lazy-load__title__instructions">
                            Paste a link to the content you want to display on your site.
                        </div>
                        <TextControl
                            value={url}
                            onChange={handleUrlChange}
                            placeholder="Enter YouTube URL"
                        />
                    </div>
                ) : youtubeId ? (
                    renderPreview()
                ) : null}
            </div>
        </>
    );
};

export default Edit;
