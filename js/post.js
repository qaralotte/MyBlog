/*
 * 滚动进度
 */
window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    let progress = (scrollTop) / (scrollHeight - clientHeight) * 100;
    document.getElementById("progress").style.width = String(progress) + '%';
}, false);

/*
 * 移动到锚点
 */
function goAnchor(anchor) {
    let anchorTop = document.getElementById(anchor).offsetTop - 80;
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let distance = Math.abs(anchorTop - currentScroll) - 2;
    function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (distance > 0) {
            const currentDistance = Math.abs(currentScroll - anchorTop);
            let cmp = currentScroll < anchorTop ? 1 : -1;
            distance -= Math.round(currentDistance / 5);
            console.log(distance);
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll + cmp * Math.round(currentDistance / 5));
        }
    }
    window.requestAnimationFrame(smoothscroll);
}

/*
 * 锚点记录
 */
window.addEventListener("scroll", () => {
    let anchors = document.getElementsByClassName('main')[0].getElementsByClassName('anchor');
    let anchor_navs = document.getElementsByClassName('index_list')[0].getElementsByTagName('li');
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < anchors.length - 1; ++i) {
        let first_anchor = anchors[i];
        let second_anchor = anchors[i + 1];
        if (currentScroll + 2 >= first_anchor.offsetTop - 80 && currentScroll + 2 < second_anchor.offsetTop - 80) {
            anchor_navs[i].className = 'li_action';
        } else {
            anchor_navs[i].className = '';
        }
    }
    if (currentScroll + 2 >= anchors[anchors.length - 1].offsetTop - 80) {
        anchor_navs[anchor_navs.length - 1].className = 'li_action';
    } else {
        anchor_navs[anchor_navs.length - 1].className = '';
    }
})