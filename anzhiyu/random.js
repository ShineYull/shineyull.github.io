var posts=["EasyEngine.html","EasyLua.html","Design-Patterns.html","EasyDB.html","Game-making-from-my-perspective.html","EasyDocker.html","EasyRPC.html","GameUE-Slolo.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};