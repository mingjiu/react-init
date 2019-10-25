/*eslint-disable*/
let glob = require('glob')
let fs = require('fs')
let strip = require('strip-comments')
let babel = require('babel-core')
let Promise = require('bluebird')
let _ = require('lodash')
let traverse = require('babel-traverse').default
let codeGen = require('babel-generator').default

let babelrc = JSON.parse(fs.readFileSync(__dirname + '/../.babelrc', 'utf8'))
console.log(babelrc)
function strikeWord (word) {
  return '!!' + word
}

function getFileList (matchPath, opts) {
  return new Promise((resolve, reject) => {
    glob(matchPath, opts, function (err, files) {
      err ? reject(err) : resolve(files)
    })
  })
}

function readSourceCode (filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/' + filepath, 'utf8', (err, content) => {
      let js = babel.transform(content, babelrc)
      // 移除注释中的中文
      err ? reject(err) : resolve(strip(js.code))
    })
  })
}

function containChinese (txt) {
  if (!txt) return false

  // babel 会转义，比如 "测试" => "\\u6D6B..."
  // /[\u4e00-\u9fa5]/
  return /(\\u[4-9]\w\w\w)+/.test(txt)
}

// let code = `<th style={{width: '26%'}}>{t('currency')}</th>{t('txt')}`
function parseStaticI18nFields (txt) {
  if (!txt) return []

  let items = txt.match(/[\s={]t\('\w+'\)/g)
  if (!items) return []

  return items.map(item => item.match(/[a-zA-Z]{2,}/)[0])
}

function parseDynamicI18nFields (txt) {
  let code = babel.transform(txt, babelrc)
  let keys = []
  // https://astexplorer.net/
  traverse(code.ast, {
    enter (path) {
      let parent = path.parent
      if (path.node.type === 'Identifier' && path.node.name === 't' && parent.type === 'CallExpression' && parent.callee.name === 't') {
        if (Array.isArray(parent.arguments)) {
          // 第一个参数不是字符串则包含动态 key
          if (parent.arguments[0].type !== 'StringLiteral') {
            keys.push({type: 'dynamic', key: '', code: codeGen(parent).code})
          } else {
            keys.push({type: 'static', key: parent.arguments[0].value})
          }
        }
      }
    }
  })

  return keys
}

async function parseAll (pathList) {
  let contents = await Promise.map(pathList, filepath => {
    return readSourceCode(filepath)
  }, {concurrency: 5})
  let files = []
  let keys = []
  let dynamicKeys = []
  contents.forEach((content, i) => {
    if (containChinese(content)) {
      files.push(pathList[i])
    }

    let fields = parseDynamicI18nFields(content)
    fields.forEach(item => {
      if (item.type === 'static') {
        keys.push(item.key)
      } else {
        dynamicKeys.push(item.code)
      }
    })
  })

  return {unhandledFiles: files, keys, dynamicKeys}
}

async function main () {
  let files = await Promise.all([
    getFileList('../locales/**/*.json', {cwd: __dirname}),
    getFileList('../src/**/!(.test)/*.js', {cwd: __dirname})
  ])
  console.log(files)
  let locales = files[0]
  let scripts =  files[1]
  let {unhandledFiles, keys, dynamicKeys} = await parseAll(scripts)

  console.log('\n******** Files which contain Chinese ********\n')
  if (unhandledFiles.length) {
    console.log(unhandledFiles.map(i => i.replace('../', '')).join('\n'))
  }

  console.log('\n******** i18n keys which are dynamic ********\n')
  if (dynamicKeys.length) {
    console.log(_.uniq(dynamicKeys).join('\n'))
  }

  console.log('\n******** i18n keys recently added ********\n')
  locales.forEach(filepath => {
    try {
      let dist = __dirname + '/' + filepath
      let json = JSON.parse(fs.readFileSync(dist, 'utf8'))
      keys.forEach(key => {
        if (key in json === false) {
          console.log(key)
          json[key] = strikeWord(key.toUpperCase())
        }
      })

      fs.writeFileSync(dist, JSON.stringify(json, Object.keys(json).sort(), '  '))
    } catch (e) {
      console.log(`Got an error when handling file ${filepath}:`)
      console.error(e.message)
    }
  })
}

main()
