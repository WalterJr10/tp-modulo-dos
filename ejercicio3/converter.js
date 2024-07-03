class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class CurrencyConverter {
    constructor() {
        this.apiUrl = 'https://www.frankfurter.app/';
        this.currencies = [];
    }

    getCurrencies(apiUrl) {
        const urlPeticion = `${this.url}${apiUrl}`;
        fetch(urlPeticion)
            .then(response => response.json)
            .then(data => {
                console.log(urlPeticion)
                console.log(data)
            })
        this.currencies.push(1);
        console.log(this.concurrencies)
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        const latestUrl = `${this.apiUrl}/latest`;
        


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
