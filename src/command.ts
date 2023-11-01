import { packageConfig } from 'pkg-conf'

export async function getCommands() {
  const { title } = await packageConfig('configuration')
  return {
    StartAutomate: `${title}.startAutomate`,
    StopAutomate: `${title}.stopAutomate`,
  }
}
