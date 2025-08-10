/** @file Mapper for API responses. */

/**
 * Converts a TypeORM entity for API response.
 * @param {*} entity - Entity to convert.
 * @param {*} mapping - Mapping configuration.
 * @returns {object} Object after transformation.
 */
export default (entity, mapping) => {
  const result = {}

  for (const [key, transform] of Object.entries(mapping)) {
    if (typeof transform === "function") {
      result[key] = transform(entity[key], entity)
    } else if (typeof transform === "string") {
      result[key] = entity[transform]
    }
  }

  return result
}
