class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class CurrencyConverter {
    constructor() {
        this.apiUrl = 'api.frankfurter.app';
        this.currencies = [];
    }

    async getCurrencies() {
        const urlPeticion = `https://${this.apiUrl}/currencies`;

        const resp = await fetch(urlPeticion)
        const datas = await resp.json()

        /*
            convertir el objeto obtenido de la API a Array para crear instancias de Currency
            al iterar
        */  
        const arrayDatas = Object.entries(datas)
        
        for (let i = 0; i < arrayDatas.length; i++) {
            const curenci = new Currency();
            curenci.code = arrayDatas[i][0]
            curenci.name = arrayDatas[i][1]
            this.currencies.push(curenci)
        }

        
    }

    async convertCurrency(amount, fromCurrency, toCurrency) {
        const fromCy = fromCurrency.code
        const toCy = toCurrency.code
        const latestUrl = `https://${this.apiUrl}/latest?amount=${amount}&from=${fromCy}&to=${toCy}`;
        
        const resp = await fetch(latestUrl)
        const data = await resp.json()

        let monto = 0;
        if(fromCy == toCy){
            monto = amount;
        } else {
            switch (toCy) {
                case "AUD": //1
                    monto = `${data.rates.AUD}`
                    break;
                case "BGN":
                    monto = `${data.rates.BGN}`
                    break;
                case "BRL":
                    monto = `${data.rates.BRL}`
                    break;
                case "CAD":
                    monto = `${data.rates.CAD}`
                    break;
                case "CHF":
                    monto = `${data.rates.CHF}`
                    break;
                case "CNY":
                    monto = `${data.rates.CNY}`
                    break;
                case "CZK":
                    monto = `${data.rates.CZK}`
                    break;
                case "DKK":
                    monto = `${data.rates.DKK}`
                    break;
                case "EUR": 
                    monto = `${data.rates.EUR}`
                    break;
                case "GBP": 
                    monto = `${data.rates.GBP}`
                    break;
                case "HKD":
                    monto = `${data.rates.HKD}`
                    break;
                case "HUF":
                    monto = `${data.rates.HUF}`
                    break;
                case "IDR":
                    monto = `${data.rates.IDR}`
                    break;
                case "ILS":
                    monto = `${data.rates.ILS}`
                    break;
                case "INR":
                    monto = `${data.rates.INR}`
                    break;
                case "ISK":
                    monto = `${data.rates.ISK}`
                    break;
                case "JPY":
                    monto = `${data.rates.JPY}`
                    break;
                case "KRW": 
                    monto = `${data.rates.KRW}`
                    break;
                case "MXN": 
                    monto = `${data.rates.MXN}`
                    break;
                case "MYR": 
                    monto = `${data.rates.MYR}`
                    break;
                case "NOK":
                    monto = `${data.rates.NOK}`
                    break;
                case "NZD":
                    monto = `${data.rates.NZD}`
                    break;
                case "PHP":
                    monto = `${data.rates.PHP}`
                    break;
                case "PLN":
                    monto = `${data.rates.PLN}`
                    break;
                case "RON":
                    monto = `${data.rates.RON}`
                    break;
                case "SEK":
                    monto = `${data.rates.SEK}`
                    break;
                case "SGD": 
                    monto = `${data.rates.SGD}`
                    break;
                case "THB": 
                    monto = `${data.rates.THB}`
                    break;
                case "TRY": 
                    monto = `${data.rates.TRY}`
                    break;
                case "USD": 
                    monto = `${data.rates.USD}`
                    break;
                case "ZAR": 
                    monto = `${data.rates.ZAR}`
                    break;
                default:
                    break;
            }
        }
        const montoFinal = Number(monto)
        return montoFinal;

    }  

}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    const converter = new CurrencyConverter("https://api.frankfurter.app");

    await converter.getCurrencies();
    populateCurrencies(fromCurrencySelect, converter.currencies);
    populateCurrencies(toCurrencySelect, converter.currencies);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = converter.currencies.find(
            (currency) => currency.code === fromCurrencySelect.value
        );
        const toCurrency = converter.currencies.find(
            (currency) => currency.code === toCurrencySelect.value
        );

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${
                fromCurrency.code
            } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }
    });

    function populateCurrencies(selectElement, currencies) {
        if (currencies) {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} - ${currency.name}`;
                selectElement.appendChild(option);
            });
        }
    }
});
