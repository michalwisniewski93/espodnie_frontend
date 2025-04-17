const initialState = {
    visibilityButtonsAndMenu: false,
    activeCategory: '',
    siteName: null,
    siteContent: null,
    isUserLogged: false,
    user: null,
    pass: null,
    favouritesId: null,
    favouritesList: [],
    boughtProductsId: null,
    boughtProducts: [],
    customerData: '',
    invoicePresentationNumber: null,
    invoicePresentationFirstLineOfCustomer: '',
    invoicePresentationNipOfCustomer: '',
    invoicePresentationPhoneNumberOfCustomer: '',
    invoicePresentationEmailAddressOfCustomer: '',
    invoicePresentationBoughtProducts: [],
    invoicePresentationTotalAmount: null,
    invoicePresentationDateOfIssue: '',
}



function reducer(state=initialState, action){
    switch(action.type){
        case 'CHANGE_VISIBILITY_BUTTONS_AND_MENU':
            return {...state, visibilityButtonsAndMenu: !state.visibilityButtonsAndMenu}
        case 'CHANGE_ACTIVE_CATEGORY':
            return {...state, activeCategory: action.activeCategory}
        case 'CHANGE_ACTIVE_SITE_NAME':
            return {...state, siteName: action.sitename}
        case 'CHANGE_ACTIVE_SITE_CONTENT':
            return {...state, siteContent: action.content}
        case 'CHANGE_IS_USER_LOGGED':
            return {...state, isUserLogged: !state.isUserLogged}
        case 'SET_USER_IN_STORE':
            return {...state, user: action.user }
        case 'SET_PASSWORD_IN_STORE':
            return {...state, pass: action.pass}
        case 'SET_FAVOURITES_ID':
            return {...state, favouritesId: action.favouritesId}
        case 'ADD_TO_FAVOURITES_LIST':
            return {...state, favouritesList: [...state.favouritesList, action.newFavourites]}
        case 'ADD_TO_BOUGHT_PRODUCTS':
            return {...state, boughtProducts: [...state.boughtProducts, action.boughtProducts]}
        case 'SET_BOUGHT_PRODUCTS_ID':
            return {...state, boughtProductsId: action.boughtProductsId}
        case 'SET_CUSTOMER_DATA':
            return {...state, customerData: action.customerData }
        case 'RESET_BOUGHT_PRODUCTS':
            return {...state, boughtProducts: []}
        case 'SET_INVOICE_PRESENTATION_NUMBER':
            return {...state, invoicePresentationNumber: action.invoicePresentationNumber}
        case 'SET_INVOICE_FIRST_LINE_OF_CUSTOMER':
            return {...state, invoicePresentationFirstLineOfCustomer: action.invoicePresentationFirstLineOfCustomer}
        case 'SET_INVOICE_PRESENTATION_NIP':
            return {...state, invoicePresentationNipOfCustomer: action.invoicePresentationNipOfCustomer}
        case 'SET_INVOICE_PRESENTATION_PHONE_NUMBER':
            return {...state, invoicePresentationPhoneNumberOfCustomer: action.invoicePresentationPhoneNumberOfCustomer}
        case 'SET_INVOICE_PRESENTATION_EMAIL':
            return {...state, invoicePresentationEmailAddressOfCustomer: action.invoicePresentationEmailAddressOfCustomer}
        case 'SET_INVOICE_PRESENTATION_BOUGHT_PRODUCTS':
            return {...state, invoicePresentationBoughtProducts: action.invoicePresentationBoughtProducts}
        case 'SET_INVOICE_PRESENTATION_TOTAL_AMOUNT':
            return {...state, invoicePresentationTotalAmount: action.invoicePresentationTotalAmount}
        case 'SET_INVOICE_PRESENTATION_DATE_OF_ISSUE':
            return {...state, invoicePresentationDateOfIssue: action.invoicePresentationDateOfIssue}
       
        default:
            return {...state}
    }
}

export default reducer;