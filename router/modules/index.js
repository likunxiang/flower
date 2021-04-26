const files = require.context('.', true, /\js$/);
const modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  modules.push(...item)
})
console.log(modules)
export default modules
