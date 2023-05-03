const targetsToRemove = [];

const followContentTargets = function (elem) {
	// Allows content to be specified as an ID selector, e.g. data-bs-content="#myPopoverContent"
	if (elem.getAttribute('data-bs-css') === 'true') {
		var target = document.querySelector(elem.getAttribute('data-bs-content'));
		if (!targetsToRemove.includes(target)) targetsToRemove.push(target);
		let content = target.cloneNode(true);

		// If the element is hidden, show it.
		content.classList.remove('d-none');
		if (content.classList.length == 0) {
			content.removeAttribute('class');
		}

		elem.setAttribute('data-bs-content', content.outerHTML);
		elem.setAttribute('data-bs-html', true);

		/*
			NOTE: The "style" attribute is removed from the content element by Bootstrap.
			Use CSS classes/ids instead, as those will be preserved.
		*/
	}

	return elem;
}

var popoverTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(followContentTargets(popoverTriggerEl));
});

var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(followContentTargets(tooltipTriggerEl));
});

//  Remove all of the targets from the DOM
targetsToRemove.forEach(function (target) {
	target.remove();
});