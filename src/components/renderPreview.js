import PlayContent from './playContent.js';

export const renderPreview = ({ url, quality, playButtonSize, playButtonStyle, color, textColor, svgContent }) => (
    <div className="youtube-preview">
        <PlayContent
            url={url}
            quality={quality}
            playButtonSize={playButtonSize}
            playButtonStyle={playButtonStyle}
            color={color}
            textColor={textColor}
            svgContent={svgContent}
        />
    </div>
);