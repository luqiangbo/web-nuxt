import qs from 'qs'
import { to } from '~/util'
export default ($axios) => (resource) => ({
  // 首页文章列表
  getArticle(int) {
    return to($axios.$get(`${resource}/article/list/${int}/json`))
  },
  // 首页banner
  getBanner() {
    return to($axios.$get(`${resource}/banner/json`))
  },
  getAllIndex(int) {
    console.log(this)
    return to(
      Promise.all([
        $axios.$get(`${resource}/banner/json`),
        $axios.$get(`${resource}/article/list/${int}/json`),
        $axios.$get(`${resource}/hotkey/json`),
      ]),
    )
  },
  // 登录
  postLogin(payload) {
    return to($axios.$post(`${resource}/user/login`, qs.stringify(payload)))
  },
  // 注册
  postRegister(payload) {
    return to($axios.$post(`${resource}/user/register`, qs.stringify(payload)))
  },
  // 退出
  getLogout() {
    return to($axios.$post(`${resource}/user/logout/json`))
  },
})
