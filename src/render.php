<div
    <?php
    echo get_block_wrapper_attributes();

    $svgIcons = [

        '<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M24.2423 6.26118C23.967 5.22707 23.3635 4.35177 22.3294 4.07648C20.4552 3.5753 12.7646 3.52942 12.7646 3.52942C12.7646 3.52942 5.07406 3.5753 3.19994 4.07648C2.16582 4.35177 1.56582 5.22707 1.287 6.26118C0.785825 8.1353 0.764648 12 0.764648 12C0.764648 12 0.785825 15.8647 1.287 17.7388C1.5623 18.7729 2.16582 19.6482 3.19994 19.9235C5.07406 20.4247 12.7646 20.4706 12.7646 20.4706C12.7646 20.4706 20.4552 20.4247 22.3294 19.9235C23.3635 19.6482 23.967 18.7729 24.2423 17.7388C24.7435 15.8647 24.7646 12 24.7646 12C24.7646 12 24.7435 8.1353 24.2423 6.26118Z" fill="blue"/>
            <path d="M10.2941 15.5294V8.47058L16.647 12L10.2941 15.5294Z" fill="lime"/>
        </svg>',

        '<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <circle cx="12.353" cy="12" r="11.2941" fill="blue"/>
            <path d="M9.88232 15.5294V8.47058L16.2353 12L9.88232 15.5294Z" fill="lime"/>
        </svg>',

        '<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <rect x="0.176392" width="24" height="24" fill="blue"/>
            <path d="M6.5293 19.0588V4.94116L19.2352 12L6.5293 19.0588Z" fill="lime"/>
        </svg>',

        '<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <rect x="0.470581" width="24" height="24" rx="2.82353" fill="blue"/>
            <path d="M6.82349 18.3096V5.69037C6.82349 4.88109 7.69454 4.37098 8.40034 4.76692L19.6479 11.0765C20.369 11.481 20.369 12.5189 19.6479 12.9234L8.40034 19.2331C7.69454 19.629 6.82349 19.1189 6.82349 18.3096Z" fill="lime"/>
        </svg>',

        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M0.705933 24V0L22.7059 12L0.705933 24Z" fill="blue"/>
        </svg>',

        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1.76471 21.6157V2.3843C1.76471 1.31128 2.91446 0.630508 3.8553 1.14645L21.3898 10.7621C22.3671 11.2981 22.3671 12.7019 21.3898 13.2379L3.8553 22.8535C2.91446 23.3695 1.76471 22.6887 1.76471 21.6157Z" fill="blue"/>
        </svg>',
    ];

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
            // Sanitize and validate the playButtonStyle attribute
            $playButtonStyle = isset($attributes['playButtonStyle']) && is_numeric($attributes['playButtonStyle'])
                ? (int) $attributes['playButtonStyle']
                : 0;

            // Ensure the index is within the bounds of the $svgIcons array
            $svgIcon = $svgIcons[$playButtonStyle] ?? $svgIcons[0];

            // Echo the SVG icon
            echo $svgIcon;
            ?>
        </div>
    </button>
    <img
        decoding="async"
        alt="YouTube Video Placeholder"
        class="youtube-placeholder-image"
        src="https://img.youtube.com/vi/<?php echo $youtubeId; ?>/<?php echo esc_attr($attributes['quality']); ?>.jpg" />
</div>

<pre style="font-size: 12px;">
    <code>
        <?php echo esc_html($attributes['url']); ?> </br>
        <?php echo esc_attr($attributes['urlExtract']); ?> </br>
        <?php echo esc_attr($attributes['containerId']); ?> </br>
        <?php echo esc_attr($attributes['quality']); ?> </br>
        <?php echo esc_attr($attributes['playButtonStyle']); ?> </br>
        <?php echo esc_attr($attributes['iconType']); ?> </br>
        <?php echo esc_attr($attributes['svgContent']); ?> </br>
    </code>
</pre>