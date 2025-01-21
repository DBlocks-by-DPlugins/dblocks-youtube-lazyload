<?php

if (! defined('ABSPATH')) exit; // Exit if accessed directly

function dblocks_youtube_lazyload_register_block()
{
    register_block_type(constant('DBLOCKS_YOUTUBE_LAZYLOAD_PATH') . 'build/');

    wp_localize_script('wp-api', 'wpApiSettings', array(
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action('init',  'dblocks_youtube_lazyload_register_block');
