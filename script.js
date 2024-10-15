// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const gems = document.querySelectorAll('.gem');
    const walterContainer = document.getElementById('walter-container');

    let draggedGem = null;

    // Add dragstart event to gems
    gems.forEach(gem => {
        gem.addEventListener('dragstart', (e) => {
            draggedGem = e.target.cloneNode(true);
            draggedGem.classList.add('dropped-gem');
            e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
        });
    });

    // Prevent default dragover behavior
    walterContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Handle drop event
    walterContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedGem) {
            // Get the position where the gem is dropped
            const rect = walterContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - (draggedGem.width / 2);
            const y = e.clientY - rect.top - (draggedGem.height / 2);

            // Set position
            draggedGem.style.left = `${x}px`;
            draggedGem.style.top = `${y}px`;

            // Add event listeners for the dropped gem
            addDragFunctionality(draggedGem);

            // Append to the container
            walterContainer.appendChild(draggedGem);

            // Reset draggedGem
            draggedGem = null;
        }
    });

    // Function to make dropped gems draggable within the container
    function addDragFunctionality(element) {
        let offsetX, offsetY;
        let isDragging = false;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = walterContainer.getBoundingClientRect();
                let x = e.clientX - rect.left - offsetX;
                let y = e.clientY - rect.top - offsetY;

                // Constrain within the container
                x = Math.max(0, Math.min(x, walterContainer.clientWidth - element.clientWidth));
                y = Math.max(0, Math.min(y, walterContainer.clientHeight - element.clientHeight));

                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
});
