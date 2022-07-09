import type { definitions } from './supabase';

export type Project = definitions['projects'];
export type Projects = Project[];
export type Work = definitions['works'];
export type Works = Work[];
export interface Location extends Omit<definitions['locations'], 'tags'> {
	tags: string[];
}
export type Locations = Location[];
export interface Visualization extends Omit<definitions['visualizations'], 'points'> {
	points: string[];
}

export type Visualizations = Visualization[];

export type LongLat = [number, number];

export interface MappedVisualization extends Omit<Visualization, 'points'> {
	points: LongLat[];
}
export type MappedVisualizations = MappedVisualization[];
