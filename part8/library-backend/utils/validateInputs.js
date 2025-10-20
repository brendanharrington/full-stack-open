const { GraphQLError } = require('graphql')

const validateBookInput = (args) => {
  if (!args.title || args.title.length < 5) {
    throw new GraphQLError('Book title must be at least 5 characters long', {
      extensions: { code: 'BAD_USER_INPUT', invalidArgs: ['title'] },
    })
  }

  if (!args.author || args.author.length < 4) {
    throw new GraphQLError('Author name must be at least 4 characters long', {
      extensions: { code: 'BAD_USER_INPUT', invalidArgs: ['author'] },
    })
  }
}

const validateAuthorEdit = (args) => {
  if (args.setBornTo < 0) {
    throw new GraphQLError('"setBornTo" must be a non-negative number', {
      extensions: { code: 'BAD_USER_INPUT', invalidArgs: ['setBornTo'] },
    })
  }
}

module.exports = { validateBookInput, validateAuthorEdit }
