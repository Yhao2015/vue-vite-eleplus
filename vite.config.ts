import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { visualizer } from 'rollup-plugin-visualizer' 打包分析

import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
    base: './',
    resolve: {
        alias: {
            '@': '/src',
            '@p': '/public'
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8088,
        open: true
    },
    build: {
        outDir: 'dist', //指定打包输出路径
        chunkSizeWarningLimit: 1024,
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: '[ext]/[name]-[hash].[ext]',
                manualChunks(id: any) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                // drop_console: true,
                pure_funcs: ['console.log'], // 只删除 console.log
                drop_debugger: true
            }
        }
    },
    plugins: [
        vue(),
        /* visualizer(), */
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        }),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            imports: [
                'vue',
                'vue-router'
            ],
            dts: './auto-imports.d.ts',
            resolvers: [
                ElementPlusResolver({
                    importStyle: false
                })
            ],
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            }
        }),
        Components({
            resolvers: [
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver({
                    importStyle: false
                })
            ],
            dts: './components.d.ts'
        }),
        viteMockServe({
            mockPath: './mock',
            localEnabled: command === "serve" && mode === "mock"
        })
    ]
}))
