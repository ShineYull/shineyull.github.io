var posts=["Add-custom-css-and-js-files.html","beautify-footer.html","footer-random-flink.html","card-author-tutorial.html","weixin-gongzonghao-tutorial.html","toc-jump-error.html","game-page-tutorial.html","twikoo-css-tutorial.html","video-page-tutorial.html","essay-music-notshow.html","howto-deploy-qexo-for-localhost.html","qexo-new-page.html","qexo-create-public-api.html","qexo-create-private-api.html","qexo-create-db.html","essay-support-links-and-video.html","qexo-multithreading.html","stable-diffusion-webui-deploy.html","stable-diffusion-webui-txt2img.html","sd-webui-img2img.html","sd-webui-mov2mov.html","sd-webui-solve-image-blur.html","flink-avatar-Carousel.html","page-jump-button-tutorial.html","essay-topic-and-feel.html","post-add-personalized-footer.html","essay-add-bilibili.html","setting-button-tutorial.html","qexo-postlike.html"];function toRandomPost(){pjax.loadUrl("/"+posts[Math.floor(Math.random()*posts.length)])}