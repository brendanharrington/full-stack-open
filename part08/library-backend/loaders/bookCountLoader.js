const DataLoader = require('dataloader')
const Book = require('../models/book')

// keys = array of author IDs
const bookCountLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })

  // Count books per author
  const countMap = {}
  books.forEach((book) => {
    const key = book.author.toString()
    countMap[key] = (countMap[key] || 0) + 1
  })

  // Return counts in the same order as authorIds
  return authorIds.map((id) => countMap[id.toString()] || 0)
})

module.exports = bookCountLoader
