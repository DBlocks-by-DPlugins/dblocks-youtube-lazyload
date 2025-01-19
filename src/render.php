<div
    <?php
    echo get_block_wrapper_attributes();
    ?>
    id="<?php echo esc_attr($attributes['containerId']); ?>"

    style="
        --play-background:<?php echo esc_attr($attributes['color']); ?>;
        --play-icon-color:<?php echo esc_attr($attributes['textColor']); ?>;
        --play-button-size:<?php echo esc_attr($attributes['playButtonSize']); ?>px">

    <p>mm: <?php echo esc_attr($attributes['urlExtract']); ?></p>

    <button
        class="play-button"
        data-youtube-id="<?php $youtubeId = isset($attributes['urlExtract']) ? esc_attr($attributes['urlExtract']) : '';
                            echo $youtubeId; ?>">

        <div
            class="play-icon-wrap play-icon-custom"
            style="
                width:<?php echo esc_attr($attributes['playButtonSize']); ?>px;
                height:<?php echo esc_attr($attributes['playButtonSize']); ?>px">

            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path
                    d="M24.2423 6.26118C23.967 5.22707 23.3635 4.35177 22.3294 4.07648C20.4552 3.5753 12.7646 3.52942 12.7646 3.52942C12.7646 3.52942 5.07406 3.5753 3.19994 4.07648C2.16582 4.35177 1.56582 5.22707 1.287 6.26118C0.785825 8.1353 0.764648 12 0.764648 12C0.764648 12 0.785825 15.8647 1.287 17.7388C1.5623 18.7729 2.16582 19.6482 3.19994 19.9235C5.07406 20.4247 12.7646 20.4706 12.7646 20.4706C12.7646 20.4706 20.4552 20.4247 22.3294 19.9235C23.3635 19.6482 23.967 18.7729 24.2423 17.7388C24.7435 15.8647 24.7646 12 24.7646 12C24.7646 12 24.7435 8.1353 24.2423 6.26118Z"
                    fill="#800080"></path>
                <path d="M10.2941 15.5294V8.47058L16.647 12L10.2941 15.5294Z" fill="#FFFFFF"></path>
            </svg>

        </div>
    </button>
    <img
        decoding="async"
        alt="YouTube Video Placeholder"
        class="youtube-placeholder-image"
        src="https://img.youtube.com/vi/<?php echo $youtubeId; ?>/<?php echo esc_attr($attributes['quality']); ?>.jpg" />
</div>

<h2>Info:</h2>

<p><?php echo esc_html($attributes['url']); ?></p>
<p><?php echo esc_attr($attributes['containerId']); ?></p>
<p><?php echo esc_attr($attributes['urlExtract']); ?></p>
<p><?php echo esc_attr($attributes['quality']); ?></p>