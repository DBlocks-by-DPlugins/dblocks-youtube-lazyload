<?php

/**
 * Plugin Name:       Lazy Load for YouTube by DBlocks
 * Description:       GDPR friendly lazy load YouTube block. Only loads the video player when visitors click play. Boost page speed with lightweight placeholder images.
 * Requires at least: 6.5.2
 * Requires PHP:      7.4
 * Version:           1.3.1
 * Author:            DPlugins
 * Author URI:        https://dplugins.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dblocks-lazyload-for-youtube
 * @package           CreateBlock
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define plugin URLs and PATHs
define('DBLOCKS_YOUTUBE_LAZYLOAD_DIR',  plugin_dir_path(__FILE__));
define('DBLOCKS_YOUTUBE_LAZYLOAD_PATH', plugin_dir_path(__FILE__));
define('DBLOCKS_YOUTUBE_LAZYLOAD_URL',  plugin_dir_url(__FILE__));
define('DBLOCKS_YOUTUBE_LAZYLOAD_BASE', plugin_basename(__FILE__));


// Include the components using the prefixed path constant
require_once DBLOCKS_YOUTUBE_LAZYLOAD_PATH . 'inc/block-registration.php';
require_once DBLOCKS_YOUTUBE_LAZYLOAD_PATH . 'inc/category.php';
require_once DBLOCKS_YOUTUBE_LAZYLOAD_PATH . 'inc/api.php';
require_once DBLOCKS_YOUTUBE_LAZYLOAD_PATH . 'inc/migration.php';
