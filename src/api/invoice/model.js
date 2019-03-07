import mongoose, { Schema } from 'mongoose'
import { schema as product } from '../product/model'
import extendSchema from '../../utils/extendSchema'

const productOnThis = extendSchema(product, {
  quantity: {
    type: Number,
    required: true
  },
  end_price: {
    type: Number,
    required: true
  }
})
const invoiceSchema = new Schema({
  to: {
    type: String,
    required: true
  },
  products: [productOnThis],
  total: {
    type: String,
    required: true
  },
  paid: {
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

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      products: this.products,
      total: this.total,
      paid: this.paid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
