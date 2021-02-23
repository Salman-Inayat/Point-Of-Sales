const defaultState = {
    // set state here
    usernameInput: "",
    passwordInput: "",
    login: true,
    currentUser: "",
    toDoLists: [],
    task_to: "",
    message: "",
    newUser_username: "",
    newUser_password: "",
    newUser_role: "",
    newUser_status: "",
    allProducts: [],
    newProductName: "",
    retail_price: "",
    pomo_price: "",
    last_cost: "",
    most_recent_vendor: "",
    status: "",
    sales: "",
    forecast_sales_three_months: "",
    need_to_order_for_next_three_months: "",
    annualized_sales: "",
    annualized_qty: "",
    category: "",
    image_url: "",
    barcode: "",
    checkoutItemInput: "",
    checkoutItems: [],
    checkoutTotalDollar: "",
    checkoutTotalSaving: "",
    processCheckout: false,
    customerPay: "",
    allSalesData: [],
    reportData: [],
    dateRangeFrom: "",
    dateRangeTo: "",
    orderBarcode:"",
    orderProduct:"",
    orderQty:"",
    orderPrice:"",
    orderVendor:"",
    adjustmentProduct:"",
    adjustmentBarcode:"",
    adjustmentQty:"",
    adjustmenntReasonCode:"",
    allProductsSales:[],
    allAdjustments:[],
    unit:"",
    allOrders:[],
  
    filterOrders:[],
    filterOption:"",
    ordersSearchInput:"",
    productOrderRadio:"",
    productOrdersSearchInput:"",
    productOrdersListing:[],
    adjustmentSearchInput:"",
    filterAdjustment:[],
    showEditQuoteField:false,
    quoteInput:"",
    searchItemInput:"",
    searchItemsList:[],
    disableDeleteButton:false,
    showNavBar:false,
  
  }
  
  export default function(state = defaultState, action) {
    // console.log("login state", defaultState)
    switch (action.type) {
      case "LOGIN_USERNAME":
        return {
          ...state,
          usernameInput: action.payload
        }
      case "LOGIN_PASSWORD":
        return {
          ...state,
          passwordInput: action.payload
        }
      case "SET_USER":
        return {
          ...state,
          currentUser: action.payload
        }
      case "SHOW_TODOLISTS":
        return {
          ...state,
          toDoLists: action.payload
        }
      case "SEND_TASK_TO":
        return {
          ...state,
          task_to: action.payload
        }
      case "CREATE_MESSAGE":
        return {
          ...state,
          message: action.payload
        }
      case "NEW_USER_USERNAME_INPUT":
        return {
          ...state,
          newUser_username: action.payload
        }
      case "NEW_USER_PASSWORD_INPUT":
        return {
          ...state,
          newUser_password: action.payload
        }
      case "NEW_USER_ROLE_INPUT":
        return {
          ...state,
          newUser_role: action.payload
        }
      case "NEW_USER_STATUS_INPUT":
        return {
          ...state,
          newUser_status: action.payload
        }
      case "ADD_TASK_TO_YOURSELF":
        return {
          ...state,
          toDoLists: [
            ...state.toDoLists,
            action.payload
          ]
        }
      case "RESET_TASK_TO_INPUT":
        return {
          ...state,
          task_to: ""
        }
      case "RESET_TASK_MESSAGE_INPUT":
        return {
          ...state,
          message: ""
        }
      case "DELETE_TASK":
        return {
          ...state,
          currentUser: action.payload
        }
      case "ADD_TASK_TO_CURRENT_USER":
        return {
          ...state,
          currentUser: action.payload
        }
      case "UPDATE_TODOLISTS":
        return {
          ...state,
          toDoLists: action.payload
        }
      case "UPDATE_USER_TODOLISTS":
        return {
          ...state,
          currentUser: action.payload
        }
      case "GET_ALL_PRODUCTS":
        return {
          ...state,
          allProducts: action.payload
        }
      case "NEW_ITEM_NAME_INPUT":
        return {
          ...state,
          newProductName: action.payload
        }
      case "NEW_RETAIL_PRICE_INPUT":
        return {
          ...state,
          retail_price: action.payload
        }
      case "NEW_POMO_PRICE_INPUT":
        return {
          ...state,
          pomo_price: action.payload
        }
      case "NEW_LAST_COST_INPUT":
        return {
          ...state,
          last_cost: action.payload
        }
      case "NEW_VENDOR_INPUT":
        return {
          ...state,
          most_recent_vendor: action.payload
        }
      case "NEW_STATUS_INPUT":
        return {
          ...state,
          status: action.payload
        }
      case "NEW_SALES_INPUT":
        return {
          ...state,
          sales: action.payload
        }
      case "NEW_FORECAST_INPUT":
        return {
          ...state,
          forecast_sales_three_months: action.payload
        }
      case "NEW_NEED_TO_ORDER_INPUT":
        return {
          ...state,
          need_to_order_for_next_three_months: action.payload
        }
      case "NEW_ANNUALIZED_SALES_INPUT":
        return {
          ...state,
          annualized_sales: action.payload
        }
      case "NEW_ANNUALIZED_QTY_INPUT":
        return {
          ...state,
          annualized_qty: action.payload
        }
      case "NEW_CATEGORY_INPUT":
        return {
          ...state,
          category: action.payload
        }
      case "NEW_IMAGE_INPUT":
        return {
          ...state,
          image_url: action.payload
        }
      case "NEW_BARCODE_INPUT":
        return {
          ...state,
          barcode: action.payload
        }
      case "GET_IMAGE_URL":
        return {
          ...state,
          image_url: action.payload
        }
      case "ADD_NEW_PRODUCT":
        return {
          ...state,
          allProducts: [
            ...state.allProducts,
            action.payload
          ]
        }
      case "CHECKOUT_ITEM_INPUT":
        return {
          ...state,
          checkoutItemInput: action.payload
        }
      case "ADD_CHECKOUT_ITEM":
        return {
          ...state,
          checkoutItems: [
            ...state.checkoutItems,
            action.payload
          ]
        }
      case "ADD_TOTAL_DOLLARS":
        return {
          ...state,
          checkoutItems: action.payload
        }
      case "TOTAL_CHECKOUT_DOLLARS":
        return {
          ...state,
          checkoutTotalDollar: action.payload
        }
      case "TOTAL_CHECKOUT_SAVING":
        return {
          ...state,
          checkoutTotalSaving: action.payload
        }
      case "CHECKOUT":
        return {
          ...state,
          processCheckout: !state.processCheckout
        }
      case "HANDLE_CUSTOMER_PAY":
        return {
          ...state,
          customerPay: action.payload
        }
      case "RESET_INPUT":
        return {
          ...state,
          checkoutItemInput: ""
        }
      case "RESET_CHECKOUT_ITEMS":
        return {
          ...state,
          checkoutItems: []
        }
      case "RESET_CHECKOUT_TOTAL":
        return {
          ...state,
          checkoutTotalDollar: ""
        }
      case "RESET_CHECKOUT_SAVING":
        return {
          ...state,
          checkoutTotalSaving: ""
        }
      case "RESET_PROCESS_CHECKOUT":
        return {
          ...state,
          processCheckout: false
        }
      case "RESET_CUSTOMER_PAY":
        return {
          ...state,
          customerPay: ""
        }
      case "GET_ALL_SALES_DATA":
        return {
          ...state,
          allSalesData: action.payload
        }
      case "CHANGE_DATE_RANGE_FROM":
        return {
          ...state,
          dateRangeFrom: action.payload
        }
      case "CHANGE_DATE_RANGE_TO":
        return {
          ...state,
          dateRangeTo: action.payload
        }
      case "FILTER_SALES_DATA":
        return {
          ...state,
          reportData: action.payload
        }
        case "CREATE_ORDER_PRODUCT":
        return{
          ...state,
          orderProduct: action.payload,
        }
        case "SEARCH_BARCODE":
        return{
          ...state,
          orderBarcode: action.payload,
        }
  
        case "PLACE_ORDER_QTY":
        return{
          ...state,
          orderQty: action.payload,
        }
        case "PLACE_ORDER_PRICE":
        return{
          ...state,
          orderPrice: action.payload,
        }
        case "PLACE_ORDER_VENDOR":
        return{
          ...state,
          orderVendor: action.payload,
        }
  
        case "CREATE_ADJUSTMENT_PRODUCT":
        return{
          ...state,
          adjustmentProduct: action.payload,
        }
        case "SEARCH_BARCODE_ADJUSTMENT":
        return{
          ...state,
          adjustmentBarcode: action.payload,
        }
        case "ADJUST_QTY":
        return{
          ...state,
          adjustmentQty: action.payload,
        }
        case "REASON_CODE":
        return{
          ...state,
          adjustmenntReasonCode: action.payload,
        }
  
        case "GET_ALL_PRODUCTS_SALES":
        return{
          ...state,
          allProductsSales: action.payload,
        }
        case "GET_ALL_ADJUSTMENTS":
        return{
          ...state,
          allAdjustments: action.payload,
        }
        case "GET_ALL_ORDERS":
        return{
          ...state,
          allOrders: action.payload,
        }
  
        case "ORDER_RADIO_BUTTON":
        return{
          ...state,
          filterOption: action.payload,
        }
        case "SEARCH_ORDER_INPUT":
        return{
          ...state,
          ordersSearchInput: action.payload,
        }
        case "FILTER_ORDERS_LIST":
        return{
          ...state,
          filterOrders: action.payload,
        }
  
        case "UPDATE_FILTER_ORDERS":
        return{
          ...state,
          filterOrders: action.payload,
        }
        case "UPDATE_ALL_ORDERS":
        return{
          ...state,
          allOrders: action.payload,
        }
        case "PRODUCT_ORDER_RADIO_INPUT":
        return{
          ...state,
          productOrderRadio:action.payload,
        }
        case "PRODUCT_ORDER_SEARCH_INPUT":
        return{
          ...state,
          productOrdersSearchInput:action.payload,
        }
        case "PRODUCT_ORDER_LISTING":
        return{
          ...state,
          productOrdersListing:action.payload,
        }
        case "NEW_PRODUCT_UNIT":
        return{
          ...state,
          unit:action.payload,
        }
        case "UPDATE_ALL_PRODUCTS":
        return{
          ...state,
          allProducts:action.payload,
        }
        case "ADD_NEW_ORDER":
        return{
          ...state,
          allOrders:[...state.allOrders,action.payload]
        }
        case "HANDLE_SEARCH_ADJUSTMENT":
        return{
          ...state,
          adjustmentSearchInput:action.payload,
        }
        case "HANDLE_FILTER_ADJUSTMENT":
        return{
          ...state,
          filterAdjustment:action.payload,
        }
        case "SHOW_EDIT_QUOTE_FIELD":
        return{
          ...state,
          showEditQuoteField:!state.showEditQuoteField,
        }
  
        case "UPDATE_QUOTE_INPUT":
        return{
          ...state,
        quoteInput:action.payload,
        }
        case "UPDATE_QUOTE_FOR_CURRENT_USER":
        return{
          ...state,
          currentUser:action.payload,
        }
        case "ADD_ADJUSTMENT_ALL":
        return{
          ...state,
          allAdjustments:[...state.allAdjustments,action.payload]
        }
        case "ITEM_SEARCH_INPUT":
        return{
          ...state,
          searchItemInput:action.payload,
        }
        case "ITEM_SEARCH_OUTCOME":
        return{
          ...state,
          searchItemsList:action.payload,
        }
        case "DELETE_CHECKOUT_ITEM":
        return{
          ...state,
          checkoutItems:action.payload,
        }
        case "DISABLE_DELETE_BUTTON":
        return{
          ...state,
          disableDeleteButton:!state.disableDeleteButton,
        }
        case "ADD_PRODUCT_SALE":
        return{
          ...state,
          allSalesData:[...state.allSalesData,action.payload]
        }
        case "ADD_ITEM_SALE":
        return{
          ...state,
          allProductsSales:[...state.allProductsSales,action.payload]
        }
        case "LOGOUT":
        return{
          ...state,
        currentUser:"",
        }
        case "RESET_USERNAME":
        return{
          ...state,
          usernameInput:"",
        }
        case "RESET_PASSWORD":
        return{
          ...state,
          passwordInput:"",
        }
        case "SHOW_NAV_BAR":
        return{
          ...state,
          showNavBar:true,
        }
        case "NO_SHOW_NAV_BAR":
        return{
          ...state,
          showNavBar:false,
        }
      default:
        return state
    }
  }
  