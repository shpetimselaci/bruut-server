import mongoose, { Schema } from 'mongoose'
import { schema as product } from '../product/model'
import extendSchema from '../../utils/extendSchema'

const productOnThis = extendSchema(product, {
  quantity: {
    type: Number,
    required: true
  },
  TVSH: {
    type: Number,
    required: true
  },
  end_price: {
    type: Number,
    required: true
  }
})
const to = extendSchema({}, {
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String,
    required: true
  }
})

const invoiceSchema = new Schema({
  to,
  products: [productOnThis],
  total: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
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
      to: this.to,
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
