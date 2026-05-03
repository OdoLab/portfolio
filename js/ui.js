const UIs = document.querySelectorAll("#UI-cert, #UI-diploma, #UI-project");
UIs.forEach(ui => setupUI(ui));

let activeUI = null;
let offsetX = 0;
let offsetY = 0;

function openUI(btn, uiId) {
    const ui = document.getElementById(uiId);
    const article = btn.closest("article");

    const imgSrc = article.querySelector("img")?.src;
    const title = article.querySelector("h2")?.innerText;

    // Set title if exists
    const titleEl = ui.querySelector(".top-bar-name");
    if (titleEl) titleEl.innerText = title;

    // 🔥 Only set image IF the UI has one
    const imgEl = ui.querySelector("img");
    if (imgEl && imgSrc) {
        imgEl.src = imgSrc;
    }

    ui.style.display = "block";
}

function setupUI(ui) {
    const topBar = ui.querySelector(".top-bar");
    let isFullscreen = false;

    if (topBar) {
        topBar.addEventListener("mousedown", (e) => {
            if (isFullscreen) return;

            activeUI = ui;

            const rect = ui.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        });
    }

    ui.close = function(reset = false) {
        ui.style.display = "none";

        isFullscreen = false;
        ui.classList.remove("fullscreen");

        if (reset) {
            ui.style.left = "150px";
            ui.style.top = "50px";
        }
    };

    ui.toggleFullscreen = function() {
        isFullscreen = !isFullscreen;

        if (isFullscreen) {
            ui.classList.add("fullscreen");
            ui.style.left = "0px";
            ui.style.top = "0px";
            ui.querySelectorAll(".top-bar-actions button").forEach(function(button) {
                button.style.height = "1rem"
                button.style.width = "1rem"
            })
            activeUI = null;
        } else {
            ui.classList.remove("fullscreen");
        }
    };

    const btnClose = ui.querySelector('.action-one');
    const btnFull = ui.querySelector('.action-two');
    const btnReset = ui.querySelector('.action-three');

    if (btnClose) btnClose.onclick = () => ui.close();
    if (btnFull) btnFull.onclick = () => ui.toggleFullscreen();
    if (btnReset) btnReset.onclick = () => ui.close(true);
}

document.addEventListener("mousemove", (e) => {
    if (!activeUI) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = window.innerWidth - activeUI.offsetWidth;
    const maxY = window.innerHeight - activeUI.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    activeUI.style.left = x + "px";
    activeUI.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
    activeUI = null;
});