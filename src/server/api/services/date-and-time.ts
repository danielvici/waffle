import type { DateAndTimeService } from '~/types'
import {
  getServiceWithDefaultData,
  returnServiceWithData,
} from '~/server/utils/services'

export default defineEventHandler(async (event) => {
  const service = await getServiceWithDefaultData<DateAndTimeService>(event)
  const { options } = service.config

  const timezone
    = options?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone

  return returnServiceWithData(service, {
    timezone,
  })
})
