import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite 8 默认用 lightningcss 压 CSS。同时写 backdrop-filter 和
 * -webkit-backdrop-filter 时，标准属性会被丢掉，只剩 -webkit-。
 * Chromium 不认单独的 -webkit- 前缀，线上毛玻璃就全没了。
 * https://github.com/vitejs/vite/issues/22649
 *
 * transform 里加一个无害标记，让 CSS 文件名哈希和旧产物错开，
 * 避免 immutable 缓存继续吐出没毛玻璃的旧文件。
 */
function preserveBackdropFilter() {
  return {
    name: 'preserve-backdrop-filter',
    apply: 'build',
    transform(code, id) {
      if (!id.replace(/\\/g, '/').endsWith('/styles/landing.css')) return null
      return `${code}\nhtml{--bf-keep:1}\n`
    },
    generateBundle(_opts, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'asset' || typeof chunk.source !== 'string') continue
        if (!chunk.fileName.endsWith('.css')) continue
        chunk.source = chunk.source.replace(
          /-webkit-backdrop-filter:([^;{}]+);/g,
          (full, value, offset, src) => {
            const open = src.lastIndexOf('{', offset)
            const close = src.indexOf('}', offset)
            const block =
              open === -1 || close === -1 ? '' : src.slice(open + 1, close)
            if (/(?:^|[^-])backdrop-filter:/.test(block)) return full
            return `${full}backdrop-filter:${value};`
          },
        )
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preserveBackdropFilter()],
  build: {
    // iso-hub-webgl (three) is an on-demand chunk.
    chunkSizeWarningLimit: 1800,
  },
})
