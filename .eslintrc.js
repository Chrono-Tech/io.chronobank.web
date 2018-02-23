module.exports = {
  'extends': [
    'plugin:chronobank-react/recommended'
  ],
  'settings': {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: [
          '.'
        ],
        moduleDirectory: [
          'node_modules',
          'dropins',
          'pages',
          'src',
        ]
      }
    }
  },
  'rules': {
    'complexity': ['error', 20],
    'import/prefer-default-export': 'off',
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'array', 'object'] }],
    'react/jsx-no-bind': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  }
}
