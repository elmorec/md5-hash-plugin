const crypto = require('crypto');

module.exports = class Md5HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('chunk-hash', function (compilation) {
      compilation.hooks.chunkHash.tap("chunk-hash", function (chunk, chunkHash) {
        const modules = Array.from(chunk.modulesIterable, modulesIterable => {
          const _source = modulesIterable._source || {};
          return _source._value ? _source._value.replace(/(?<=require\(['"]).*node_modules\//g, '') : '';
        });
        var source = modules.sort((a, b) => a.resource < b.resource ? -1 : 1).reduce((integral, i) => integral + i, '');
        var chunk_hash = md5(source);
        chunkHash.digest = function () {
          return chunk_hash;
        };
      });
    });
  }
};

function md5(str, len = 20) {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, len);
}
