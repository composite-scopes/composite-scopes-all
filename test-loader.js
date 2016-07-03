console.log("TEST LOADER");

System.config({
    transpiler: 'babel',
    baseURL: '/base',
  /*  paths: {
        '*': 'node_modules/*',
        'test-main.js': 'test-main.js',
        'tests/*': 'tests/*',
        'src/*': 'src/*',
        'tests/*': 'tests/*',
        'tests/*': 'tests/*',
        'tests/*': 'tests/*',
        'tests/*': 'tests/*',
        'tests/*': 'tests/*'
    },
*/    packageConfigPaths: [
        './node_modules/*/package.json',
        'node_modules/*/package.json'
    ],

    map: {
        babel: 'src/external/babel-browser.js'
        ,
        kernel: 'src/client/legacy-kernel.js',
        'stack-es2015-modules': 'node_modules/stack-es2015-modules/stack.js'
    }
});
System.import('test-main.js')
    .catch(e => console.log(
        e,
        e.name,
        e.message,
        e.stack
        )
    );
