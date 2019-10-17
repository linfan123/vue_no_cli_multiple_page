/**
 * method utils
 * author Lkx
 * website https://github.com/Lkx2217/kxmagic
 */

const path = require('path')
const glob = require('glob')

/**
 * 返回所有 javascript 资源
 * @method getMultiEntry
 * @for kxmagic
 * @param {string} globPath 资源路径
 * @return {object} 资源对象
 */
exports.getMultiEntry = function (globPath) {
  let entries = {}
  glob.sync(globPath).forEach(function (entry) {
    let key = entry.substring(entry.lastIndexOf('/') + 1, entry.lastIndexOf('.'))
    entries[key] = [entry]
  })
  return entries
}

/**
 * 返回所有 html 资源
 * @method getMultiHtml
 * @for kxmagic
 * @param {string} globPath 资源路径
 * @return {object} 资源对象
 */
exports.getMultiHtml = function (globPath) {
  let pages = []
  glob.sync(globPath).forEach(function (page) {
    let page_obj = {}
    let page_name = page.substring(page.lastIndexOf('/') + 1, page.lastIndexOf('.'))
    let chunk_name = path.basename(page_name, '.html')
    page_obj['filename'] = page_name + '.html'
    page_obj['template'] = page
    page_obj['chuckName'] = chunk_name
    pages.push(page_obj)
  })
  return pages
}