import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');

	if (!query) {
		return json({ error: 'Query parameter is required' }, { status: 400 });
	}

	try {
		const response = await fetch(
			`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`,
			{
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
				}
			}
		);

		if (!response.ok) {
			return json({ error: 'Failed to fetch suggestions' }, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching suggestions:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
