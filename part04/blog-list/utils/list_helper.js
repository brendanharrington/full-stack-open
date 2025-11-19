const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const objectWithMostLikes = blogs.reduce((maxObject, currentObject) => {
    return (maxObject.likes > currentObject.likes) ? maxObject : currentObject
  })
  
  return objectWithMostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const countArr = []

  blogs.forEach(blog => {
    const index = countArr.findIndex(({ author }) => author === blog.author)
    if (index === -1) {
      countArr.push({ author: blog.author, blogs: 1 })
    } else {
      countArr[index].blogs++
    }
  })

  const recordAuthor = countArr.reduce((acc, curr) => 
    acc.blogs > curr.blogs ? acc : curr
  )

  return recordAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const countArr = []

  blogs.forEach(blog => {
    const index = countArr.findIndex(({ author }) => author === blog.author)
    if (index === -1) {
      countArr.push({ author: blog.author, likes: blog.likes })
    } else {
      countArr[index].likes += blog.likes
    }
  })

  const recordAuthor = countArr.reduce((acc, curr) => 
    acc.likes > curr.likes ? acc : curr
  )

  return recordAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}