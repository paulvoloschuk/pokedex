import React from 'react'
import { Spinner } from '@blueprintjs/core'

export default ({ children = 'Loading' }) => (
  <div className="loader">
    <Spinner size={100} />
    <p>{children}...</p>
  </div>
)
