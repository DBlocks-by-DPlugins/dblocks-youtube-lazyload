# CLAUDE.md - Lazy Load for YouTube by DBlocks

## Plugin overview

WordPress block plugin (`dblocks/dblocks-lazyload-for-youtube`) that replaces YouTube embeds with a lightweight placeholder image. The YouTube iframe only loads when the user clicks play (GDPR friendly).

**Legacy block name:** `create-block/dp-lazy-youtube` (migrated automatically via `inc/migration.php` content filter and editor-side transforms in `src/index.js`).

## Architecture

```
src/index.js          → Block registration, transforms (core/embed, legacy block)
src/edit.js           → Editor React component + Redux store (dblocks/global-settings)
src/render.php        → Server-side HTML output (placeholder image + play button)
src/view.js           → Frontend JS (injects YouTube iframe on click)
src/block.json        → Block metadata, attributes, asset declarations
inc/api.php           → REST API: GET/POST /dblocks-lazyload-for-youtube/v1/global-settings
inc/block-registration.php → register_block_type() + nonce localization
inc/category.php      → Registers "dblocks" block category
inc/migration.php     → Legacy block name replacement in the_content filter (priority 5)
```

### Global settings

Stored in `wp_options` with `dblocks_` prefix (color, textColor, playButtonSize, playButtonStyle, iconType, svgContent, minHeight). Managed via REST API in `inc/api.php` and synced to a custom Redux store in `src/edit.js`.

### Block attributes

url, containerId, quality, playButtonSize, playButtonStyle, color, textColor, iconType, svgContent, urlExtract, customThumbnail.

### CSS custom properties

`--play-background`, `--play-icon-color`, `--play-button-size` — set inline on the block wrapper in both `render.php` and `edit.js`.

## Build

```bash
npm run build          # Production build (wp-scripts build --webpack-copy-php)
npm run start          # Dev with watch
npm run hot            # Dev with HMR
```

The `--webpack-copy-php` flag copies `render.php`, `icons.php`, and `block.json` from `src/` to `build/`. The `build/` directory is committed.

## Release process

**All four steps are required for a WordPress.org release:**

1. Bump version in: `dblocks-lazyload-for-youtube.php` (plugin header), `readme.txt` (Stable tag), and add a changelog entry in `readme.txt`
2. Run `npm run build`
3. Commit and push to `main`
4. **Create and push a git tag** matching the version (e.g. `git tag 1.3.2 && git push origin 1.3.2`)

The tag triggers two GitHub Actions workflows:
- `wp-svn.yaml` — deploys to WordPress.org SVN (requires `SVN_USERNAME`/`SVN_PASSWORD` secrets)
- `release.yml` — creates a GitHub Release with a ZIP (requires `WPSCRIPTSTOKEN` secret)

The `wp-readme.yml` workflow syncs readme/assets to WordPress.org on pushes to `main` (no tag needed).

## Coding conventions

- **PHP functions:** prefix with `dblocks_youtube_` (e.g. `dblocks_youtube_get_global_settings`)
- **REST namespace:** `dblocks-lazyload-for-youtube/v1`
- **Block category:** `dblocks`
- **Security:** Nonce verification via `X-WP-Nonce` header, `edit_posts` capability check, `esc_attr()` for output escaping, SVG sanitization via `@mattkrick/sanitize-svg`
- **Components:** organized by function under `src/components/` (BlockControls, InspectorControls) and `src/controls/`
- **Utilities:** pure functions in `src/utils/` (api.js, youtubeHelpers.js, qualitySettings.js)

## Transform rules

Block transforms (`src/index.js`) must:
- Use `isMatch` to gate which source blocks show the transform option
- Always return a block of the **target** type from the `transform` function (never the source type)

## Key files for common tasks

| Task | Files |
|---|---|
| Add/change block attribute | `src/block.json`, `src/edit.js`, `src/render.php` |
| Change play button styles | `src/components/svgIcons.js`, `src/icons.php` |
| Change frontend behavior | `src/view.js` |
| Change global settings | `inc/api.php`, `src/edit.js` (store), `src/utils/api.js` |
| Change sidebar controls | `src/controls/InspectorControls.js`, `src/components/InspectorControls/` |
| Change toolbar controls | `src/controls/BlockControls.js` |
