import React from 'react'
import { Button } from '../../Button'
import useSnack from '../../../hooks/useSnack-v3'

export const UseSnackHookStory = () => {
  const { info, success, error, warning, custom } = useSnack()

  return (
    <>
      <Button intent="secondary" onClick={() => info('This is infomation')}>
        Trigger an info snack
      </Button>
      <Button intent="success" onClick={() => success('Something great happened')}>
        Trigger a success snack
      </Button>
      <Button intent="danger" onClick={() => error('Something went wrong')}>
        Trigger an error snack
      </Button>
      <Button intent="critical" onClick={() => warning('Something could be bad')}>
        Trigger a warning snack
      </Button>
      <Button intent="primary" onClick={() => info("I'm here for a while...", 10000)}>
        Trigger a long snack (10 seconds)
      </Button>
      <Button intent="primary" onClick={() => info("I'm very short!", 1000)}>
        Trigger a short snack (1 second)
      </Button>
      <Button
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
    </>
  )
}
