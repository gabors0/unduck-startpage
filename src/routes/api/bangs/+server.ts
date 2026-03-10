import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { bangs } from '$lib/data/bangs';

export const GET: RequestHandler = async ({ url }) => {
	const q = (url.searchParams.get('q') ?? '').toLowerCase();

	if (!q) {
		return json([]);
	}

	const exactMatches: typeof bangs = [];
	const prefixMatches: typeof bangs = [];
	const siteMatches: typeof bangs = [];

	for (const bang of bangs) {
		const trigger = bang.t.toLowerCase();
		const site = bang.s.toLowerCase();

		if (trigger === q) {
			exactMatches.push(bang);
		} else if (trigger.startsWith(q)) {
			prefixMatches.push(bang);
		} else if (site.includes(q)) {
			siteMatches.push(bang);
		}
	}

	prefixMatches.sort((a, b) => b.r - a.r);
	siteMatches.sort((a, b) => b.r - a.r);

	const results = [...exactMatches, ...prefixMatches, ...siteMatches].slice(0, 5);

	return json(results.map(({ t, s, d, c }) => ({ t, s, d, c })));
};
