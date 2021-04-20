export enum GaEvent {
    // Custom Event
    CustomEvent = "custom_event",

    // All Apps
    JoinGroup = "join_group",
    Login = "login",
    PresentOffer = "present_offer",
    Purchase = "purchase",
    Refund = "refund",
    Search = "search",
    SelectContent = "select_content",
    Share = "share",
    SignUp = "sign_up",
    SpendVirtualCurrency = "spend_virtual_currency",
    EarnVirtualCurrency = "earn_virtual_currency",
    TutorialBegin = "tutorial_begin",
    TutorialComplete = "tutorial_complete",

    // Retail/Ecommerce
    // https://support.google.com/firebase/answer/6317499?hl=en&ref_topic=6317484
    AddPaymentInfo = "add_payment_info",
    AddToCart = "add_to_cart",
    AddToWishlist = "add_to_wishlist",
    BeginCheckout = "begin_checkout",
    EcommercePurchase = "ecommerce_purchase",
    GenerateLead = "generate_lead",
    PurchaseRefund = "purchase_refund",
    ViewItem = "view_item",
    ViewItemList = "view_item_list",
    ViewSearchResults = "view_search_results",
    selectItem = "select_item",

    // Jobs, Education, Local Deals, Real Estate (currently identical to Retail/Ecommerce)
    // https://support.google.com/firebase/answer/6375140?hl=en&ref_topic=6317484

    // Travel (Hotel/Air) - same as Retail/Ecommerce + Search
    // https://support.google.com/firebase/answer/6317508?hl=en&ref_topic=6317484

    // Games
    // https://support.google.com/firebase/answer/6317494?hl=en&ref_topic=6317484
    LevelUp = "level_up",
    PostScore = "post_score",
    UnlockAchievement = "unlock_achievement",

    // Automatically collected events
    // https://support.google.com/firebase/answer/6317485?hl=en&ref_topic=6317484
    AdReward = "ad_reward",
    AppException = "app_exception",
    AppStoreRefund = "app_store_refund",
    AppStoreSubscriptionCancel = "app_store_subscription_cancel",
    AppStoreSubscriptionConvert = "app_store_subscription_convert",
    AppStoreSubscriptionRenew = "app_store_subscription_renew",
    DynamicLinkAppOpen = "dynamic_link_app_open",
    DynamicLinkAppUpdate = "dynamic_link_app_update",
    DynamicLinkFirstOpen = "dynamic_link_first_open"
}