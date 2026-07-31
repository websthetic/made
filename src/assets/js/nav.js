/*-- -------------------------- -->
<---      Nav Dropdowns         -->
<--- -------------------------- -*/

(function () {
    const nav = document.querySelector("#cs-navigation");
    if (!nav) return;

    const dropdowns = Array.from(nav.querySelectorAll(".cs-dropdown"));
    if (!dropdowns.length) return;

    const desktop = window.matchMedia("(min-width: 1024px)");

    function openDrop(dd) {
        dd.classList.add("cs-drop-open");
        dd.querySelector(".cs-drop-button").setAttribute("aria-expanded", "true");
    }

    function closeDrop(dd) {
        dd.classList.remove("cs-drop-open");
        dd.querySelector(".cs-drop-button").setAttribute("aria-expanded", "false");
    }

    function closeAll(except) {
        dropdowns.forEach(function (dd) {
            if (dd !== except) closeDrop(dd);
        });
    }

    dropdowns.forEach(function (dd) {
        const button = dd.querySelector(".cs-drop-button");

        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dd.classList.contains("cs-drop-open");
            closeAll(dd);
            isOpen ? closeDrop(dd) : openDrop(dd);
        });

        // Hover only applies on desktop
        dd.addEventListener("mouseenter", function () {
            if (desktop.matches) {
                closeAll(dd);
                openDrop(dd);
            }
        });

        dd.addEventListener("mouseleave", function () {
            if (desktop.matches) closeDrop(dd);
        });

        // Tabbing out of the panel closes it
        dd.addEventListener("focusout", function (e) {
            if (desktop.matches && !dd.contains(e.relatedTarget)) closeDrop(dd);
        });
    });

    // Click anywhere else closes everything
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".cs-dropdown")) closeAll();
    });

    // Escape closes and returns focus to the trigger
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        const open = nav.querySelector(".cs-dropdown.cs-drop-open");
        if (!open) return;
        closeDrop(open);
        open.querySelector(".cs-drop-button").focus();
    });

    // Closing the mobile menu resets any open accordion
    const toggle = nav.querySelector(".cs-toggle");
    if (toggle) toggle.addEventListener("click", function () { closeAll(); });

    // Crossing the breakpoint mid-session leaves stale state otherwise
    desktop.addEventListener("change", function () { closeAll(); });
})();