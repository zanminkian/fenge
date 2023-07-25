import fs from 'node:fs'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function writeGitHook (file, content) {
  const gitPath = resolve(process.cwd(), '.git')
  if (!fs.existsSync(gitPath)) {
    throw new Error('Directory `.git` is not existing. Please run `git init` first.')
  }

  const hooksPath = resolve(gitPath, 'hooks')
  fs.mkdirSync(hooksPath, { recursive: true })

  const path = resolve(hooksPath, file)
  fs.writeFileSync(path, content)
  fs.chmodSync(path, '777')
}

function writePreCommit () {
  const content = [
    '#!/bin/sh',
    `npx lint-staged --config ${join(__dirname, 'lint-staged.config.cjs')}`,
  ].join('\n')

  writeGitHook('pre-commit', content)
}

function writeCommitMsg () {
  const content = [
    '#!/bin/sh',
    `npx commitlint --config ${join(__dirname, 'commitlint.config.cjs')} --edit`,
  ].join('\n')

  writeGitHook('commit-msg', content)
}

function writePrePush (cmd) {
  const content = [
    '#!/bin/sh',
    cmd,
  ].join('\n')

  writeGitHook('pre-push', content)
}

export function install ({ preCommit, commitMsg, prePush }) {
  if (preCommit) {
    writePreCommit()
  }
  if (commitMsg) {
    writeCommitMsg()
  }
  if (prePush) {
    writePrePush(prePush)
  }
}

export function lint (paths = [], options = {}) {
  const { fix } = options
  const cwd = process.cwd()
  const ps = (paths.length === 0 ? [cwd] : paths).map(p => resolve(cwd, p))
  return spawnSync('npx', ['eslint', '--config', join(__dirname, 'eslint.config.cjs'), ...(fix ? ['--fix'] : []), ...ps], { stdio: 'inherit' })
}
