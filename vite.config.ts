import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // 库构建模式
    return {
      plugins: [
        vue(),
        dts({
          insertTypesEntry: true,
          cleanVueFileName: true,
          skipDiagnostics: false,
          tsConfigFilePath: './tsconfig.json'
        })
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VuedayUI',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      }
    }
  } else {
    // 开发模式
    return {
      plugins: [vue()],
      root: './examples',
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      }
    }
  }
})