import { qualityOptions, defaultQuality } from '../../utils/qualitySettings';
import { SelectControl, PanelBody, Button } from '@wordpress/components';


export const Thumbnail = ({quality, handleQualityChange, customThumbnail, openMediaLibrary, removeThumbnail}) => {
    return (
        <PanelBody title="Thumbnail" initialOpen={true}>
            <SelectControl
                label="Image Quality"
                value={quality}
                options={qualityOptions}
                onChange={handleQualityChange}
            />
            {customThumbnail ? (
                <>
                    <div className="custom-thumbnail-preview">
                        <img
                            src={customThumbnail}
                            alt="Custom Thumbnail Preview"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                        <div className="custom-thumbnail-preview__buttons">
                            <Button className='editor-post-featured-image__toggle editor-post-featured-image__toggle' onClick={openMediaLibrary}>Replace</Button>
                            <Button className='editor-post-featured-image__toggle editor-post-featured-image__toggle' onClick={removeThumbnail}>Remove</Button>
                        </div>
                    </div>
                </>
            ) : (
                <Button className='editor-post-featured-image__toggle editor-post-featured-image__toggle' onClick={openMediaLibrary}>Add Custom Thumbnail</Button>
            )}
        </PanelBody>
    )
}
