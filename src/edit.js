import { useState, useEffect, useRef } from '@wordpress/element';
import {
    TextControl,
    SelectControl,
    PanelBody,
    Button,
    DropZone,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { BlockControls, InspectorControls, useBlockProps, HeightControl, PanelColorSettings } from '@wordpress/block-editor';
import { registerStore, useSelect, useDispatch } from '@wordpress/data';
import PlayContent from './components/playContent.js';
import { qualityOptions, defaultQuality } from './utils/qualitySettings.js';
import PlayerStyleButtons from './components/playButtonPresets.js';
import { extractYoutubeId } from './utils/youtubeHelpers.js';
import { renderPreview } from './components/renderPreview.js';
import './editor.scss';
import BlockControlsComponent from './controls/BlockControls.js';

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
            const response = yield fetch('/wp-json/dblocks-lazyload-for-youtube/v1/global-settings', {
                headers: {
                    'X-WP-Nonce': wpApiSettings.nonce,
                },
            });
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
        iconType,
    } = attributes;

    let { containerId } = attributes;
    const [isEditing, setIsEditing] = useState(!url);
    const globalSettingsLoaded = useRef(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasDropped, setHasDropped] = useState(false);
    const [svgContent, setSvgContent] = useState('');

    const globalSettings = useSelect((select) => select(STORE_NAME).getGlobalSettings(), []);
    const { setGlobalSetting, setGlobalSettings } = useDispatch(STORE_NAME);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchGlobalSettings = async () => {
            try {
                const response = await fetch('/wp-json/dblocks-lazyload-for-youtube/v1/global-settings', {
                    headers: {
                        'X-WP-Nonce': wpApiSettings.nonce,
                    },
                });
                const settings = await response.json();
                setGlobalSettings(settings);
                setAttributes((prevAttributes) => ({
                    ...prevAttributes,
                    ...settings,
                }));
                if (settings.svgContent) {
                    setSvgContent(settings.svgContent)
                    setHasDropped(true);
                    setAttributes({'svgContent': settings.svgContent})
                }
                globalSettingsLoaded.current = true;
                setIsLoaded(true); 
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
            iconType: globalSettings.iconType
        });
    }, [globalSettings, setAttributes, isLoaded]);

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
            await fetch('/wp-json/dblocks-lazyload-for-youtube/v1/global-settings', {
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
        setErrorMessage('');
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

    const handleIconTypeChange = (iconType) => {
        saveGlobalSetting('iconType', iconType);
    };

    const youtubeId = extractYoutubeId(url);

    const handlePreviewClick = () => {
        if (youtubeId) {
            setIsEditing(false);
            console.log("svg:", svgContent)
            {isLoaded && renderPreview({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent, iconType })};
        } else {
            setErrorMessage("Sorry, this content could not be embedded.");
        }
    };

    const handleDrop = (files) => {
        const file = files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const svg = event.target.result;
                setSvgContent(svg);
                setHasDropped(true);
                await saveGlobalSetting('svgContent', svg); // Save SVG to the backend
            };
            reader.readAsText(file);
        }
    };

    const handleRemoveIcon = () => {
        setSvgContent('');
        setHasDropped(false);
        setAttributes({
            playButtonStyle: 0,
            svgContent: '',
        });
        saveGlobalSetting('svgContent', '');
    };

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

                <PanelBody title="Player Icon" initialOpen={true}>
                    <ToggleGroupControl
                        label="Icon Type"
                        value={iconType}
                        onChange={handleIconTypeChange}
                        isBlock
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    >
                        <ToggleGroupControlOption value="iconPresets" label="Icon Presets" />
                        <ToggleGroupControlOption value="custom" label="Custom SVG" />
                    </ToggleGroupControl>

                    {iconType === 'iconPresets' && (
                        <PlayerStyleButtons
                            handlePlayerStyleChange={handlePlayerStyleChange}
                            initialStyleIndex={globalSettings.playButtonStyle}
                            color={color}
                            textColor={textColor}
                        />
                    )}

                    {iconType === 'custom' && !svgContent && !hasDropped && (
                        <div className="drop-zone-wrapper">
                            {hasDropped ? 'Dropped!' : 'Drop something here'}
                            <DropZone
                                onFilesDrop={handleDrop}
                                onHTMLDrop={() => setHasDropped(true)}
                                onDrop={() => setHasDropped(true)}
                            />
                        </div>
                    )}

                    {iconType === 'custom' && hasDropped && svgContent && (
                        <div className="svg-preview-wrapper">
                            <div className="svg-preview drop-zone-wrapper" dangerouslySetInnerHTML={{ __html: svgContent }} />
                            <Button
                                variant="secondary"
                                onClick={handleRemoveIcon}
                            >
                                Remove Icon
                            </Button>
                        </div>
                    )}

                    <HeightControl
                        label="Size"
                        value={playButtonSize || '64px'}
                        onChange={handlePlayButtonSizeChange}
                    />

                    {iconType === 'iconPresets' && (
                        <PanelColorSettings
                            className="color-settings-youtubelazyload"
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
                    )}
                </PanelBody>

            </InspectorControls>
            <BlockControls>
                <BlockControlsComponent
                    youtubeId={youtubeId}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
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
                        <div className="lazy-load__title__input-wrapper">
                            <TextControl
                                value={url}
                                onChange={handleUrlChange}
                                placeholder="Enter YouTube URL"
                            />
                            <Button
                                variant="primary"
                                onClick={handlePreviewClick} // Use the new function
                            >
                                Preview
                            </Button>

                        </div>
                        <a className="lazy-load__title__instructions text-link" href="https://github.com/DBlocks-by-DPlugins/dblocks-lazyload-for-youtube/blob/main/embeds.md" target="_blank">
                            Learn more about embeds <span aria-label="(opens in a new tab)">↗</span>
                        </a>

                        {errorMessage && <p className="lazy-load__title__instructions">{errorMessage}</p>}
                    </div>
                ) : youtubeId ? (
                    isLoaded ? (
                        renderPreview({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent, iconType })
                    ) : null
                ) : null}
            </div>
        </>
    );
};

export default Edit;
