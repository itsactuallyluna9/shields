import Joi from 'joi'
import { renderVersionBadge } from '../version.js'
import { BaseJsonService, pathParams } from '../index.js'

const schema = Joi.object({
  version: Joi.string().required(),
}).required()

export default class MacPortsVersion extends BaseJsonService {
  static category = 'version'

  static route = { base: 'macports/v', pattern: ':port' }

  static openApi = {
    '/macports/v/{port}': {
      get: {
        summary: 'MacPorts Version',
        parameters: pathParams({
          name: 'port',
          example: 'wget',
        }),
      },
    },
  }

  static defaultBadgeData = { label: 'MacPorts' }

  async fetch({ port }) {
    return this._requestJson({
      schema,
      url: `https://ports.macports.org/api/v1/ports/${port}/`,
    })
  }

  async handle({ port }) {
    const data = await this.fetch({ port })
    return renderVersionBadge({ version: data.version })
  }
}
