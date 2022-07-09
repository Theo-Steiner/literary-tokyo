import type { Locations, LongLat } from '$lib/types/derived-types';

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

export function convertToPointString(pointsArray: number[][]) {
	let pointstring = '';
	for (const point of pointsArray) {
		pointstring += `${point[0]},${point[1]};`;
	}
	return pointstring;
}

export function convertToPointsArray(pointString: string) {
	const pointsArray = pointString.split(';');
	return pointsArray.reduce((prev: number[][], point) => {
		if (point) {
			const coordinates = point.split(',');
			return [...prev, [parseFloat(coordinates[0]), parseFloat(coordinates[1])]];
		} else return prev;
	}, []);
}

export function getPointsArrayFromLocations(points: string[], locations: Locations): LongLat[] {
	const pointsArray = points.map((point) => {
		if (point.includes(';')) {
			return convertToPointsArray(point);
		}
		const location = locations.find((location) => location.id === Number(point));
		if (location) {
			return [Number(location.longitude), Number(location.latitude)];
		}
		throw new Error(`Location with id ${point} not found. `);
	});
	return pointsArray as LongLat[];
}
