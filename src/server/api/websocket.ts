const logger = useLogger('websocket')

const activeWatchers = new Map<string, () => void>()

export default defineWebSocketHandler({
  async open(peer) {
    logger.info('Peer connected', peer.id)

    const storage = useStorage('data')
    const unwatch = await storage.watch(async (_, key) => {
      if (key !== `data:${configFileName}` && key !== configFileName) {
        return
      }

      logger.info('Config file change detected, reloading config...')
      await runTask('config:update')
      peer.send({ event: 'config:update' })
    })

    activeWatchers.set(peer.id, unwatch)
  },
  async message(peer, message) {
    const { event } = JSON.parse(message as unknown as string)

    if (event === 'ping') {
      peer.send({ event: 'pong' })
    }
  },
  async close(peer) {
    logger.info('Peer disconnected', peer.id)
    const unwatch = activeWatchers.get(peer.id)
    if (unwatch) {
      unwatch()
      activeWatchers.delete(peer.id)
    }
  },
  async error(peer, error) {
    logger.error('WebSocket peer error:', peer.id, error)
  },
})
