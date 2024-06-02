import { useState, useEffect, useRef } from '@wordpress/element';
import {
    TextControl,
    SelectControl,
    PanelBody,
    ToolbarGroup,
    ToolbarButton,
} from '@wordpress/components';
import { BlockControls, InspectorControls, useBlockProps, HeightControl, PanelColorSettings } from '@wordpress/block-editor';
import { registerStore, useSelect, useDispatch } from '@wordpress/data';
import PlayContent from './components/playContent';
import { qualityOptions, defaultQuality } from './components/qualitySettings';
import PlayerStyleButtons from './components/PlayerStyleButtons';
import { extractYoutubeId } from './components/youtubeHelpers';
import './editor.scss';

const STORE_NAME = 'dblocks/global-settings';

const DEFAULT_GLOBAL_SETTINGS = {
    color: '#800080',
    textColor: '#FFFFFF',
    quality: 'maxresdefault',
    playButtonSize: '100px',
    playButtonStyle: 0,
    minHeight: '100px',
};

// Registering a custom data store for global settings
registerStore(STORE_NAME, {
    reducer(state = DEFAULT_GLOBAL_SETTINGS, action) {
        switch (action.type) {
            case 'SET_GLOBAL_SETTING':
                return {
                    ...state,
                    [action.attribute]: action.value,
                };
            case 'SET_GLOBAL_SETTINGS':
                return {
                    ...state,
                    ...action.settings,
                };
            default:
                return state;
        }
    },
    actions: {
        setGlobalSetting(attribute, value) {
            return {
                type: 'SET_GLOBAL_SETTING',
                attribute,
                value,
            };
        },
        setGlobalSettings(settings) {
            return {
                type: 'SET_GLOBAL_SETTINGS',
                settings,
            };
        },
    },
    selectors: {
        getGlobalSettings(state) {
            return state;
        },
        getGlobalSetting(state, attribute) {
            return state[attribute];
        },
    },
    resolvers: {
        *getGlobalSettings() {
            const response = yield fetch('/wp-json/dblocks-youtube-lazyload/v1/global-settings');
            const settings = yield response.json();
            return {
                type: 'SET_GLOBAL_SETTINGS',
                settings,
            };
        },
    },
});

const Edit = ({ attributes, setAttributes, isSelected }) => {
    const {
        url = '',
        quality,
        playButtonSize,
        minHeight,
        playButtonStyle,
        color,
        textColor,
    } = attributes;
    let { containerId } = attributes;
    const [isEditing, setIsEditing] = useState(!url);
    const globalSettingsLoaded = useRef(false);

    const globalSettings = useSelect((select) => select(STORE_NAME).getGlobalSettings(), []);
    const { setGlobalSetting, setGlobalSettings } = useDispatch(STORE_NAME);

    useEffect(() => {
        const fetchGlobalSettings = async () => {
            try {
                const response = await fetch('/wp-json/dblocks-youtube-lazyload/v1/global-settings');
                const settings = await response.json();
                setGlobalSettings(settings);
                setAttributes((prevAttributes) => ({
                    ...prevAttributes,
                    ...settings,
                }));
                globalSettingsLoaded.current = true;
            } catch (error) {
                console.error('Failed to fetch global settings:', error);
            }
        };

        fetchGlobalSettings();
    }, [setGlobalSettings, setAttributes]);

    useEffect(() => {
        if (!globalSettingsLoaded.current) return;

        setAttributes({
            color: globalSettings.color,
            textColor: globalSettings.textColor,
            quality: globalSettings.quality,
            playButtonSize: globalSettings.playButtonSize,
            playButtonStyle: globalSettings.playButtonStyle,
            minHeight: globalSettings.minHeight,
        });
    }, [globalSettings, setAttributes]);

    useEffect(() => {
        if (!containerId) {
            const newContainerId = `youtube-container-${Math.floor(Math.random() * 1000000)}`;
            setAttributes({ containerId: newContainerId });
        }
    }, [containerId, setAttributes]);

    const saveGlobalSetting = async (attribute, value) => {
        setGlobalSetting(attribute, value);
        setAttributes({ [attribute]: value });

        try {
            await fetch('/wp-json/dblocks-youtube-lazyload/v1/global-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wpApiSettings.nonce,
                },
                body: JSON.stringify({ [attribute]: value }),
            });
        } catch (error) {
            console.error(`Failed to update global ${attribute}:`, error);
        }
    };

    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    const handleQualityChange = (newQuality) => {
        saveGlobalSetting('quality', newQuality);
    };

    const handlePlayButtonSizeChange = (newSize) => {
        saveGlobalSetting('playButtonSize', newSize);
    };

    const handlePlayerStyleChange = (style) => {
        const styleIndex = parseInt(style.replace('style', ''), 10) - 1;
        saveGlobalSetting('playButtonStyle', styleIndex);
    };

    const handleColorChange = (colorValue) => {
        saveGlobalSetting('color', colorValue);
    };

    const handleTextColorChange = (colorValue) => {
        saveGlobalSetting('textColor', colorValue);
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
                    <HeightControl
                        label="Size"
                        value={playButtonSize || '64px'}
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
