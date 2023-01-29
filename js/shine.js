"use strict";
var shine = {
    saveData: (e,t)=>{
        localStorage.setItem(e, JSON.stringify({
            time: Date.now(),
            data: t
        }))
    },
    loadData: (e,t)=>{
        let n = JSON.parse(localStorage.getItem(e));
        if (n) {
            let e = Date.now() - n.time;
            if (e < 60 * t * 1e3 && e > -1)
                return n.data
        }
        return 0
    },
    randomLink: ()=>{
        let e = shine.loadData("links", 30);
        if (e) {
            let t = document.querySelectorAll("#friend-links-in-footer .footer-item");
            if (!t.length)
                return;
            for (let n = 0; n < 5; n++) {
                let o = parseInt(Math.random() * e.length);
                t[n].innerText = e[o].name,
                t[n].href = e[o].link,
                e.splice(o, 1)
            }
        } else{
            fetch("/link.json").then((e=>e.json())).then((e=>{
                shine.saveData("links", e.link_list),
                shine.randomLink()
            }
            ))
        }
    },
    getTimeState: function() {
        var e = (new Date).getHours()
          , t = "";
        return 0 <= e && e <= 5 ? t = "晚安😴" : 5 < e && e <= 10 ? t = "早上好👋" : 10 < e && e <= 14 ? t = "中午好👋" : 14 < e && e <= 18 ? t = "下午好👋" : 18 < e && e <= 24 && (t = "晚上好👋"),
        t
    },
    sayhi: function() {
        var e = document.getElementById("author-info__sayhi");
        e && (e.innerHTML = shine.getTimeState() + "！我是")
    },
    logInfo: ()=>{
        console.log(`Welcome to:\n%cShine blog:%c https://blog.shineyu.cn%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2022/12/01 00:00:00").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
    },
    // 切换热评
    switchCommentBarrage: function () {
        let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
        document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
        // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
        window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
    },
    //显示中控台
    showConsole: function() {
        document.querySelector("#console").classList.add("show");
        shine.initConsoleState();
    },
    //隐藏中控台
    hideConsole: function() {
        document.querySelector("#console").classList.remove("show");
    },
    //隐藏侧边栏
    hideAsideBtn: () => { // Hide aside
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
        ? saveToLocal.set('aside-status', 'show', 2)
        : saveToLocal.set('aside-status', 'hide', 2)
        $htmlDom.toggle('hide-aside')
        $htmlDom.contains('hide-aside')
        ? document.querySelector("#consoleHideAside").classList.add("on")
        : document.querySelector("#consoleHideAside").classList.remove("on")
    },
    //初始化console图标
    initConsoleState: function() {
        //初始化隐藏边栏
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
        ? document.querySelector("#consoleHideAside").classList.add("on")
        : document.querySelector("#consoleHideAside").classList.remove("on")

        /*初始化热评按钮状态*/
        shine.initSwitchCommentBarrage();
    },
    //全屏
    enterFullscreen: function(el) {
        console.log("进入全屏的元素", el)
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else {
            shine.noFullscreenSupport();
        }

        if (shine.is_mobile()) {
            window.screen.orientation.lock("landscape-primary");
        }
    },
    //退出全屏
    exitFullscreen: function(fullscreenElement) {
        console.log("全屏元素", fullscreenElement)
        // var doc = getIframe();
        let doc = window.top.document;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else {
            shine.noFullscreenSupport();
        }
    },
    noFullscreenSupport: function() {
        fullscreenState = !fullscreenState;
        alert('您的浏览器不支持全屏.');
    },
    is_mobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },
    //滚动到指定id
    scrollTo:function(id){
        var domTop = document.querySelector(id).offsetTop;
        window.scrollTo(0,domTop - 80);
    },
    applyFlink: function() {
        var input = document.getElementsByClassName('el-textarea__inner')[0];
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        input.value = '昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n';
        input.dispatchEvent(evt);
        shine.scrollTo("#post-comment");
        input.focus();
        input.setSelectionRange(-1, -1);
    },
    //控制评论弹幕
    switchCommentBarrage: function() {
        let commentBarrage = document.querySelector('#comment-barrage');
        if(commentBarrage){
            if($("#comment-barrage").is(":visible")) {
                $("#comment-barrage").hide();
                $(".menu-commentBarrage-text").text("显示热评");
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
                localStorage.setItem('commentBarrageSwitch', 'false');
            }else if ($("#comment-barrage").is(":hidden")) {
                $("#comment-barrage").show();
                $(".menu-commentBarrage-text").text("关闭热评");
                document.querySelector("#consoleCommentBarrage").classList.add("on");
                localStorage.removeItem('commentBarrageSwitch');
            }
        }
    },
    //初始化控制评论弹幕开关颜色
    initSwitchCommentBarrage: function() {
        if(localStorage.getItem('commentBarrageSwitch') == null){
            $("#comment-barrage").show();
            $(".menu-commentBarrage-text").text("关闭热评");
            document.querySelector("#consoleCommentBarrage").classList.add("on");
            localStorage.removeItem('commentBarrageSwitch');
        }else if (localStorage.getItem('commentBarrageSwitch') == 'false') {
            $("#comment-barrage").hide();
            $(".menu-commentBarrage-text").text("显示热评");
            document.querySelector("#consoleCommentBarrage").classList.remove("on");
        }
    }
}

shine.randomLink();
shine.sayhi();
shine.logInfo();