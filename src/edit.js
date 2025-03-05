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
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { registerStore, useSelect, useDispatch } from '@wordpress/data';
import PlayContent from './components/playContent.js';
import PlayerStyleButtons from './components/playButtonPresets.js';
import { extractYoutubeId } from './utils/youtubeHelpers.js';
import { renderPreview } from './components/renderPreview.js';
import BlockControlsComponent from './controls/BlockControls.js';
import { media } from '@wordpress/media-utils';
import './editor.scss';
import { fetchGlobalSettings } from './utils/api.js';
import InspectorControlsComponent from './components/InspectorControls/InspectorControlsComponent.js';

const STORE_NAME = 'dblocks/global-settings';

const DEFAULT_GLOBAL_SETTINGS = {
    color: '#800080',
    textColor: '#FFFFFF',
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
            const response = yield fetch(`${wpApiSettings.root}dblocks-lazyload-for-youtube/v1/global-settings`, {
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
        customThumbnail,
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
        fetchGlobalSettings(setGlobalSettings, setAttributes, setSvgContent, setHasDropped, globalSettingsLoaded, setIsLoaded);
    }, [setGlobalSettings, setAttributes]);

    useEffect(() => {
        if (!globalSettingsLoaded.current) return;

        setAttributes({
            color: globalSettings.color,
            textColor: globalSettings.textColor,
            playButtonSize: globalSettings.playButtonSize,
            playButtonStyle: globalSettings.playButtonStyle,
            minHeight: globalSettings.minHeight,
            iconType: globalSettings.iconType
        });
    }, [globalSettings, setAttributes, isLoaded]);

    useEffect(() => {
        const newContainerId = `youtube-container-${Math.floor(Math.random() * 1000000)}`;
        setAttributes({ containerId: newContainerId });
    }, [setAttributes]);

  

    const handleUrlChange = (newUrl) => {
        const youtubeId = extractYoutubeId(newUrl);
        setAttributes({ url: newUrl, urlExtract: youtubeId });
        setErrorMessage('');
    };


    const youtubeId = extractYoutubeId(url);

    const handlePreviewClick = () => {
        if (youtubeId) {
            setIsEditing(false);
            console.log("svg:", svgContent)
            { isLoaded && renderPreview({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent, iconType }) };
        } else {
            setErrorMessage("Sorry, this content could not be embedded.");
        }
    };


    return (
        <>
            <InspectorControlsComponent 
            {...attributes}
            setAttributes={setAttributes}
            globalSettings={globalSettings}
            setHasDropped={setHasDropped}
            svgContent={svgContent}
            hasDropped={hasDropped}
            playButtonSize={playButtonSize}
            setGlobalSetting={setGlobalSetting}
            setSvgContent={setSvgContent}
            />

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
                        renderPreview({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent, iconType, customThumbnail })
                    ) : null
                ) : null}
            </div>
        </>
    );
};

export default Edit;
