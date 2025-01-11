import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ai.befluent',
  appName: 'BeFluent',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
