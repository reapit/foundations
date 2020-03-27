import queue from 'async/queue'
import { createOfficeAsync } from '../utils/script'

const ctx: Worker = self as any;

ctx.addEventListener('message', e => {
  const { data, type } = e.data

  if (type === 'office') {
    const records = data.slice(1, data.length - 1)

    const totalRecord = records.length
  
    ctx.postMessage({ totalRecord })
    
    const q = queue((item, callback) => {
      console.log('queue item', item)
      createOfficeAsync(item)
      callback()
    }, 1)
  
    q.push(records)
  }
})

