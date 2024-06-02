// Edit.js

import { useState, useEffect } from '@wordpress/element';
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
    SelectControl,
    PanelBody
} from '@wordpress/components';
import { BlockControls, InspectorControls, useBlockProps, HeightControl } from '@wordpress/block-editor';
import { extractYoutubeId } from './components/youtubeHelpers';
import PlayContent from './components/playContent';
import { qualityOptions, defaultQuality } from './components/qualitySettings';
import PlayerStyleButtons from './components/PlayerStyleButtons';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const { url, quality, playButtonSize, minHeight, playButtonStyle } = attributes;
    let { containerId } = attributes;
    const [isEditing, setIsEditing] = useState(!url);

    useEffect(() => {
        if (!containerId) {
            const newContainerId = `youtube-container-${Math.floor(Math.random() * 1000000)}`;
            setAttributes({ containerId: newContainerId });
        }
    }, [url, containerId]);

    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    const handleQualityChange = (newQuality) => {
        setAttributes({ quality: newQuality });
    };

    const handlePlayButtonSizeChange = (newSize) => {
        setAttributes({ playButtonSize: newSize });
    };

    const handleMinHeightChange = (newMinHeight) => {
        setAttributes({ minHeight: newMinHeight });
    };

    const handlePlayerStyleChange = (style) => {
        const styleIndex = parseInt(style.replace('style', '')) - 1;
        setAttributes({ playButtonStyle: styleIndex });
    };

    const youtubeId = extractYoutubeId(url);

    const renderPreview = () => (
        <div className="youtube-preview">
            <PlayContent url={url} quality={quality} playButtonSize={playButtonSize} playButtonStyle={playButtonStyle} />
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title="Thumbnail" initialOpen={true}>
                    <SelectControl
                        label="Image Quality"
                        value={quality || defaultQuality}
                        options={qualityOptions}
                        onChange={handleQualityChange}
                    />
                </PanelBody>
                <PanelBody title="Player Style" initialOpen={true}>
                    <PlayerStyleButtons handlePlayerStyleChange={handlePlayerStyleChange} />
                    <HeightControl
                        label="Play Button Size"
                        value={playButtonSize || '64px'}
                        onChange={handlePlayButtonSizeChange}
                    />
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={isEditing ? "edit" : "visibility"}
                        label={isEditing ? "Edit URL" : "View Image"}
                        onClick={() => setIsEditing((current) => !current)}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...useBlockProps()} style={{ minHeight }}>
                {isEditing ? (
                    <div className="lazy-load-edit-wrapper">
                        <div className="lazy-load__title">YouTube URL</div>
                        <div className="lazy-load__title__instructions">
                            Paste a link to the content you want to display on your site.
                        </div>
                        <TextControl
                            value={url || ""}
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
