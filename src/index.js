import { registerBlockType, createBlock } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import metadata from "./block.json";

registerBlockType(metadata.name, {
    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/embed"],
                transform: (attributes) => {
                    const { url } = attributes;
                    if (
                        url &&
                        (url.includes("youtube.com") ||
                            url.includes("youtu.be"))
                    ) {
                        return createBlock("dblocks/dblocks-lazyload-for-youtube", {
                            url,
                        });
                    }
                    return createBlock("core/embed", attributes);
                },
            },
            {
                type: 'block',
                blocks: ['create-block/dp-lazy-youtube'],
                transform: (attributes) => {
                    return createBlock('dblocks/dblocks-lazyload-for-youtube', {
                        ...attributes
                    });
                },
            }
        ],
    },

    edit: Edit,
});

// Register the legacy block name so the editor recognizes old blocks
// and allows transforming them to the new block
registerBlockType('create-block/dp-lazy-youtube', {
    title: 'Youtube LazyLoad (Legacy)',
    icon: 'video-alt3',
    category: 'dblocks',
    attributes: metadata.attributes,
    edit: ({ attributes }) => {
        const el = wp.element.createElement;
        return el('div', { style: { padding: '20px', background: '#f0f0f0', border: '1px solid #ccc' } },
            el('p', null, 'This is a legacy YouTube LazyLoad block.'),
            el('p', null, 'Use the block toolbar to transform it to the new "Youtube LazyLoad" block.')
        );
    },
    save: () => null,
});
