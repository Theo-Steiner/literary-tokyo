import supabase from '$lib/utils/supabase';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const { data, error } = await supabase.from('projects').select('*').eq('is_published', true);
	if (error) {
		return { status: 400, body: { error } };
	}
	return {
		body: {
			publishedProjects: data
		}
	};
};
