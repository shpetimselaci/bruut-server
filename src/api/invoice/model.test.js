import { Invoice } from '.'

let invoice

beforeEach(async () => {
  invoice = await Invoice.create({ products: 'test', total: 'test', paid: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.products).toBe(invoice.products)
    expect(view.total).toBe(invoice.total)
    expect(view.paid).toBe(invoice.paid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.products).toBe(invoice.products)
    expect(view.total).toBe(invoice.total)
    expect(view.paid).toBe(invoice.paid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
