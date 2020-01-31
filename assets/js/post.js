var postContent = document.querySelector('#post-content');
var imgs = postContent.querySelectorAll('img');
var len = imgs.length;

for (let i = 0; i < len; i++) {
    imgs[i].classList.add('materialboxed');
    imgs[i].classList.add('z-depth-4');
}