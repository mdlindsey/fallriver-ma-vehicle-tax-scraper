const { writeFileSync } = require('fs')
const outputJson = require('../output.json')
const InvoiceLoader = require('./load')
const parseHtml = require('./parse')

async function run(year = 2023, minBillNum = 1, maxBillNum = 85356) {
    for (let i = minBillNum; i < maxBillNum; i++) {
        console.log(`Loading ${year}.${i}`)
        const invoiceHtml = await InvoiceLoader.loadInvoiceDetailsHtml(year, i)
        if (!invoiceHtml) {
            console.log('Failed')
            continue
        }
        outputJson[`${year}.${i}`] = parseHtml(invoiceHtml)
        writeFileSync('./output.json', JSON.stringify(outputJson, null, 2))
        console.log('Saved')
    }
}

run()
