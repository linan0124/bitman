import fetch from '@/utils/fetch'
// 获取矿池数据
export function getDigMine () {
  return fetch({
    url: '/mine/getDigMine',
    method: 'post'
  })
}

// 挖矿
export function collectCandy (query) {
  return fetch({
    url: '/mine/collectCandy',
    method: 'post',
    params: query
  })
}

// 获取首页数据
export function stressRank () {
  return fetch({
    url: '/user/stressRank',
    method: 'post'
  })
}

// 排行榜信息
export function accountRank (query) {
  return fetch({
    url: '/user/accountRank',
    method: 'post',
    params: query
  })
}
