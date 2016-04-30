# World simulator, 2nd attempt

# Start

Use node v5.

Webpack server:

    webpack-dev-server --progress --colors
 
# Tests

## Unit

    webpack && node node_modules/mocha/bin/mocha --harmony --use_strict dist/testing.bundle.js
    
## Integration

    webpack && node node_modules/mocha/bin/mocha --harmony --use_strict dist/integration-testing.bundle.js
