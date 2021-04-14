import React from 'react'
import { Button } from '../../Button'
import useSnack from '../../../hooks/useSnack-v3'
import { elM1 } from '../../../styles-v3/base/spacing'

export const UseSnackHookStory = () => {
  const { info, success, error, warning, custom } = useSnack()

  return (
    <>
      <Button className={elM1} intent="secondary" onClick={() => info('This is infomation')}>
        Trigger an info snack
      </Button>
      <Button className={elM1} intent="success" onClick={() => success('Something great happened')}>
        Trigger a success snack
      </Button>
      <Button className={elM1} intent="danger" onClick={() => error('Something went wrong')}>
        Trigger an error snack
      </Button>
      <Button className={elM1} intent="critical" onClick={() => warning('Something could be bad')}>
        Trigger a warning snack
      </Button>
      <Button className={elM1} intent="primary" onClick={() => info("I'm here for a while...", 10000)}>
        Trigger a long snack (10 seconds)
      </Button>
      <Button className={elM1} intent="primary" onClick={() => info("I'm very short!", 1000)}>
        Trigger a short snack (1 second)
      </Button>
      <Button
        className={elM1}
        intent="primary"
        onClick={() =>
          custom({
            text: 'I can have anything in the interface ISnack applied as a parameter here',
            icon: 'home',
            intent: 'success',
          })
        }
      >
        Trigger a custom snack
      </Button>
      <Button className={elM1} intent="primary" onClick={() => info("This message won't dissapear on it's own", 0)}>
        Trigger a non-dissapearing snack
      </Button>
    </>
  )
}
