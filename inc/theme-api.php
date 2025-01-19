<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

// Theme API

add_action('rest_api_init', function () {
    register_rest_route('dblocks-lazyload-for-youtube/v1', '/global-settings', [
        'methods' => 'GET',
        'callback' => 'dblocks_youtube_get_global_settings',
        'permission_callback' => function (WP_REST_Request $request) {
            $nonce = $request->get_header('X-WP-Nonce');
            if (empty($nonce) || !wp_verify_nonce($nonce, 'wp_rest') || !current_user_can('edit_posts')) {
                return new WP_Error(
                    'unauthorized',
                    'You must be logged in with proper permissions',
                    array('status' => 401)
                );
            }
            return true;
        },
    ]);

    register_rest_route('dblocks-lazyload-for-youtube/v1', '/global-settings', [
        'methods' => 'POST',
        'callback' => 'dblocks_youtube_update_global_settings',
        'permission_callback' => function (WP_REST_Request $request) {
            $nonce = $request->get_header('X-WP-Nonce');
            if (empty($nonce) || !wp_verify_nonce($nonce, 'wp_rest') || !current_user_can('edit_posts')) {
                return new WP_Error(
                    'unauthorized',
                    'You must be logged in with proper permissions',
                    array('status' => 401)
                );
            }
            return true;
        },
    ]);
});

function dblocks_youtube_get_global_settings()
{
    return [
        'color' => get_option('dblocks_color', '#800080'),
        'textColor' => get_option('dblocks_textColor', '#FFFFFF'),
        'quality' => get_option('dblocks_quality', 'maxresdefault'),
        'playButtonSize' => get_option('dblocks_playButtonSize', '100px'),
        'playButtonStyle' => get_option('dblocks_playButtonStyle', 0),
        'minHeight' => get_option('dblocks_minHeight', '100px'),
        'svgContent' => get_option('dblocks_svgContent', ''),
        'iconType' => get_option('dblocks_iconType', 'iconType'),
    ];
}

function dblocks_youtube_update_global_settings(WP_REST_Request $request)
{
    $params = $request->get_params();
    $options = [
        'color' => 'dblocks_color',
        'textColor' => 'dblocks_textColor',
        'quality' => 'dblocks_quality',
        'playButtonSize' => 'dblocks_playButtonSize',
        'playButtonStyle' => 'dblocks_playButtonStyle',
        'minHeight' => 'dblocks_minHeight',
        'svgContent' => 'dblocks_svgContent',
        'iconType' => 'dblocks_iconType',
    ];

    foreach ($options as $param => $option_name) {
        if (isset($params[$param])) {
            update_option($option_name, $params[$param]);
        }
    }

    return dblocks_youtube_get_global_settings();
}
