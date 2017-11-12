/*
 *
 * StepContainer constants
 *
 */
export const StepList = [
  {
    id: 0,
    tip: '会员注册',
    state: 'active',
    route: 'first',
    component: () => import('../FirstStep/index')
  }, {
    id: 1,
    tip: '个人信息',
    state: 'do',
    route: 'second',
    component: () => import('../PersonalInfo/index')
  }, {
    id: 2,
    tip: '个人信息',
    state: 'do',
    route: 'third',
    component: () => import('../Step3/index')
  }, {
    id: 3,
    tip: '订单详情',
    state: 'do',
    route: 'fourth',
    component: () => import('../FourthStep/index')
  }, {
    id: 4,
    tip: '结果确认',
    state: 'do',
    route: 'fifth',
    component: () => import('../FifthStep/index')
  }
]
export const NEXT_STEP = 'app/StepContainer/NEXT_STEP'
export const PREVIEW_STEP = 'app/StepContainer/PREVIEW_STEP'
export const RESET_STEP = 'app/StepContainer/RESET_STEP'
