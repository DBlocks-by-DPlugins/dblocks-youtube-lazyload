<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

// *************************************************************************************
// Theme API
// *************************************************************************************

add_action('rest_api_init', function () {
    // Reusable permission callback
    function dblocks_youtube_permission_callback(WP_REST_Request $request)
    {
        $nonce = $request->get_header('X-WP-Nonce');
        if (empty($nonce) || !wp_verify_nonce($nonce, 'wp_rest') || !current_user_can('edit_posts')) {
            return new WP_Error(
                'unauthorized',
                'You must be logged in with proper permissions',
                array('status' => 401)
            );
        }
        return true;
    }

    // Register GET route
    register_rest_route('dblocks-lazyload-for-youtube/v1', '/global-settings', [
        'methods' => 'GET',
        'callback' => 'dblocks_youtube_get_global_settings',
        'permission_callback' => 'dblocks_youtube_permission_callback',
    ]);

    // Register POST route
    register_rest_route('dblocks-lazyload-for-youtube/v1', '/global-settings', [
        'methods' => 'POST',
        'callback' => 'dblocks_youtube_update_global_settings',
        'permission_callback' => 'dblocks_youtube_permission_callback',
    ]);
});

// *************************************************************************************
// Global settings
// *************************************************************************************

function dblocks_youtube_get_options()
{
    return [
        'minHeight' => '100px',
        'iconType' => 'iconPresets',
        'color' => '#800080',
        'textColor' => '#FFFFFF',
        'playButtonSize' => '100px',
        'playButtonStyle' => 0,
        'svgContent' => '',
    ];
}

function dblocks_youtube_get_global_settings()
{
    $options = dblocks_youtube_get_options();
    $settings = [];

    foreach ($options as $key => $default) {
        $settings[$key] = get_option("dblocks_{$key}", $default);
    }

    return $settings;
}

function dblocks_youtube_update_global_settings(WP_REST_Request $request)
{
    $options = dblocks_youtube_get_options();
    $params = $request->get_params();

    foreach ($options as $key => $default) {
        if (isset($params[$key])) {
            update_option("dblocks_{$key}", $params[$key]);
        }
    }

    return dblocks_youtube_get_global_settings();
}
