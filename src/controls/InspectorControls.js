import { PanelColorSettings, HeightControl } from '@wordpress/block-editor';
import { saveGlobalSetting } from '../utils/api.js';
import sanitizeSVG from '@mattkrick/sanitize-svg';
import { Thumbnail } from '../components/InspectorControls/Thumbnail.js';
import { PlayerIcon } from '../components/InspectorControls/PlayerIcon.js';

const InspectorControlsComponent = ({
    setAttributes,
    quality,
    customThumbnail,
    iconType,
    globalSettings,
    color,
    textColor,
    setHasDropped,
    svgContent,
    hasDropped,
    playButtonSize,
    setGlobalSetting,
    setSvgContent
}) => {

    const handleChange = (attribute, value) => {
        saveGlobalSetting(attribute, value, setGlobalSetting, setAttributes);
    }

    const handleDrop = async (files) => {
        const file = files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = async (event) => {
                let svg = event.target.result;
                const cleanSvg = await sanitizeSVG(svg);

                if (!cleanSvg) {
                    alert('Invalid SVG content detected.');
                    return;
                }

                const svgStart = cleanSvg.indexOf('<svg');
                const svgEnd = cleanSvg.lastIndexOf('</svg>') + 6; // 6 is the length of '</svg>'

                if (svgStart !== -1 && svgEnd !== -1) {
                    svg = cleanSvg.substring(svgStart, svgEnd);
                }

                setSvgContent(svg);
                setHasDropped(true);
                await saveGlobalSetting('svgContent', svg, setGlobalSetting, setAttributes); // Save SVG to the backend
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
        saveGlobalSetting('svgContent', '', setGlobalSetting, setAttributes);
    };

    const handleQualityChange = (newQuality) => {
        setAttributes({ quality: newQuality });
    };

    const removeThumbnail = () => {
        setAttributes({ customThumbnail: '' });
    };

    const handlePlayerStyleChange = (style) => {
        const styleIndex = parseInt(style.replace('style', ''), 10) - 1;
        saveGlobalSetting('playButtonStyle', styleIndex, setGlobalSetting, setAttributes);
    };

    const openMediaLibrary = () => {
        const frame = wp.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Use this media',
            },
            multiple: false,
        });

        frame.on('select', () => {
            const attachment = frame.state().get('selection').first().toJSON();
            setAttributes({ customThumbnail: attachment.url });
        });

        frame.open();
    };

    return (
        <>

            <Thumbnail
                quality={quality}
                handleQualityChange={handleQualityChange}
                customThumbnail={customThumbnail}
                openMediaLibrary={openMediaLibrary}
                removeThumbnail={removeThumbnail}
            />

            <PlayerIcon 
             iconType={iconType}
             handleChange={handleChange}
             handlePlayerStyleChange={handlePlayerStyleChange}
             globalSettings={globalSettings}
             color={color}
             textColor={textColor}
             svgContent={svgContent}
             hasDropped={hasDropped}
             setHasDropped={setHasDropped}
             handleRemoveIcon={handleRemoveIcon}
             playButtonSize={playButtonSize}
             handleDrop={handleDrop}
            />

        </>
    );
};

export default InspectorControlsComponent;
