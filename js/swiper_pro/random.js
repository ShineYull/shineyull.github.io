var posts=["Design-Patterns.html","EasyEngine.html","EasyLua.html","EasyDB.html","EasyDocker.html","EasyRPC.html","GameUE-Slolo.html","Add-custom-css-and-js-files.html","Game-making-from-my-perspective.html","beautify-footer.html","footer-random-flink.html","c-sizeof.html","card-author-tutorial.html","keil5-find-cpu.html","weixin-gongzonghao-tutorial.html","setting-button-tutorial.html","toc-jump-error.html","twikoo-css-tutorial.html","game-page-tutorial.html","video-page-tutorial.html"];function toRandomPost(){pjax.loadUrl("/"+posts[Math.floor(Math.random()*posts.length)])}