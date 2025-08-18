import type { App } from 'vue'
import Button from './components/Button'

// 所有组件列表
const components = [
  Button
]

// 定义 install 方法
const install = (app: App): void => {
  // 遍历注册所有组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// 导出库
export {
  Button,
  install
}

// 导出默认插件
export default {
  install
}

// 支持按需引入
export * from './components'
export * from './utils'