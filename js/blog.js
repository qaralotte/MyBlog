
/*
 * 屏蔽错误
 */
window.onerror = () => {
    return true;
}

/*
 * 顶部判断
 */
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop !== 0) {
        document.getElementById("header_top").id = 'header_scroll';
        document.getElementById("title_top").id = 'title_scroll';
        document.getElementById("go_top").style.opacity = "1";
        document.getElementById("go_top").style.pointerEvents = "initial";
    } else {
        document.getElementById("header_scroll").id = 'header_top';
        document.getElementById("title_scroll").id = 'title_top';
        document.getElementById("go_top").style.opacity = "0";
        document.getElementById("go_top").style.pointerEvents = "none";
    }
}, false);

/*
 * 返回顶部按钮
 */
function goTop() {
    let distance = document.documentElement.scrollTop || document.body.scrollTop;
    function smoothscroll() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (distance > 0 && currentScroll !== 0) {
            distance -= currentScroll / 5;
            window.requestAnimationFrame(smoothscroll)
            window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
    }
    window.requestAnimationFrame(smoothscroll);
}