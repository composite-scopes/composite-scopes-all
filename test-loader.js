console.log("TEST LOADER");

System.config({
    transpiler: 'babel',
    baseURL: '/base',
    paths: {
        'test-main.js': 'test-main.js',
        'copv2/*': 'copv2/*',
        'node_modules/*': 'node_modules/*',
        'src/*': 'src/*',
        'tests/*': 'tests/*',
        'vendor/*': 'vendor/*',
        '*': 'node_modules/*',
    },
    // packageConfigPaths: [
    //     './node_modules/*/package.json',
    //     '/node_modules/*/package.json',
    //     'node_modules/*/package.json',
    //     '*/package.json'
    // ],
    packages: {
        // meaning [baseURL]/local/package when no other rules are present
        // path is normalized using map and paths configuration
        'stack-es2015-modules': {
            main: 'stack.js',
/*            format: 'cjs',
            defaultExtension: 'js',
            map: {
                // use local jquery for all jquery requires in this package
                'jquery': './vendor/local-jquery.js',

                // import '/local/package/custom-import' should route to '/local/package/local/import/file.js'
                './custom-import': './local/import/file.js'
            },
            meta: {
                // sets meta for modules within the package
                'vendor/*': {
                    'format': 'global'
                }
            }
  */      }
    },
    map: {
        babel: 'src/external/babel-browser.js',
//        'stack-es2015-modules': 'node_modules/stack-es2015-modules/stack.js'
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
