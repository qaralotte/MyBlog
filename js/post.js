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