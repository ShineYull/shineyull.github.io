var fdata = {
    api: "https://hexo-circle-of-friends.shineyu.cn/",
    init: 20,
    step: 10,
    sort: "created",
    avatar: "https://npm.elemecdn.com/eurkon-cdn/hexo/images/user/loading.gif"
};
function loadArticleItem(t, e, a, i) {
    let n = "";
    for (let l = e; l < Math.min(a, i); l++) {
        let e = t[l];
        n += `\n      <div class="article-sort-item fc-article-sort-item">\n        <a class="article-sort-item-img" onclick="openMeShow(event)" title="${e.author}" data-link="${e.link}" target="_blank" rel="noopener nofollow" href="javascript:;"> \n          <img src="${e.avatar}" alt="${e.title}" onerror="this.onerror=null;this.src='${fdata.avatar}';">\n        </a>\n        <div class="article-sort-item-info no-lightbox flink-item-icon">\n          <a class="article-sort-item-title" href="${e.link}" target="_blank" rel="noopener nofollow" title="${e.title}">${e.title}</a>\n          <span class="article-sort-item-index">${e.floor}</span>\n          <div class="article-meta-wrap">\n            <i class="far fa-user"></i>\n            <span class="fc-article-author">${e.author}</span>\n            <div class="article-sort-item-time">\n              <span class="fc-time-created" style="${"created" == fdata.sort ? "" : "display:none"}"><i class="far fa-calendar-alt"></i> ${e.created} </span>\n              <span class="fc-time-updated" style="${"updated" == fdata.sort ? "" : "display:none"}"><i class="fas fa-history"></i> ${e.updated} </span>\n            </div>\n          </div>\n        </div>\n      </div>\n      `
    }
    document.getElementById("fc-container").insertAdjacentHTML("beforeend", n),
    fetchNextArticle()
}
function loadFcircleShow_fcircle(t, e) {
    let a = '<div class="fc-overshow" style="display: flex; align-items: center; justify-content: center;">暂无数据</div>';
    if (t && e) {
        a = `\n      <div class="fc-overshow">\n        <div class="fc-overshow-head avatar-img">\n          <a class="" target="_blank" rel="noopener nofollow" href="${t.link}"><img src="${t.avatar}" alt="avatar" onerror="this.src='${fdata.avatar}'; this.onerror = null;"></a>\n        </div>\n        <div>\n          <i class="far fa-user"></i>\n          <span class="fc-article-author">${t.name}</span>\n        </div>\n        <div class="fc-overshow-content">`;
        for (let i = 0; i < Math.min(t.article_num, fdata.init); i++) {
            let t = e[i];
            a += `\n      <p><a class="article-sort-item-title" href="${t.link}" target="_blank" rel="noopener nofollow" title="${t.title}">${t.title}</a><span>${t.created}</span></p>`
        }
        a += "</div></div>"
    }
    document.getElementById("fc-overshow").insertAdjacentHTML("beforeend", a),
    document.getElementById("fc-overshow").classList.add("fc-show-now")
}
function fetchNextArticle() {
    let t = document.getElementById("fc-container").getElementsByClassName("article-sort-item").length
      , e = JSON.parse(localStorage.getItem("fc_statistical")).article_num
      , a = Math.min(t + fdata.step, e);
    if (t < e) {
        let e = fdata.api + "all?rule=" + fdata.sort + "&start=" + t + "&end=" + a;
        fetch(e).then((t=>t.json())).then((t=>{
            let e = t.article_data;
            localStorage.setItem("fc_nextArticle", JSON.stringify(e))
        }
        ))
    } else
        (t = e) && (document.getElementById("fc-more").outerHTML = '<div id="fc-more" class="article-sort-item"><small>一切皆有尽头！</small></div>')
}
function loadNextArticle() {
    let t = JSON.parse(localStorage.getItem("fc_nextArticle"))
      , e = "";
    for (let a = 0; a < t.length; a++) {
        let i = t[a];
        e += `\n    <div class="article-sort-item fc-article-sort-item">\n      <a class="article-sort-item-img" onclick="openMeShow(event)" title="${i.author}" data-link="${i.link}" target="_blank" rel="noopener nofollow" href="javascript:;"> \n        <img src="${i.avatar}" alt="${i.title}" onerror="this.onerror=null;this.src='${fdata.avatar}';">\n      </a>\n      <div class="article-sort-item-info no-lightbox flink-item-icon">\n        <a class="article-sort-item-title" href="${i.link}" target="_blank" rel="noopener nofollow" title="${i.title}">${i.title}</a>\n        <span class="article-sort-item-index">${i.floor}</span>\n        <div class="article-meta-wrap">\n          <i class="far fa-user"></i>\n          <span class="fc-article-author">${i.author}</span>\n          <div class="article-sort-item-time">\n            <span class="fc-time-created" style="${"created" == fdata.sort ? "" : "display:none"}"><i class="far fa-calendar-alt"></i> ${i.created} </span>\n            <span class="fc-time-updated" style="${"updated" == fdata.sort ? "" : "display:none"}"><i class="fas fa-history"></i> ${i.updated} </span>\n          </div>\n        </div>\n      </div>\n    </div>\n    `
    }
    document.getElementById("fc-container").insertAdjacentHTML("beforeend", e),
    fetchNextArticle()
}
function fetchFriendCircle(t) {
    let e = fdata.api + "all?rule=" + t + "&start=0&end=" + fdata.init;
    fetch(e).then((t=>t.json())).then((t=>{
        let e = t.statistical_data
          , a = t.article_data;
        localStorage.setItem("fc_statistical", JSON.stringify(e)),
        localStorage.setItem("fc_article", JSON.stringify(a)),
        loadArticleItem(a, 0, fdata.init, e.article_num)
    }
    ))
}
function openMeShow(t) {
    t.preventDefault();
    let e = t.currentTarget.dataset.link.replace(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, "$1:$2$3")
      , a = "";
    a = fdata.api + "post?link=" + e + "&num=10",
    fetchShow(a)
    console.log("[Shine]: openMeShow");
}
function closeShow() {
    document.getElementById("fc-overlay").classList.remove("fc-show-now"),
    document.getElementById("fc-overshow").classList.remove("fc-show-now"),
    document.getElementById("fc-overshow").innerHTML = ""
}
function fetchShow(t) {
    document.getElementById("fc-overlay").classList.add("fc-show-now"),
    document.getElementById("fc-overshow").insertAdjacentHTML("afterbegin", '<div class="fc-overshow-close" onclick="closeShow()"></div>'),
    fetch(t).then((t=>t.json())).then((t=>{
        loadFcircleShow_fcircle(t.statistical_data, t.article_data)
    }
    ))
}
function initFriendCircle(t) {
    // let e = document.getElementById("fc-container");
    // e || (e = document.createElement("div"),
    // e.id = "fc-container",
    // document.getElementById("article-container").appendChild(e)),
    // e.classList.add("article-sort"),
    // e.classList.add("fc-article-sort"),
    // e.insertAdjacentHTML("afterend", '<div id="fc-more" class="article-sort-item fc-article-sort-item" onclick="loadNextArticle()"><i class="fas fa-angle-double-down"></i></div>'),
    document.body.insertAdjacentHTML("afterend", '<div id="fc-overlay" onclick="closeShow()"></div>\n      <div id="fc-overshow-parent"><div id="fc-overshow"></div></div>');
    // let a = JSON.parse(localStorage.getItem("fc_statistical"))
    //   , i = JSON.parse(localStorage.getItem("fc_article"));
    // if (a && i) {
    //     loadArticleItem(i, 0, fdata.init, a.article_num);
    //     let n = fdata.api + "all?rule=" + t + "&start=0&end=" + fdata.init;
    //     fetch(n).then((t=>t.json())).then((t=>{
    //         let n = t.statistical_data
    //           , l = t.article_data;
    //         a.article_num === n.article_num && i[0].title === l[0].title || (e.innerHTML = "",
    //         localStorage.setItem("fc_statistical", JSON.stringify(n)),
    //         localStorage.setItem("fc_article", JSON.stringify(l)),
    //         loadArticleItem(l, 0, fdata.init, n.article_num))
    //     }
    //     ))
    // } else
    //     fetchFriendCircle(fdata.sort)
}
initFriendCircle(fdata.sort);