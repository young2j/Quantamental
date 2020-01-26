const {
    override,
    addDecoratorsLegacy,
    addLessLoader,
    fixBabelImports
} = require('customize-cra')
const modifyVars = require('./theme')


module.exports = override(
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true
    }),
    addLessLoader({
        javascriptEnabled:true,
        modifyVars
    }),
    addDecoratorsLegacy()
)