const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

const lenis = typeof Lenis !== "undefined"
    ? new Lenis({
        autoRaf: true,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        anchors: false
    })
    : null;

function scrollToTarget(target) {
    const topbar = document.querySelector(".topbar");
    const offset = topbar ? -topbar.offsetHeight : 0;

    if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
    }

    const destination = typeof target === "string" ? document.querySelector(target) : target;
    if (destination) {
        destination.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = link.getAttribute("href");
        if (!target || target === "#") return;
        if (!document.querySelector(target)) return;
        event.preventDefault();
        scrollToTarget(target);
    });
});

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

const menuButton = document.querySelector(".menu-mobile");
const mobileMenu = document.querySelector(".mobile-menu");


menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    mobileMenu.classList.toggle("active");

});



document.querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menuButton.classList.remove("active");

            mobileMenu.classList.remove("active");

        });

    });
