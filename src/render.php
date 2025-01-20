<?php
// Extract attributes with defaults
$play_icon_color = esc_attr($attributes['textColor'] ?? '#FFFFFF');
$play_background = esc_attr($attributes['color'] ?? '#800080');
$playButtonSize = esc_attr($attributes['playButtonSize'] ?? '100px');
$quality = esc_attr($attributes['quality'] ?? 'maxresdefault');
$youtubeId = esc_attr($attributes['urlExtract'] ?? '');
$containerId = esc_attr($attributes['containerId'] ?? '');
$iconType = $attributes['iconType'] ?? 'iconPresets';
$svgContent = $attributes['svgContent'] ?? '';
$playButtonStyle = isset($attributes['playButtonStyle']) && is_numeric($attributes['playButtonStyle']) ? (int)$attributes['playButtonStyle'] : 0;

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
        class="youtube-placeholder-image"
        src="https://img.youtube.com/vi/<?php echo esc_attr($youtubeId); ?>/<?php echo esc_attr($quality); ?>.jpg" />
</div>