// api.js - Handles all API calls

export const fetchGlobalSettings = async (setGlobalSettings, setAttributes, setSvgContent, setHasDropped, globalSettingsLoaded, setIsLoaded) => {
    try {
        const response = await fetch(`${wpApiSettings.root}dblocks-lazyload-for-youtube/v1/global-settings`, {
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce,
            },
        });
        const settings = await response.json();
        setGlobalSettings(settings);
        setAttributes(prevAttributes => ({
            ...prevAttributes,
            ...settings,
        }));
        if (settings.svgContent) {
            setSvgContent(settings.svgContent);
            setHasDropped(true);
            setAttributes({ 'svgContent': settings.svgContent });
        }
        globalSettingsLoaded.current = true;
        setIsLoaded(true);
    } catch (error) {
        console.error('Failed to fetch global settings:', error);
    }
};

export const saveGlobalSetting = async (attribute, value, setGlobalSetting, setAttributes) => {
    setGlobalSetting(attribute, value);
    setAttributes({ [attribute]: value });
    try {
        await fetch(`${wpApiSettings.root}dblocks-lazyload-for-youtube/v1/global-settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wpApiSettings.nonce,
            },
            body: JSON.stringify({ [attribute]: value }),
        });
    } catch (error) {
        console.error(`Failed to update global ${attribute}:`, error);
    }
};
