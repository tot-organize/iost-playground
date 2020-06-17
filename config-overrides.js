const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ['json', 'javascript', 'typescript'],
      features: [
        'accessibilityHelp',
        'bracketMatching',
        'caretOperations',
        'clipboard',
        'codeAction',
        'codelens',
        'colorDetector',
        'comment',
        'contextmenu',
        'coreCommands',
        'cursorUndo',
        'dnd',
        'find',
        'folding',
        'fontZoom',
        'format',
        'gotoError',
        'gotoLine',
        'hover',
        'iPadShowKeyboard',
        'inPlaceReplace',
        'inspectTokens',
        'linesOperations',
        'links',
        'multicursor',
        'parameterHints',
        'quickCommand',
        'quickOutline',
        'referenceSearch',
        'rename',
        'smartSelect',
        'snippets',
        'suggest',
        'toggleHighContrast',
        'toggleTabFocusMode',
        'transpose',
        'wordHighlighter',
        'wordOperations',
        'wordPartOperations'
      ]
    })
  )
  return config
}
