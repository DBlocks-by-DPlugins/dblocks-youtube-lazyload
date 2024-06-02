// save.js

import { extractYoutubeId, getPlaceholderImageUrl } from "./components/youtubeHelpers";
import PlayContent from "./components/playContent";

const Save = ({ attributes }) => {
    const { url, containerId, align, quality, playButtonStyle, playButtonSize } = attributes;
    const youtubeId = extractYoutubeId(url);

    // Construct the class name based on the alignment
    const className = `dblocks-dblocks-youtube-lazyload ${
        align ? "align" + align : ""
    }`;

    return (
        <div id={containerId} className={className}>
            {youtubeId && (
                <PlayContent
                    url={url}
                    quality={quality}
                    playButtonStyle={playButtonStyle}
                    playButtonSize={playButtonSize}
                />
            )}
        </div>
    );
};

export default Save;
