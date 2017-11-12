import { createSelector } from 'reselect'

const selectStep3data = (state) => state.get('step3data')
const makePaymentType = () => createSelector(
  selectStep3data,
  (thirdStep) => thirdStep.get('PaymentType')
)
const makeThirdStep = () => createSelector(
  selectStep3data,
  (thirdStep) => ({
    paymentType: thirdStep.get('PaymentType')
  })
)
export {
  makePaymentType,
  makeThirdStep
}
