const menu = document.getElementById("menu");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const currentYear = document.getElementById("currentYear");

function setMenuOpen(isOpen) {
	const wasOpen = menu.classList.contains("is-open");
	menu.classList.toggle("is-open", isOpen);
	document.body.classList.toggle("menu-open", isOpen);
	openMenu.setAttribute("aria-expanded", String(isOpen));

	if (isOpen) {
		closeMenu.focus();
	} else if (wasOpen && window.matchMedia("(max-width: 680px)").matches) {
		openMenu.focus();
	}
}

openMenu.addEventListener("click", () => setMenuOpen(true));
closeMenu.addEventListener("click", () => setMenuOpen(false));

menu.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && menu.classList.contains("is-open")) {
		setMenuOpen(false);
	}
});

currentYear.textContent = new Date().getFullYear();

const practiceCards = document.querySelectorAll(".practice-card");
const aboutRevealTargets = document.querySelectorAll(".about-image, .about-content");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ((practiceCards.length || aboutRevealTargets.length) && "IntersectionObserver" in window && !prefersReducedMotion) {
	document.documentElement.classList.add("has-scroll-reveal");

	const cardObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("is-visible", entry.isIntersecting);
		});
	}, { threshold: 0.05, rootMargin: "12% 0px 12% 0px" });

	[...practiceCards, ...aboutRevealTargets].forEach((target) => cardObserver.observe(target));
}

const scalesModel = document.getElementById("scalesModel");
const cameraOrbitDistance = () => window.matchMedia("(max-width: 680px)").matches ? "112%" : "100%";

if (scalesModel) {
	scalesModel.setAttribute("camera-orbit", `0deg 75deg ${cameraOrbitDistance()}`);
	window.addEventListener("resize", () => {
		scalesModel.setAttribute("camera-orbit", `0deg 75deg ${cameraOrbitDistance()}`);
	});

	if (!prefersReducedMotion) {
		scalesModel.setAttribute("rotation-per-second", "8deg");
		scalesModel.setAttribute("auto-rotate", "");
	}
}
