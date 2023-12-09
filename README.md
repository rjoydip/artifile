# artifile

[![CI](https://github.com/rjoydip/artifile/actions/workflows/ci.yml/badge.svg)](https://github.com/rjoydip/artifile/actions/workflows/ci.yml)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

A VSCode automation extension

## Todo

- [x] Get list of file for proper text files
- [x] Ignore files or folder
- [x] Open those files in editor
- [x] Navigate file to file
- [x] Blank file creation
- [x] Vscode configuration enabled
  - [x] User config
  - [x] Workspace config
- [x] Ignore files by parsing gitignore
- [ ] Read active document (on after each navigation) from top to bottom
- [ ] Custom configuration file read. e.g.: `artifile.json`/`artifile.yml`/`artifile.ts`/`artifile.js`
- [ ] Introduce auto writting by taking concept of [retypewriter](https://github.com/antfu/retypewriter)
- [ ] Auto writting in case of blank file
- [ ] Using OpenAI for getting content by understanding project
  - [ ] Enhance `auto writting` capability using OpenAI
- [ ] Handle proper automation
- [ ] Collect stats of each activity
