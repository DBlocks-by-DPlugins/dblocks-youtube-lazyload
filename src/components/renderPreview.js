import PlayContent from './playContent.js';

export const renderPreview = ({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent, iconType, customThumbnail }) => (
    <div className="youtube-preview">
        <PlayContent
            url={url}
            quality={quality}
            playButtonSize={playButtonSize}
            playButtonStyle={playButtonStyle}
            color={color}
            textColor={textColor}
            svgContent={svgContent}
            iconType={iconType}
            customThumbnail={customThumbnail}
        />
    </div>
);