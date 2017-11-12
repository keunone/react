/**
 *
 * Asynchronously loads the component for MemberCenter
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
})
