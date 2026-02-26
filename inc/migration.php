<?php

if (! defined('ABSPATH')) exit;

/**
 * Replace old block name with new block name at render time.
 * Runs before WordPress parses blocks (priority 5, before do_blocks at 9).
 */
function dblocks_youtube_lazyload_replace_legacy_block($content)
{
    if (strpos($content, 'wp:create-block/dp-lazy-youtube') === false) {
        return $content;
    }

    return str_replace(
        array('wp:create-block/dp-lazy-youtube', 'wp:/create-block/dp-lazy-youtube'),
        array('wp:dblocks/dblocks-lazyload-for-youtube', 'wp:/dblocks/dblocks-lazyload-for-youtube'),
        $content
    );
}
add_filter('the_content', 'dblocks_youtube_lazyload_replace_legacy_block', 5);
