export default {
  branches: ['main', { name: 'uat', prerelease: 'beta' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    'semantic-release-export-data',
  ],
}
