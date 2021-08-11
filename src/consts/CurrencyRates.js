const CurrencyRates = {
    AUDUSD: { from: "AUD", to: "USD", rate: 0.8371 },
    CADUSD: { from: "CAD", to: "USD", rate: 0.8711 },
    USDCNY: { from: "USD", to: "CNY", rate: 6.1715 },
    EURUSD: { from: "EUR", to: "USD", rate: 1.2315 },
    GBPUSD: { from: "GBP", to: "USD", rate: 1.5683 },
    NZDUSD: { from: "NZD", to: "USD", rate: 0.7750 },
    USDJPY: { from: "USD", to: "JPY", rate: 119.95 },
    EURCZK: { from: "EUR", to: "CZK", rate: 27.6028 },
    EURDKK: { from: "EUR", to: "DKK", rate: 7.4405 },
    EURNOK: { from: "EUR", to: "NOK", rate: 8.6651 },
};

const RefCurrency = ["USD", "EUR"];

const USD = "USD";
const EUR = "EUR";

export {
    CurrencyRates,
    RefCurrency,
    USD,
    EUR
}
