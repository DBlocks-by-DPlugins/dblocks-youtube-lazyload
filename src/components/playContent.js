// PlayContent.js

import React from "react";
import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";

const PlayContent = ({ url, quality = 'maxresdefault', playButtonSize }) => {
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId, quality);

    return (
        <>
            <button className="play-button" data-youtube-id={youtubeId} style={{ width: playButtonSize, height: playButtonSize }}>
                <div className="play-icon-wrap" style={{ width: playButtonSize, height: playButtonSize }}>
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M44.8875 2.70001C56.5385 2.70001 67.0825 7.42073 74.7183 15.0567C82.3507 22.693 87.075 33.2375 87.075 44.8875C87.075 56.5375 82.3543 67.0825 74.7183 74.7183C67.0821 82.3507 56.5375 87.075 44.8875 87.075C33.2375 87.075 22.6926 82.3543 15.0567 74.7183C7.42431 67.0821 2.70001 56.5375 2.70001 44.8875C2.70001 33.2375 7.42073 22.6926 15.0567 15.0567C22.693 7.42431 33.2375 2.70001 44.8875 2.70001ZM64.3783 46.6326C64.6842 46.4627 64.9486 46.2096 65.1374 45.8848C65.6888 44.9256 65.3564 43.7058 64.401 43.1544L49.9028 34.7817L35.5708 26.5072C35.2423 26.273 34.842 26.1371 34.4077 26.1371C33.2974 26.1371 32.3986 27.0359 32.3986 28.1462V61.6295H32.4061C32.4061 61.9694 32.493 62.3131 32.6705 62.6265C33.2219 63.5858 34.4454 63.9143 35.4009 63.3629L49.8991 54.9902L64.3783 46.6326Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </button>
            <img
                src={placeholderImageUrl}
                alt="YouTube Video Placeholder"
                className="youtube-placeholder-image"
            />
        </>
    );
};

export default PlayContent;
