import { extractYoutubeId, getPlaceholderImageUrl } from "./components/youtubeHelpers";
import PlayContent from "./components/playContent";

const Save = ({ attributes }) => {
    const { url, containerId, align, quality } = attributes;
    const youtubeId = extractYoutubeId(url);

    // Construct the class name based on the alignment
    const className = `lazy-youtube-player-container ${
        align ? "align" + align : ""
    }`;

    return (
        <div id={containerId} className={className}>
            {youtubeId && <PlayContent url={url} quality={quality} />}
        </div>
    );
};

export default Save;
