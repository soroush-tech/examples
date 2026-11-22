// Run after the client build: renders the page to HTML and writes it, with its CSS, into dist/index.html.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToString } from 'react-dom/server'
import { extractPageStyles } from '@umber-style/core'
import { App } from './App'
import { cache, STORAGE_KEY, themeClasses } from './style'

const file = resolve('dist/index.html')
const body = renderToString(<App />)

// The themes that no element of the body carries (the ones <html> switches to) are named here.
const { tag } = extractPageStyles(cache, body, { themes: Object.values(themeClasses) })

// Runs while the head is parsed, before the body is painted: a reload in dark is dark from its first frame.
const choose = `try{var c=${JSON.stringify(themeClasses)},n=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(Object.hasOwn(c,n))document.documentElement.className=c[n]}catch(e){}`

const html = readFileSync(file, 'utf8')
  .replace('<html lang="en">', `<html lang="en" class="${themeClasses.light}">`)
  .replace('<!--head-->', `${tag}<script>${choose}</script>`)
  .replace('<!--app-->', body)

writeFileSync(file, html)
console.log(`prerendered ${file}`)
