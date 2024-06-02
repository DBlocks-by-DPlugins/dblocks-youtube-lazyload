<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function dblocks_youtube_lazyload_register_block() {
    register_block_type( constant('DBLOCKS_YOUTUBE_LAZYLOAD_PATH') . 'build/' );
}
add_action( 'init',  'dblocks_youtube_lazyload_register_block' );
