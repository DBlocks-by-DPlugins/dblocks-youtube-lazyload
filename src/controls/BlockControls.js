import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

const BlockControlsComponent = ({ youtubeId, isEditing, setIsEditing }) => (
    <ToolbarGroup>
        {youtubeId && ( // Show button only if youtubeId is valid
            <ToolbarButton
                icon={isEditing ? 'visibility' : 'edit'}
                label={isEditing ? 'Edit URL' : 'View Image'}
                onClick={() => setIsEditing((current) => !current)}
            />
        )}
    </ToolbarGroup>
);

export default BlockControlsComponent;