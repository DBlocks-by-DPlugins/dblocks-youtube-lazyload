=== DBlocks Lazyload for YouTube ===
Contributors: dplugins, krstivoja
Tags: youtube, lazy, load, gdpr, dblocks
Requires at least: 4.0
Tested up to: 6.8.1
Stable tag: 1.2.8
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

GDPR friendly lazyload youtube player that load content only if user click on the play video

== Description ==

**GDPR friendly lazyload youtube player that load content only if user click on the play video**

### Key Features:

-   **Icon styles**: Choose between 6 icon styles to apply them globaly
-   **Icon colors**: Use WordPress Theme colors to apply on play button
-   **Icon size**: Define size of the play button
-   **Custom play icon**: Ability to upload your own SVG play icon. 
-   **Styles are global**: Apply then once see changes across entire website
-   **Thumbnail image quality** choose what you will fetch from youtube
-   **Custom thumbnail**: Ability to upload your own thumbnail image.

### Third-Party Services

This plugin integrates with YouTube's services in the following ways:
- Fetches video thumbnail images from YouTube servers when displaying video previews
- Loads the YouTube video player and related scripts when a user clicks to play a video
- Communicates with YouTube's servers to stream video content

For more information about YouTube's services:
- [YouTube Service Homepage](https://www.youtube.com)
- [YouTube Terms of Service](https://www.youtube.com/t/terms)
- [Google Privacy Policy](https://policies.google.com/privacy) (YouTube is owned by Google)

### Why Choose YouTube Lazyload

-   **GDPR friendly**: It will not load google / youtube scripts unless user does not hit play button
-   **Optimised page speed**: It will laod image instead of entire video and youtube scripts on page load
-   **its Free**: There are other blocks like this but they are mostly payed

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

