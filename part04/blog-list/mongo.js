const config = require('./utils/config')
const mongoose = require('mongoose')

if (process.argv.length > 6) {
  console.log('too many arguments provided')
  process.exit(1)
}

if (process.argv.length === 3 || process.argv.length === 4 || process.argv.length === 5) {
  console.log('give title, author, url, and likes as the arguments')
}

const url = config.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 2) {
  console.log('blog list:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`)
    })
    mongoose.connection.close()
  })
} else {
  const blog = new Blog({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: Number(process.argv[5]),
  })

  blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
}

