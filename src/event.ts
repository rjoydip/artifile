import mitt from 'mitt'

// eslint-disable-next-line ts/consistent-type-definitions
type Events = {
  closeAllOpenedFiles?: void
}

export const emitter = mitt<Events>()
