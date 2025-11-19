const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const initialUsers = [
  {
    username: 'bren123',
    name: 'Brendan Harrington',
    passwordHash: '$2b$10$RltmRq8Q4o7qZp3pXW6lYeP87O7Te2QxkT1hPiO14SPQgyOKp9Pi2', // hashed version of 'password1'
    blogs: [] // will reference blog ObjectIds later
  },
  {
    username: 'janedoe',
    name: 'Jane Doe',
    passwordHash: '$2b$10$QnhSm6yO4hyyHcvNQO1D2OxZfAjyXl0E1fg9VmFGmYgThy8E1QzXa', // hashed version of 'securePass'
    blogs: []
  },
  {
    username: 'alex_dev',
    name: 'Alex Developer',
    passwordHash: '$2b$10$DgIzh/mI.dMk8n2vCVbFTuAVrKHQLURml.Yi0Xk5bD3y7whQ2v2Si', // hashed version of 'dev1234'
    blogs: []
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "titletoberemoved",
    author: "authortoberemoved",
    url: "urltoberemoved",
    likes: 0
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb }