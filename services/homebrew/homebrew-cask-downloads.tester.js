import { createServiceTester } from '../tester.js'
import { isMetricOverTimePeriod } from '../test-validators.js'
export const t = await createServiceTester()

t.create('daily downloads (valid)')
  .get('/installs/dm/iterm2.json')
  .expectBadge({ label: 'downloads', message: isMetricOverTimePeriod })

t.create('yearly downloads (valid)')
  .get('/installs/dq/iterm2.json')
  .expectBadge({ label: 'downloads', message: isMetricOverTimePeriod })

t.create('yearly downloads (valid)')
  .get('/installs/dy/iterm2.json')
  .expectBadge({ label: 'downloads', message: isMetricOverTimePeriod })

t.create('daily downloads (not found)')
  .get('/installs/dm/not-a-package.json')
  .expectBadge({ label: 'downloads', message: 'cask not found' })

t.create('yearly downloads (not found)')
  .get('/installs/dq/not-a-package.json')
  .expectBadge({ label: 'downloads', message: 'cask not found' })

t.create('yearly downloads (not found)')
  .get('/installs/dy/not-a-package.json')
  .expectBadge({ label: 'downloads', message: 'cask not found' })
