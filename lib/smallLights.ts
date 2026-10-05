// SMALL LIGHTS: the media lives on the project's existing host (Vercel project opus55-animated-short-site, deployed
// from the private production repository). This site serves only the pages, subtitles and small images.
export const SL_MEDIA = "https://opus55-animated-short-site.vercel.app";
export const SL_FILM_NARRATED = `${SL_MEDIA}/film/SMALL_LIGHTS_narrated_1080p_web.mp4`;
export const SL_FILM_ORIGINAL = `${SL_MEDIA}/film/SMALL_LIGHTS_1080p_web.mp4`;
/** The approved Reel v4 (creative lock 30 Sep 2026), published unchanged. */
export const SL_REEL = `${SL_MEDIA}/reel/SMALL_LIGHTS_REEL_v4_READY.mp4`;
/** Same file, served with Content-Disposition: attachment so a phone saves it instead of playing it. */
export const SL_REEL_DOWNLOAD = `${SL_MEDIA}/download/SMALL_LIGHTS_REEL_v4_READY.mp4`;
export const SL_REEL_POSTER = "/small-lights/reel-poster.jpg";
/** false until the approved reel file is verified (sha256) and live on the media host. */
export const SL_REEL_LIVE = false;
