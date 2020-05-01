import * as R from 'ramda'
//export const getTotalCount = state => R.length(this.state.cart)
export const getTotalCount = state => {
        
    console.log("in getTotalCount" + state.cart.length);
    return(state.cart.length)}