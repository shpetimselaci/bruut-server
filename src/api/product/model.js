import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  measurement_type: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  barCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      measurement_type: this.measurement_type,
      price: this.price,
      barCode: this.barCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
