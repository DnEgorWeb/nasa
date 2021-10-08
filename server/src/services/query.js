const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_LIMIT = 0 // means infinity in Mongo

function getPagination(query) {
  const limit = query.limit ? Math.abs(query.limit) : DEFAULT_PAGE_NUMBER
  const page = query.page ? Math.abs(query.page) : DEFAULT_PAGE_LIMIT
  const skip = limit * (page - 1)

  return {
    skip,
    limit,
  }
}

module.exports = {
  getPagination,
}