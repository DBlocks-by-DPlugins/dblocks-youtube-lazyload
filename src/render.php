<div
    <?php
    echo get_block_wrapper_attributes();

    $play_icon_color = isset($attributes['textColor']) ? esc_attr($attributes['textColor']) : '#FFFFFF';
    $play_background = isset($attributes['color']) ? esc_attr($attributes['color']) : '#800080';
    $playButtonSize = isset($attributes['playButtonSize']) ? esc_attr($attributes['playButtonSize']) : '100px';

    $quality = isset($attributes['quality']) ? esc_attr($attributes['quality']) : 'maxresdefault';
    $youtubeId = isset($attributes['urlExtract']) ? esc_attr($attributes['urlExtract']) : '';

    include 'icons.php';

    ?>
    id="<?php echo esc_attr($attributes['containerId']); ?>"

    style="
        --play-background:<?php echo $play_background; ?>;
        --play-icon-color:<?php echo $play_icon_color; ?>;
        --play-button-size:<?php echo $playButtonSize; ?>">

    <button
        class="play-button"
        data-youtube-id="<?php echo $youtubeId; ?>">

        <div
            class="play-icon-wrap play-icon-custom"
            style="
                width:<?php echo $playButtonSize; ?>;
                height:<?php echo $playButtonSize; ?>">


            <?php
            $iconType = isset($attributes['iconType']) ? $attributes['iconType'] : 'iconPresets';
            $svgContent = isset($attributes['svgContent']) ? $attributes['svgContent'] : '';
            $playButtonStyle = isset($attributes['playButtonStyle']) && is_numeric($attributes['playButtonStyle'])
                ? (int) $attributes['playButtonStyle']
                : 0;

            // Ensure the index is within the bounds of the $svgIcons array
            $svgIcon = $svgIcons[$playButtonStyle] ?? $svgIcons[0];

            if ($iconType === 'custom' && !empty($svgContent)) {
                echo $svgContent;
            } else {
                echo $svgIcon;
            }
            ?>
        </div>
    </button>
    <img
        decoding="async"
        alt="YouTube Video Placeholder"
        class="youtube-placeholder-image"
        src="https://img.youtube.com/vi/<?php echo $youtubeId; ?>/<?php echo $quality; ?>.jpg" />
</div>