/**
 *
 * @param imageUrl lh3.googleusercontent.com image url
 * @param options Here's the full parameters list for providing different
 * functions with magic URL
 *
 * SIZE / CROP
 *  s640 — generates image 640 pixels on largest dimension
 *  s0 — original size image
 *  w100 — generates image 100 pixels wide
 *  h100 — generates image 100 pixels tall
 *  s (without a value) — stretches image to fit dimensions
 *  c — crops image to provided dimensions
 *  n — same as c, but crops from the center
 *  p — smart square crop, attempts cropping to faces
 *  pp — alternate smart square crop, does not cut off faces (?)
 *  cc — generates a circularly cropped image
 *  ci — square crop to smallest of: width, height, or specified =s parameter
 *  nu — no-upscaling. Disables resizing an image to larger than its original
 * resolution.
 * ROTATION
 *  fv — flip vertically
 *  fh — flip horizontally
 *  r{90, 180, 270} — rotates image 90, 180, or 270 degrees clockwise
 * IMAGE FORMAT
 *  rj — forces the resulting image to be JPG
 *  rp — forces the resulting image to be PNG
 *  rw — forces the resulting image to be WebP
 *  rg — forces the resulting image to be GIF
 *  v{0,1,2,3} — sets image to a different format option (works with JPG and WebP)
 * ANIMATED GIFs
 *  rh — generates an MP4 from the input image
 *  k — kill animation (generates static image)
 * Filters
 *  fSoften=1,100,0: - where 100 can go from 0 to 100 to blur the image
 *  fVignette=1,100,1.4,0,000000 where 100 controls the size of the gradient and
 * 000000 is RRGGBB of the color of the border shadow
 *  fInvert=0,1 inverts the image regardless of the value provided
 *  fbw=0,1 makes the image black and white regardless of the value provided
 * MISC.
 *  b10 — add a 10px border to image
 *  c0xAARRGGBB — set border color, eg. =c0xffff0000 for red
 *  d — adds header to cause browser download
 *  e7 — set cache-control max-age header on response to 7 days
 *  l100 — sets JPEG quality to 100% (1-100)
 *  h — responds with an HTML page containing the image
 *  g — responds with XML used by Google's pan/zoom

 * @returns an image url with magic options
 */
export function getGoogleMagicUrl(imageUrl: string, options: string) {
  return `${imageUrl}=${options}`;
}

export function getGoogleImage(imageUrl: string, options: string) {
  if (!imageUrl.includes("https://lh3.googleusercontent.com")) {
    return imageUrl;
  }
  return getGoogleMagicUrl(imageUrl.split("?")[0], options);
}
