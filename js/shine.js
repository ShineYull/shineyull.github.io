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
    }
}

shine.randomLink();