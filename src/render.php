<div
    <?php
    echo get_block_wrapper_attributes();

    $play_icon_color = isset($attributes['textColor']) ? esc_attr($attributes['textColor']) : '#FFFFFF';
    $play_background = isset($attributes['color']) ? esc_attr($attributes['color']) : '#800080';

    include 'icons.php';

    ?>
    id="<?php echo esc_attr($attributes['containerId']); ?>"

    style="
        --play-background:<?php echo esc_attr($attributes['color']); ?>;
        --play-icon-color:<?php echo esc_attr($attributes['textColor']); ?>;
        --play-button-size:<?php echo esc_attr($attributes['playButtonSize']); ?>px">

    <button
        class="play-button"
        data-youtube-id="<?php $youtubeId = isset($attributes['urlExtract']) ? esc_attr($attributes['urlExtract']) : '';
                            echo $youtubeId; ?>">

        <div
            class="play-icon-wrap play-icon-custom"
            style="
                width:<?php echo esc_attr($attributes['playButtonSize']); ?>;
                height:<?php echo esc_attr($attributes['playButtonSize']); ?>">


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
        src="https://img.youtube.com/vi/<?php echo $youtubeId; ?>/<?php echo esc_attr($attributes['quality']); ?>.jpg" />
</div>