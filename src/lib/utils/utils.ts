export function generateSlug(title: string) {
	const slug = encodeURI(bijectiveToLowerCase(title).replace(/\s/g, '-'));
	return slug;
}

export function getProjectTitleFromSlug(slug: string) {
	const title = restoreOriginalCase(decodeURI(slug).replace(/-/g, ' '));
	return title;
}

// To make lower case conversion bijective, lower case letters are prefixed with an underscore.
function bijectiveToLowerCase(str: string) {
	let bijectiveLowerCase = '';
	for (const char of str) {
		if (char.toLowerCase() !== char) {
			bijectiveLowerCase += `_${char.toLowerCase()}`;
		} else {
			bijectiveLowerCase += char;
		}
	}
	return bijectiveLowerCase;
}

function restoreOriginalCase(lowerCaseString: string) {
	let originalCase = '';
	let shift = false;
	for (const char of lowerCaseString) {
		if (char === '_') {
			shift = true;
		} else {
			originalCase += shift ? char.toUpperCase() : char;
			shift = false;
		}
	}
	return originalCase;
}
