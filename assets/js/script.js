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

const scrollRevealSections = document.querySelectorAll(".practice, .about, #contato");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (scrollRevealSections.length && "IntersectionObserver" in window && !prefersReducedMotion) {
	document.documentElement.classList.add("has-scroll-reveal");

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const viewportHeight = entry.rootBounds ? entry.rootBounds.height : window.innerHeight;
			const visibleSectionHeight = Math.min(entry.boundingClientRect.height, viewportHeight);
			const visibleRatio = visibleSectionHeight
				? entry.intersectionRect.height / visibleSectionHeight
				: 0;

			entry.target.classList.toggle("is-visible", entry.isIntersecting && visibleRatio > 0.7);
		});
	}, { threshold: Array.from({ length: 101 }, (_, index) => index / 100) });

	scrollRevealSections.forEach((section) => sectionObserver.observe(section));
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
