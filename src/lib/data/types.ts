export type MentionedPlace = {
	tags: string[];
	name: string;
	character: string;
	time: string;
	annotation?: string;
	quote: string;
	page: number;
	chapter: string;
};

type Coordinates = {
	latitude: number;
	longitude: number;
};

interface MentionedPoint extends MentionedPlace {
	point: Coordinates;
}

interface MentionedArea extends MentionedPlace {
	center: Coordinates;
	radius: number;
}

interface MentionedPath extends MentionedPlace {
	points: Coordinates[];
}

type Book = {
	title: string;
	points: MentionedPoint[];
	areas: MentionedArea[];
	paths: MentionedPath[];
};

type Visualization = {
	//TODO
	name: string;
};

export type Project = {
	books: Book[];
	visualizations: Visualization[];
};
