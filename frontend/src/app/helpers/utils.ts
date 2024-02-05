/**
 * The function `joinUrlSegments` takes multiple segments as input and returns a string by joining them
 * together with forward slashes, removing any leading or trailing slashes from each segment.
 * @param {string[]} segments - An array of strings representing the segments of a URL.
 * @returns The function `joinUrlSegments` returns a string.
 */
export const joinUrlSegments = (...segments: string[]): string => {
  return segments.map((segment) => segment.replace(/^\/+|\/+$/g, '')).join('/');
};
