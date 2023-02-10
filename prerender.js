import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === 'production'
const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = isProduction
    ? fs.readFileSync(toAbsolute('./dist/client/ssr-manifest.json'), 'utf-8')
    : undefined

let template
let render

if (!isProduction) {
    template = fs.readFileSync(toAbsolute('./index.html'), 'utf-8')
    render = (await import('./dist/server/entry-server.js')).render
} else {
    template = fs.readFileSync(toAbsolute('./dist/client/index.html'), 'utf-8')
    render = (await import('./dist/server/entry-server.js')).render
}

const routesToPrerender = fs
    .readdirSync(toAbsolute('./src/pages'))
    .map((file) => {
        const name = file.replace(/\.tsx$/, '').toLowerCase()
        return name === 'main' ? `/` : `/${name}`
    })

;(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const rendered = render(url.replace('/', ''), manifest)
        const html = template
            .replace(`<!--app-head-->`, rendered.head ?? '')
            .replace(`<!--app-html-->`, rendered.html ?? '')

        const filePath = `./dist/static${url === '/' ? '/index' : url}.html`
        fs.writeFileSync(toAbsolute(filePath), html)
    }
})()
