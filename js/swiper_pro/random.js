var posts=["EasyEngine.html","EasyLua.html","EasyDB.html","EasyDocker.html","Design-Patterns.html","EasyRPC.html","Game-making-from-my-perspective.html","GameUE-Slolo.html","Add-custom-css-and-js-files.html","beautify-footer.html","footer-random-flink.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};