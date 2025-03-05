import {
    TextControl,
    SelectControl,
    PanelBody,
    Button,
    DropZone,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import PlayerStyleButtons from '../playButtonPresets.js';
import { PanelColorSettings, HeightControl } from '@wordpress/block-editor';



export const PlayerIcon = (
    {
        iconType,
        handleChange,
        handlePlayerStyleChange,
        globalSettings,
        color,
        textColor,
        svgContent,
        hasDropped,
        setHasDropped,
        handleRemoveIcon,
        playButtonSize,
        handleDrop
    }
) => {

    return (
        <PanelBody title="Player Icon" initialOpen={true}>
            <ToggleGroupControl
                label="Icon Type"
                value={iconType}
                onChange={(value) => handleChange('iconType', value)}
                isBlock
                __nextHasNoMarginBottom
                __next40pxDefaultSize
            >
                <ToggleGroupControlOption value="iconPresets" label="Icon Presets" />
                <ToggleGroupControlOption value="custom" label="Custom SVG" />
            </ToggleGroupControl>

            {iconType === 'iconPresets' && (
                <PlayerStyleButtons
                    handlePlayerStyleChange={handlePlayerStyleChange}
                    initialStyleIndex={globalSettings.playButtonStyle}
                    color={color}
                    textColor={textColor}
                />
            )}

            {iconType === 'custom' && !svgContent && !hasDropped && (
                <div className="drop-zone-wrapper">
                    {hasDropped ? 'Dropped!' : 'Drop something here'}
                    <DropZone
                        onFilesDrop={handleDrop}
                        onHTMLDrop={() => setHasDropped(true)}
                        onDrop={() => setHasDropped(true)}
                    />
                </div>
            )}

            {iconType === 'custom' && hasDropped && svgContent && (
                <div className="svg-preview-wrapper">
                    <div className="svg-preview drop-zone-wrapper" dangerouslySetInnerHTML={{ __html: svgContent }} />
                    <Button
                        variant="secondary"
                        onClick={handleRemoveIcon}
                    >
                        Remove Icon
                    </Button>
                </div>
            )}

            <HeightControl
                label="Size"
                value={playButtonSize || '64px'}
                onChange={(value) => handleChange('playButtonSize', value)}
            />

            {iconType === 'iconPresets' && (
                <PanelColorSettings
                    className="color-settings-youtubelazyload"
                    title="Color Settings"
                    colorSettings={[
                        {
                            value: textColor,
                            onChange: (value) => handleChange('textColor', value),
                            label: 'Play Color',
                        },
                        {
                            value: color,
                            onChange: (value) => handleChange('color', value),
                            label: 'Play Background Color',
                        },
                    ]}
                />
            )}
        </PanelBody>
    )
}
