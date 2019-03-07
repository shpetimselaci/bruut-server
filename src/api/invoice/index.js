import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Invoice, { schema } from './model'

const router = new Router()
const { products, total, paid } = schema.tree

/**
 * @api {post} /invoices Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam products Invoice's products.
 * @apiParam total Invoice's total.
 * @apiParam paid Invoice's paid.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ products, total, paid }),
  create)

/**
 * @api {get} /invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of invoices.
 * @apiSuccess {Object[]} rows List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /invoices/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /invoices/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam products Invoice's products.
 * @apiParam total Invoice's total.
 * @apiParam paid Invoice's paid.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ products, total, paid }),
  update)

/**
 * @api {delete} /invoices/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
