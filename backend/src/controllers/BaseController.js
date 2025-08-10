/** @file Base controller class. */
import { StatusCodes } from "http-status-codes"

/**
 * BaseController class providing common controller operations.
 */
export default class BaseController {
  /**
   * Creates an instance of BaseController.
   * @param {object} service - Service instance to handle business logic.
   */
  constructor(service) {
    this.service = service
  }

  /**
   * Handle errors and send appropriate HTTP responses.
   * @param {object} e - Error object.
   * @param {*} res - Response object.
   * @returns {void}
   */
  #handleError = (e, res) => {
    if (e.statusCode) {
      return res.status(e.statusCode).json({ error: e.message })
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message })
  }

  /**
   * Get all entities.
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   */
  getAll = async (req, res) => {
    try {
      const items = await this.service.findAll({ show: req.query.show })
      res.json(items)
    } catch (e) {
      this.#handleError(e, res)
    }
  }

  /**
   * Get an entity by ID.
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @returns {Promise<void>}
   */
  getById = async (req, res) => {
    try {
      const item = await this.service.findById(req.params.id, {
        show: req.query.show,
      })
      if (!item) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Not found" })
      }
      res.json(item)
    } catch (e) {
      this.#handleError(e, res)
    }
  }

  /**
   * Create a new entity.
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   */
  create = async (req, res) => {
    try {
      const created = await this.service.create(req.body)
      res.status(StatusCodes.CREATED).json(created)
    } catch (e) {
      this.#handleError(e, res)
    }
  }

  /**
   * Update an existing entity.
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @returns {Promise<void>}
   */
  update = async (req, res) => {
    try {
      const updated = await this.service.update(req.params.id, req.body)
      res.json(updated)
    } catch (e) {
      this.#handleError(e, res)
    }
  }

  /**
   * Delete an entity by ID.
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @returns {Promise<void>}
   */
  delete = async (req, res) => {
    try {
      await this.service.delete(req.params.id)
      res.status(StatusCodes.NO_CONTENT).end()
    } catch (e) {
      this.#handleError(e, res)
    }
  }
}
