#!/usr/bin/env node

const opts = require('minimist')(process.argv.slice(2))
const runner = require('../index')

runner(opts)
