import Button from './Button.vue'
import type { App } from 'vue'

// 为组件提供 install 方法，供按需引入
Button.install = (app: App) => {
  app.component(Button.name!, Button)
}

export default Button
export * from './types'