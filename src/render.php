<?php
// global settings
$play_icon_color = esc_attr(get_option('dblocks_color', '#FFFFFF'));
$play_background = esc_attr(get_option('dblocks_textColor', '#800080'));
$playButtonSize = esc_attr(get_option('dblocks_playButtonSize', '100px'));
$iconType = esc_attr(get_option('dblocks_iconType', 'iconPresets'));
$svgContent = get_option('dblocks_svgContent', '');
$playButtonStyle = is_numeric(get_option('dblocks_playButtonStyle', 0)) ? (int)get_option('dblocks_playButtonStyle', 0) : 0;

// Local settings
$quality = esc_attr($attributes['quality'] ?? 'maxresdefault');
$youtubeId = esc_attr($attributes['urlExtract'] ?? '');
$containerId = esc_attr($attributes['containerId'] ?? '');
$customThumbnail = esc_attr($attributes['customThumbnail'] ?? '');
// Include icons
include 'icons.php';

// Determine the SVG icon
$svgIcon = $svgIcons[$playButtonStyle] ?? $svgIcons[0];
?>

<div <?php echo get_block_wrapper_attributes(); ?>
    id="<?php echo $containerId; ?>"
    style="
        --play-background:<?php echo $play_background; ?>;
        --play-icon-color:<?php echo $play_icon_color; ?>;
        --play-button-size:<?php echo $playButtonSize; ?>">

    <button class="play-button" data-youtube-id="<?php echo esc_attr($youtubeId); ?>">
        <div
            class="play-icon-wrap play-icon-custom"
            style="width:<?php echo $playButtonSize; ?>; height:<?php echo $playButtonSize; ?>;">
            <?php
            // Display SVG icon or custom SVG content
            echo $iconType === 'custom' && !empty($svgContent) ? $svgContent : $svgIcon;
            ?>
        </div>
    </button>

    <img decoding="async"
        alt="YouTube Video Placeholder"
        class="youtube-placeholder-image <?php echo $customThumbnail ? 'youtube-placeholder-image--custom-thumbnail' : ''; ?>"
        src="<?php echo esc_attr($customThumbnail ?: "https://img.youtube.com/vi/{$youtubeId}/{$quality}.jpg"); ?>" />
</div>