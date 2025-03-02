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
                        return createBlock("dblocks/lazyload-for-youtube", {
                            url,
                        });
                    }
                    return createBlock("core/embed", attributes);
                },
            },
        ],

        from: [
			{
				type: 'block',
				blocks: ['create-block/dp-lazy-youtube'],
				transform: (attributes) => {
					return createBlock('dblocks/lazyload-for-youtube', {
						...attributes
					});
				},
			},
		],
    },

    edit: Edit,
});
