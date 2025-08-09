/** @file Status controller. */

/**
 * API Status controller class.
 */
export default class StatusController {
  /**
   * Prints a status message.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {void}
   */
  status = (req, res) => res.json({ message: "The API is up!" })
}
