/** @file File system utilities. */
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Translates a filesystem URL to absolute path.
 * @param {string} url - URL to translate into path.
 * @param {string} subpath - Subpath under URL (can be relative).
 * @returns {string} Absolute path for url.
 */
export const getAbsolutePath = (url, subpath) => {
  // Get absolute directory path for URL
  const __dirname = path.dirname(fileURLToPath(url))
  // If subpath is set, resolve path to subpath and return
  if (subpath) return path.resolve(__dirname, subpath)
  // Return path to URL
  return __dirname
}
