/*
	Rozszyfruj Psa - section nav scrollspy
	Highlights the nav entry for the section currently in view.
*/

(function () {

	var nav = document.getElementById('section-nav');

	if (!nav || !('IntersectionObserver' in window))
		return;

	var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')),
		entries = [];

	links.forEach(function (link) {

		var section = document.querySelector(link.getAttribute('href'));

		if (section)
			entries.push({ link: link, section: section });

	});

	if (!entries.length)
		return;

	var current = null;

	function activate(entry) {

		if (current === entry)
			return;

		if (current)
			current.link.classList.remove('active');

		entry.link.classList.add('active');
		current = entry;

	}

	// Pick the entry closest to the top of the viewport among those intersecting.
	var visible = [];

	var observer = new IntersectionObserver(function (observed) {

		observed.forEach(function (record) {

			var entry = entries.filter(function (item) {
					return item.section === record.target;
				})[0],
				index = visible.indexOf(entry);

			if (record.isIntersecting) {
				if (index === -1)
					visible.push(entry);
			}
			else if (index !== -1)
				visible.splice(index, 1);

		});

		if (!visible.length)
			return;

		var best = visible.reduce(function (a, b) {
			return Math.abs(a.section.getBoundingClientRect().top) < Math.abs(b.section.getBoundingClientRect().top) ? a : b;
		});

		activate(best);

	}, {
		rootMargin: '-45% 0px -45% 0px',
		threshold: 0
	});

	entries.forEach(function (entry) {
		observer.observe(entry.section);
	});

})();
