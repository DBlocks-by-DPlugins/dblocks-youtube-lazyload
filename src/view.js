document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", function (event) {
        let targetElement = event.target;

        // Loop through the DOM tree to find if the clicked element is a play button or a child of it
        while (targetElement != null) {
            if (
                targetElement.matches(
                    ".dblocks-dblocks-lazyload-for-youtube .play-button"
                )
            ) {
                const youtubeId = targetElement.getAttribute("data-youtube-id");
                const containerId = targetElement.parentElement.id;
                loadYouTubeVideo(youtubeId, containerId);
                return; // Stop the loop and exit the function
            }
            targetElement = targetElement.parentElement;
        }
    });
});

function loadYouTubeVideo(youtubeId, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <iframe 
                style="width: 100%; aspect-ratio: 16/9; position: relative; height: auto;"
                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>`;
    } else {
        console.error("Container not found for ID:", containerId);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    alert("Marko is ready");
});