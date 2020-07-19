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