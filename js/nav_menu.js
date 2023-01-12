// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标

  result <= 99 || (result = 99), (btn.innerHTML = result);

  /* 到达顶部时，导航栏内容变为菜单 */
  if (a === 0 && document.getElementById('page-header').classList.contains('nav-fixed')==true) {
    document.getElementById('page-header').classList.add('nav-visible')
  }

  /* 处理导航栏颜色变换和透明度变换 */
  const $header = document.getElementById('page-header')
  const currentTop = window.scrollY || document.documentElement.scrollTop
  if (currentTop > 56) {
    $header.classList.add('is-top-bar')
  }else if (currentTop === 0) {
    $header.classList.remove('is-top-bar')
  }
}

document.getElementById("page-name").innerText = document.title.split(" | Shine")[0];