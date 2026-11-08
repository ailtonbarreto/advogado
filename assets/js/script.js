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
