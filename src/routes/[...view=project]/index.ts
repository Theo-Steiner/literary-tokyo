import type { Project, Locations, Works, Visualizations } from '$lib/types/derived-types';
import supabase from '$lib/utils/supabase';
import { getProjectTitleFromSlug } from '$lib/utils/utils';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

interface ProjectJoin extends Project {
	locations: Locations;
	works: Works;
	visualizations: Visualizations;
}

// This returns an error if Location["tags"] is of type unknown.
export const get: RequestHandler = async ({
	params
}): Promise<
	RequestHandlerOutput<
		| { project: Project; locations: Locations; works: Works; visualizations: Visualizations }
		| { error: string }
	>
> => {
	const [projectSlug, ...slugs] = params.view.split('/');
	console.log(slugs);
	const projectTitle = getProjectTitleFromSlug(projectSlug);
	const { data, error } = await supabase
		.from<ProjectJoin>('projects')
		.select('*, works (*), locations (*), visualizations (*)')
		.eq('title', projectTitle);
	if (data) {
		// TODO: get the selected visualization from the slug
		const [{ title, id, created_at, author, user_id, works, locations, visualizations }] = data;
		return {
			body: {
				projectSlug,
				project: { title, id, created_at, author, user_id },
				works,
				locations,
				visualizations
			}
		};
	}
	return { status: 404, body: { error: error.message } };
};
