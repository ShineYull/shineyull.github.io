var posts=["EasyLua.html","EasyEngine.html","Design-Patterns.html","EasyDB.html","EasyDocker.html","EasyRPC.html","Game-making-from-my-perspective.html","GameUE-Slolo.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};