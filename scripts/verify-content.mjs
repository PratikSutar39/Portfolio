import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const baseline = process.argv[2] || '2ad0c977350bfd13996ad64ab123414aecbb713f'
const components = ['Hero', 'About', 'FeaturedVideo', 'Philosophy', 'Projects',
  'Experience', 'Skills', 'Process', 'Education', 'Contact']
const normalize = (text) => text.replace(/\s+/g, ' ').trim()
let dataChecks = 0
let copyChecks = 0
let linkChecks = 0

function inventory(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const copy = []
  const links = []
  const data = new Map()
  const visit = (node) => {
    if (ts.isJsxText(node) && normalize(node.text)) copy.push(normalize(node.text))
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === 'href'
      && node.initializer && ts.isStringLiteral(node.initializer)) links.push(node.initializer.text)
    ts.forEachChild(node, visit)
  }
  visit(ast)
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) {
        data.set(declaration.name.getText(ast), declaration.initializer.getText(ast))
      }
    }
  }
  return { copy, links, data }
}

for (const component of components) {
  const filename = `src/components/${component}Section.tsx`
  const before = inventory(execFileSync('git', ['show', `${baseline}:${filename}`], {
    cwd: root, encoding: 'utf8',
  }), filename)
  const after = inventory(readFileSync(new URL(`../${filename}`, import.meta.url), 'utf8'), filename)
  for (const [name, value] of before.data) {
    assert.equal(after.data.get(name), value, `${filename}: ${name} data changed`)
    dataChecks++
  }
  const renderedCopy = normalize(after.copy.join(' '))
  for (const snippet of before.copy) {
    assert.ok(renderedCopy.includes(snippet), `${filename}: missing copy: ${snippet}`)
    copyChecks++
  }
  for (const link of before.links) {
    assert.ok(after.links.includes(link), `${filename}: missing link: ${link}`)
    linkChecks++
  }
}

console.log(`Content preserved against ${baseline.slice(0, 8)}: ${dataChecks} data arrays, ${copyChecks} copy fragments, ${linkChecks} links.`)
