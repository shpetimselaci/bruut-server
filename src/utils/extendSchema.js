import mongoose from 'mongoose'

const extendSchema = (Schema, definition, options) => {
  return new mongoose.Schema(
    Object.assign({}, Schema.obj, definition),
    options
  )
}

export default extendSchema
