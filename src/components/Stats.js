import React from 'react'
import { HTMLTable, ProgressBar } from '@blueprintjs/core'

export default ({ data: stats }) => {
  const total = stats.reduce((sum, { base_stat }) => sum + base_stat, 0)
  return (
    <div>
      <h4>Stats</h4>
      <HTMLTable width="100%">
        <tbody>
          {stats.map(({ base_stat, stat }) => (
            <tr key={stat.name}>
              <td>{stat.name}</td>
              <td>{base_stat}</td>
              <td>
                <ProgressBar
                  stripes={false}
                  value={((base_stat / total) * stats.length) / 2}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>total</td>
            <td>
              <b>{total}</b>
            </td>
            <td style={{ width: '50%' }} />
          </tr>
        </tbody>
      </HTMLTable>
    </div>
  )
}
