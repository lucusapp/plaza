const express = require("express");
const app = express();

let eBay = require('ebay-node-api')
 
let ebay = new eBay({
    clientID: 'JOSEMANU-deniuate-SBX-9668815a4-65a8117b',
    clientSecret:'SBX-668815a466cc-eeb0-444f-9b3c-0163',
    env: 'SANDBOX', // optional default = 'PRODUCTION',
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope',
    countryCode: 'EBAY-US'

    },
    headers:{ // optional
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_COM' // For Great Britain https://www.ebay.co.uk
    }
})

ebay.findItemsByCategory({
    categoryId: 176984,
    Condition: 1000
}).then((data) => {
    console.log(data[0].searchResult[0].item.sellerInfo[0][0]);
}, (error) => {
    console.log(error);
});




// ebay.findItemsByCategory({
//     categoryId: 10181,
//     Condition: 1000
// }).then((data) => {
//     console.log(data[0].searchResult);
// }, (error) => {
//     console.log(error);
// });

// refer here for filtering the items 
// https://developer.ebay.com/devzone/finding/callref/finditemsbykeywords.html#control
// ebay.findItemsByKeywords({
//     keywords: 'iphone',
//     sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
//     Condition: 3000,
//     SoldItemsOnly: false,
//     affiliate: {
//         networkId: 9,
//         trackingId: 1234567890
//     }
// }).then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log(error);
// });

//https://developer.ebay.com/devzone/finding/callref/findCompletedItems.html
/* This call searches for items whose listings are completed and are no longer available for
sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
Keyword queries search the title and subtitle of the item; they do not search descriptions. */
// 


// // // This call searches for items on eBay using specific eBay product values.
// // https://developer.ebay.com/DevZone/finding/CallRef/findItemsByProduct.html#findItemsByProduct
// ebay.findItemsByProduct({
//     productId: 53039031,
//     entriesPerPage: 2
// }).then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log(error);
// });

// // Searches items on eBay by category or keyword or both.
// ebay.findItemsAdvanced({
//     entriesPerPage: 2,
//     keywords: 'ipad',
//     ExpeditedShippingType: 'OneDayShipping'
// }).then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log(error);
// });

// ebay.getVersion().then((data) => {
//     console.log(data.version);
// }, (error) => {
//     console.log(error);
// });


// // Find ebay stores here https://www.ebay.com/sns
// // https://developer.ebay.com/devzone/finding/callref/findItemsIneBayStores.html
// ebay.findItemsIneBayStores({
//     storeName: 'Battery Gallery',
//     SoldItemsOnly: true,
//     MinPrice: '5.00',
//     MaxPrice: '800.00',
// }).then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log(error);
// });

module.exports = app