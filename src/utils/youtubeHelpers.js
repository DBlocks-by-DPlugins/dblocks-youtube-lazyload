// youtubeHelpers.js
import { qualityOptions, defaultQuality } from './qualitySettings';

export const extractYoutubeId = (url) => {
    if (!url) return "";
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
    return url.match(regex)?.[1] || "";
};

export const getPlaceholderImageUrl = (youtubeId, quality = defaultQuality) => {
    if (!youtubeId) return "";

    const validQualities = qualityOptions.map(option => option.value);
    if (!validQualities.includes(quality)) {
        quality = defaultQuality;
    }

    return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
};
