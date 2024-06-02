// Edit.js

import { useState, useEffect } from '@wordpress/element';
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
    SelectControl,
    PanelBody
} from '@wordpress/components';
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { extractYoutubeId } from './components/youtubeHelpers';
import PlayContent from './components/playContent';
import { qualityOptions, defaultQuality } from './components/qualitySettings';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const { url, quality } = attributes;
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

    const youtubeId = extractYoutubeId(url);

    const renderPreview = () => (
        <div className="youtube-preview">
            <PlayContent url={url} quality={quality} />
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title="Settings" initialOpen={true}>
                    <SelectControl
                        label="Image Quality"
                        value={quality || defaultQuality}
                        options={qualityOptions}
                        onChange={handleQualityChange}
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
            <div {...useBlockProps()}>
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
