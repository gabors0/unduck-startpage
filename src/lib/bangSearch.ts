type BangEntry = { t: string; s: string; d: string; c: string; r: number };

let bangsData: BangEntry[] | null = null;
let loadPromise: Promise<BangEntry[]> | null = null;

async function loadBangs(): Promise<BangEntry[]> {
  if (bangsData) return bangsData;
  if (!loadPromise) {
    loadPromise = fetch("/data/bangs.json")
      .then((r) => r.json())
      .then((data: BangEntry[]) => {
        bangsData = data;
        return data;
      });
  }
  return loadPromise;
}

export async function searchBangs(q: string): Promise<BangEntry[]> {
  if (!q) return [];
  const bangs = await loadBangs();
  const query = q.toLowerCase();

  const exact: BangEntry[] = [];
  const prefix: BangEntry[] = [];
  const site: BangEntry[] = [];

  for (const bang of bangs) {
    // t and s are pre-lowercased in the static JSON
    if (bang.t === query) {
      exact.push(bang);
    } else if (bang.t.startsWith(query)) {
      prefix.push(bang);
    } else if (bang.s.includes(query)) {
      site.push(bang);
    }
  }

  prefix.sort((a, b) => b.r - a.r);
  site.sort((a, b) => b.r - a.r);

  return [...exact, ...prefix, ...site].slice(0, 5);
}
