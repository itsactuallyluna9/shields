import { isVPlusTripleDottedVersion } from '../test-validators.js'
import { createServiceTester } from '../tester.js'
export const t = await createServiceTester()

t.create('MacPorts (valid)').get('/wget.json').expectBadge({
  label: 'MacPorts',
  message: isVPlusTripleDottedVersion,
})

t.create('MacPorts (valid)')
  .get('/wget.json')
  .intercept(nock =>
    nock('https://ports.macports.org')
      .get('/api/v1/ports/wget/')
      .reply(200, { version: '1.24.5' }),
  )
  .expectBadge({ label: 'MacPorts', message: 'v1.24.5' })

t.create('MacPorts (not found)')
  .get('/not-a-port.json')
  .expectBadge({ label: 'MacPorts', message: 'not found' })
