// Shared shapes for the analytics dashboard.
// A value of null means "not available from the source", the UI renders it as ממתין.

export type TopPost = {
  title: string;
  type: string; // רייל / קרוסלה / פוסט
  views: number | null;
  saves: number | null;
  shares: number | null;
  comments: number | null;
  reach: number | null;
  permalink?: string;
};

export type InstagramData = {
  followers: number | null;
  views: number | null;
  reach: number | null;
  interactions: number | null;
  saves: number | null;
  shares: number | null;
  comments: number | null;
  daily_reach: { date: string; reach: number }[];
  top_posts: TopPost[];
};

export type WebsiteData = {
  visitors: number | null;
  pageviews: number | null;
  bounce_rate: number | null; // not exposed by the Vercel API, stays null for now
  daily: { date: string; visitors: number; pageviews: number }[];
  top_pages: { path: string; pageviews: number; visitors: number }[];
  sources: { name: string; visitors: number }[];
};

export type Narrative = {
  worked: string[];
  strengthen: string[];
  suggestions: string[];
};

export type Snapshot = {
  captured_at: string;
  since: string;
  until: string;
  instagram: InstagramData;
  website: WebsiteData;
  narrative: Narrative | null;
};
