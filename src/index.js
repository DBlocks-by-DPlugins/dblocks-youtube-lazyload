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
        ],
    },

    edit: Edit,
});
