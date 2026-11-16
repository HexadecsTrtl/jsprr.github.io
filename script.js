// Highlight the TOC link for the section currently in view
const sections = document.querySelectorAll("[data-section]");
const links = document.querySelectorAll(".toc a");

function setActive(id) {
    links.forEach((a) => {
        const on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
        });
    },
    { rootMargin: "-30% 0px -60% 0px" },
);

sections.forEach((s) => observer.observe(s));

// The last section can be too short to reach the trigger zone
window.addEventListener(
    "scroll",
    () => {
        const atBottom =
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 2;
        if (atBottom) setActive(sections[sections.length - 1].id);
    },
    { passive: true },
);

setActive("top");
