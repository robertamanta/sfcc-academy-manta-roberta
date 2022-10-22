'use strict';
function getBestDeal(product){
    let bestDeal;
    if(product.price.list.value!==null){
    let priceList = product.price.list.value;
    let priceSale = product.price.sales.value;
    bestDeal = Math.trunc(((priceList- priceSale)/priceList)*100);
    }
    else
    {
        bestDeal=0; 
    }
    return bestDeal;
}

module.exports = {
    getBestDeal: getBestDeal
    
};