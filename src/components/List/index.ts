import WaterFall from './waterFallComponent.vue'
import VirtualList from './virtuallistComponent.vue'

import type { App } from 'vue'

WaterFall.install = (app: App) => {
  app.component(WaterFall.name!, WaterFall)
}
VirtualList.install = (app: App) => {
  app.component(VirtualList.name!, VirtualList)
}


export { WaterFall,VirtualList }

export * from './types'