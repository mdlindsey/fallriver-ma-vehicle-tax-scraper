const { writeFileSync } = require('fs')
const outputJson = require('../output.json')
const InvoiceLoader = require('./load')

async function run(year = 2023, minBillNum = 1, maxBillNum = 85356) {
    for (let i = minBillNum; i < maxBillNum; i++) {
        console.log(`Loading ${year}.${i}`)
        outputJson[`${year}.${i}`] = await InvoiceLoader.loadInvoiceDetailsJson(year, i)
        writeFileSync('./output.json', JSON.stringify(outputJson, null, 2))
        console.log('Saved')
    }
}

run()
