var Jasmine = require('jasmine');
var jasmine = new Jasmine();
//node runSpec.js
jasmine.loadConfig({
    spec_dir: './specs',
    spec_files: [
        'appSpecs.js'
    ],
    helpers: [
        './helpers/**/*.js'
    ]
});

jasmine.execute();