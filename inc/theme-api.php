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

function sanitize_svg_content($svg_content)
{
    $allowed_tags = [
        'svg',
        'g',
        'path',
        'rect',
        'circle',
        'ellipse',
        'line',
        'polyline',
        'polygon',
        'text',
        'tspan',
        'defs',
        'linearGradient',
        'radialGradient',
        'stop',
        'use',
        'symbol',
        'clipPath',
        'mask',
        'pattern'
    ];

    $allowed_attributes = [
        'width',
        'height',
        'version',
        'viewBox',
        'xmlns',
        'fill',
        'd',
        'x',
        'y',
        'cx',
        'cy',
        'r',
        'rx',
        'ry',
        'x1',
        'y1',
        'x2',
        'y2',
        'points',
        'transform',
        'stroke',
        'stroke-width',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-dasharray',
        'stroke-dashoffset',
        'fill-opacity',
        'stroke-opacity',
        'opacity',
        'font-family',
        'font-size',
        'text-anchor',
        'gradientUnits',
        'gradientTransform',
        'offset',
        'stop-color',
        'stop-opacity',
        'clip-path',
        'mask',
        'patternUnits',
        'patternTransform'
    ];

    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadXML($svg_content, LIBXML_NOERROR | LIBXML_NOWARNING);
    libxml_clear_errors();

    $xpath = new DOMXPath($dom);
    foreach ($xpath->query('//*') as $node) {
        if (!in_array($node->nodeName, $allowed_tags)) {
            $node->parentNode->removeChild($node);
            continue;
        }

        foreach ($node->attributes as $attr) {
            if (!in_array($attr->nodeName, $allowed_attributes)) {
                $node->removeAttribute($attr->nodeName);
            }
        }
    }

    return $dom->saveXML($dom->documentElement);
}
