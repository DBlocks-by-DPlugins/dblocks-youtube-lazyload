// save.js

import { extractYoutubeId } from "./components/youtubeHelpers";
import PlayContent from "./components/playContent";

const Save = ({ attributes }) => {
    const { url, containerId, align, quality, playButtonStyle, playButtonSize, color, textColor } = attributes;
    const youtubeId = extractYoutubeId(url);

    // Construct the class name based on the alignment
    const className = `dblocks-dblocks-youtube-lazyload ${
        align ? "align" + align : ""
    }`;

    return (
        <div 
            id={containerId} 
            className={className} 
            style={{ '--play-background': color || '#800080', '--play-icon-color': textColor || '#FFFFFF', '--play-button-size': playButtonSize || '64px' }}
        >
            {youtubeId && (
                <PlayContent
                    url={url}
                    quality={quality}
                    playButtonStyle={playButtonStyle}
                    playButtonSize={playButtonSize}
                    color={color || '#800080'}
                    textColor={textColor || '#FFFFFF'}
                />
            )}
        </div>
    );
};

export default Save;
