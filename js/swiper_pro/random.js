var posts=["EasyEngine.html","Design-Patterns.html","EasyDocker.html","EasyDB.html","EasyLua.html","EasyRPC.html","Game-making-from-my-perspective.html","GameUE-Slolo.html","Add-custom-css-and-js-files.html","beautify-footer.html","footer-random-flink.html","c-sizeof.html","keil5-find-cpu.html","weixin-gongzonghao-tutorial.html","card-author-tutorial.html","setting-button-tutorial.html","toc-jump-error.html","game-page-tutorial.html","twikoo-css-tutorial.html","video-page-tutorial.html"];function toRandomPost(){pjax.loadUrl("/"+posts[Math.floor(Math.random()*posts.length)])}