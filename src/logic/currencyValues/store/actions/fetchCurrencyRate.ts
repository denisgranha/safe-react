import fetchCurrenciesRates from 'src/logic/currencyValues/api/fetchCurrenciesRates'
import { setCurrencyRate } from 'src/logic/currencyValues/store/actions/setCurrencyRate'
import { AVAILABLE_CURRENCIES } from 'src/logic/currencyValues/store/model/currencyValues'
import { Dispatch } from 'redux'

const fetchCurrencyRate = (safeAddress: string, selectedCurrency: AVAILABLE_CURRENCIES) => async (
  dispatch: Dispatch,
): Promise<void> => {
  if (AVAILABLE_CURRENCIES.USD === selectedCurrency) {
    return dispatch(setCurrencyRate(safeAddress, 1))
  }

  const selectedCurrencyRateInBaseCurrency: number = await fetchCurrenciesRates(
    AVAILABLE_CURRENCIES.USD,
    selectedCurrency,
  )

  dispatch(setCurrencyRate(safeAddress, selectedCurrencyRateInBaseCurrency))
}

export default fetchCurrencyRate
