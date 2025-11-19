const { GraphQLError } = require('graphql')

const handleError = (error, context = 'Unexpected server error') => {
  if (error instanceof GraphQLError) throw error

  if (error.name === 'ValidationError') {
    throw new GraphQLError(`${context}: validation failed`, {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: Object.keys(error.errors || {}),
        message: error.message,
      },
    })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0]
    throw new GraphQLError(`${context}: duplicate value for field '${field}'`, {
      extensions: {
        code: 'BAD_USER_INPUT',
        field,
        message: error.message,
      },
    })
  }

  throw new GraphQLError(context, {
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
    },
  })
}

module.exports = handleError
