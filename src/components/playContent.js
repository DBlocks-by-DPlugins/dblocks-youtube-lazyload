import React from "react";
import { extractYoutubeId, getPlaceholderImageUrl } from "../utils/youtubeHelpers";
import { svgIcons } from "./svgIcons";

const PlayContent = ({
    url,
    quality = "maxresdefault",
    playButtonSize,
    playButtonStyle = 0,
    color,
    textColor,
    svgContent,
    iconType,
    customThumbnail,
}) => {
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId, quality);

    const svgIcon = svgIcons[playButtonStyle]
        .replace(/{{playBackground}}/g, color)
        .replace(/{{playIcon}}/g, textColor);

    return (
        <>
            <button className="play-button" data-youtube-id={youtubeId}>
                <div
                    className="play-icon-wrap play-icon-custom"
                    style={{
                        width: playButtonSize,
                        height: playButtonSize,
                    }}
                >
                    {iconType === 'custom' && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: svgContent || svgIcon, // Use svgContent if available, fallback to svgIcon
                            }}
                        />
                    )}
                    {iconType === 'iconPresets' && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: svgIcon,
                            }}
                        />
                    )}
                </div>
            </button>
            <img
                src={customThumbnail || placeholderImageUrl}
                alt="YouTube Video Placeholder"
                className="youtube-placeholder-image"
            />
        </>
    );
};

export default PlayContent;
