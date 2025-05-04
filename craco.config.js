// craco.config.js
const CracoAlias = require('craco-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'jsconfig',
                baseUrl: './src',
                aliases: {
                    '@common': './src/common',
                    '@pages': './src/pages',
                    '@assets': './src/common/assets',
                    '@commonComponents': './src/common/components',
                    '@utils': './src/common/utils',
                }
            }
        }
    ]
};
