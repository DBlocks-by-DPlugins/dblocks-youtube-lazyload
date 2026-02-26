=== Lazy Load for YouTube – GDPR Friendly YouTube Embed Block by DBlocks ===
Contributors: dplugins, krstivoja
Tags: youtube, lazy load, youtube embed, gdpr, video
Requires at least: 4.0
Tested up to: 6.9.1
Stable tag: 1.3.0
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

GDPR friendly lazy load YouTube block that only loads the video player when visitors click play. Boost page speed by replacing heavy YouTube embeds with a lightweight placeholder image.

== Description ==

**The GDPR friendly way to embed YouTube videos in WordPress.** This block replaces heavy YouTube iframes with a lightweight placeholder image and only loads the YouTube player when your visitor clicks play.

No YouTube scripts or cookies are loaded until the user interacts — making your site faster and privacy compliant.

### Key Features:

-   **GDPR & Privacy Friendly**: Zero YouTube scripts loaded until the user clicks play
-   **Faster Page Speed**: Replaces heavy YouTube embeds with a lightweight image placeholder
-   **6 Play Button Styles**: Choose from 6 icon presets and apply them globally
-   **Custom Play Icon**: Upload your own SVG play icon
-   **Theme Color Support**: Use your WordPress theme colors on the play button
-   **Adjustable Icon Size**: Control the size of the play button
-   **Thumbnail Quality**: Choose the YouTube thumbnail quality per block
-   **Custom Thumbnail**: Upload your own thumbnail image for extra privacy
-   **Global Settings**: Set icon style, colors, and size once — applies across your entire site
-   **Free**: No premium upsells or locked features

### Third-Party Services

This plugin integrates with YouTube's services in the following ways:
- Fetches video thumbnail images from YouTube servers when displaying video previews
- Loads the YouTube video player and related scripts when a user clicks to play a video
- Communicates with YouTube's servers to stream video content

For more information about YouTube's services:
- [YouTube Service Homepage](https://www.youtube.com)
- [YouTube Terms of Service](https://www.youtube.com/t/terms)
- [Google Privacy Policy](https://policies.google.com/privacy) (YouTube is owned by Google)

### Embeds

For more information about embeds:
- [Embed guide](https://github.com/DBlocks-by-DPlugins/dblocks-lazyload-for-youtube/blob/main/embeds.md)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/dblocks-lazyload-for-youtube` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use Youtube LazyLoad from DBlocks group

== Frequently Asked Questions ==


== Screenshots ==


== Changelog ==

= 1.3.0 =
* Added automatic migration for legacy block name (create-block/dp-lazy-youtube)
* Fixed YouTube embed Error 153 by updating iframe parameters and permissions
* Legacy blocks now render correctly without requiring manual re-save

= 1.2.7 =
* Version bump

= 1.2.6 =
* Fixed Rendering image on the front end to work correctly with WordPress installations in subdirectories

= 1.2.5 =
* Fixed REST API endpoint URLs to work correctly with WordPress installations in subdirectories

= 1.2.4 =
* Fox for Added one more transform.

= 1.2.3 =
* Added one more transform.

= 1.2.2 =
* Icon Colors were reverted on the front end.

= 1.2.1 =
* Updated readme file. 

= 1.2.0 =
* Added option to upload custom thumbnail for extra privacy.

= 1.1.1 =
* Added option to use custom icon. SVG will be sanitized on upload. You will not able to recolor custom icon. Style it before upload.
* Color, size, style, quality, icon type, svg content are now global settings.
* Quality is now pre block settings. It will use heighers quality and you can lower it if some video does not support it.
* Fixed issue with container id if block is duplicated. It was causing play video in first block.

= 1.1.0 =
* Ability to use custom icon. 
* Moved colors under "Played icon panel"
* Updated button styles for choosing icons


= 1.0.3 =
* Assets update.

= 1.0.2 =
* Limited number of tags to 5

= 1.0.1 =
* Added assets.

= 1.0.0 =
* Release
== Upgrade Notice ==

