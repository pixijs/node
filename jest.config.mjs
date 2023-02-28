// @pixi/extension-scripts has built-in support for Jest
// but it has feature enabled (like using Electron runner)
// but we don't need it for this node-only project
export default { preset: 'ts-jest' };