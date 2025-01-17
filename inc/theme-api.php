<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

// Theme API

add_action('rest_api_init', function () {
    register_rest_route('dblocks-lazyload-for-youtube/v1', '/global-settings', [
        'methods' => 'GET',
        'callback' => 'dblocks_youtube_get_global_settings',
        'permission_callback' => function(WP_REST_Request $request) {
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
        'permission_callback' => function(WP_REST_Request $request) {
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
    ];
}

function dblocks_youtube_update_global_settings(WP_REST_Request $request)
{
    $params = $request->get_params();

    if (isset($params['color'])) {
        update_option('dblocks_color', $params['color']);
    }
    if (isset($params['textColor'])) {
        update_option('dblocks_textColor', $params['textColor']);
    }
    if (isset($params['quality'])) {
        update_option('dblocks_quality', $params['quality']);
    }
    if (isset($params['playButtonSize'])) {
        update_option('dblocks_playButtonSize', $params['playButtonSize']);
    }
    if (isset($params['playButtonStyle'])) {
        update_option('dblocks_playButtonStyle', $params['playButtonStyle']);
    }
    if (isset($params['minHeight'])) {
        update_option('dblocks_minHeight', $params['minHeight']);
    }

    return dblocks_youtube_get_global_settings();
}
