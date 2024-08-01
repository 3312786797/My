// 实现模糊查询
let keyword =document.querySelector('.keyword');//获取输入框
let searchHelper = document.querySelector('.search-helper');//获取搜索下拉列表
//定义数组，存搜索内容
let searchArr = ['小米手机', '华为手机', '苹果手机', '小米电视', '小米平板', '苹果12', '苹果13', '苹果手表']

//给输入框绑定内容改变事件
keyword.oninput = function(){
    searchHelper.innerHTML = '';
    for(let i = 0; i < searchArr.length; i++){
        if(searchArr[i].indexOf(keyword.value) != -1){
            searchHelper.innerHTML += '<p>'+searchArr[i]+'</p>'
            searchHelper.style.display = 'block';
        }
    }
}

// 鼠标失焦事件
keyword.onblur = function(){
    searchHelper.style.display = 'none';
}

//实现轮播图的切换效果
let img = document.querySelector('.img');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let silde = document.querySelector('.silde');
let lis = document.querySelectorAll('.banner-btn li');


let imgArr = ['1.webp', '2.jpg', '3.jpg', '4.jpg', '5.webp', '6.webp', '7.jpg', '8.jpg'];

let count = 0;

//定义函数，用来切换图片的路径
function cutImg(){
    img.src = './imges/' + imgArr[count];

    for(let i = 0; i < lis.length; i++){
        lis[i].className = '';
    }

    lis [count].className = 'active';
}

// 定义定时器，实现图片3秒切换
let timer = setInterval (function(){
    count++;
    if(count > imgArr.length - 1){
        count = 0;
    }
    cutImg();
},2000);

// 点击下一个按钮，实现图片的切换
next.onclick = function(){
    count++;
    if(count > imgArr.length - 1){
        count = 0;
    }
    cutImg();
}

// 点击上一个按钮，实现图片的切换
prev.onclick = function(){
    count--;
    if(count < 0){
        count = imgArr.length - 1;
    }
    cutImg();
}

// 鼠标移入轮播图的div停止切换
silde.onmouseover = function(){
    clearInterval(timer);
}

// 鼠标移出轮播图的div开始切换
silde.onmouseout = function(){
    timer = setInterval(function(){
        count++;
        if(count > imgArr.length - 1){
            count = 0;
        }
        cutImg();
    }, 2000);
}

// 实现点击li按钮切换图片
for(let i = 0; i < lis.length; i++){
    lis[i].onclick = () =>{
        count = i;
        cutImg();
    }
}

// 实现滚动条滚动时，切换楼层的定位=================
let header = document.querySelector('.header');
let banner = document.querySelector('.banner');
let elevator = document.querySelector('.elevator');

//实现楼层滚动，文字变色
let items = document.querySelectorAll('.content .item');
let elevatorA = document.querySelectorAll('.elevator a');

let elevatorArr = [];

//基础的高度
let base = header.offsetHeight + banner.offsetHeight;

for(let i = 0; i < items.length; i++){
    base = base + items[i].offsetHeight;
    elevatorArr.push(base);
}

function clearColor(){
    for(let i = 0; i < elevatorA.length; i++){
        elevatorA[i].style.color = '';
    }
}

let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let searchLogo = document.querySelector('.search_logo');

document.onscroll = function(){
    // 获取到滚动条距离上面的距离
    let top = document.documentElement.scrollTop || document.body.scrollTop;

    //获取到header的高度
    let headerHeight =  header.offsetHeight; //包括 height、padding、border
    //获取到banner的高度
    let bannerHeihgt = banner.offsetHeight;

    //当滚动到一定程度时，将楼层的定位换成固定定位
    if(top >= headerHeight + bannerHeihgt){
        elevator.className = 'elevator elevator-fix'
        search.className = 'search search-fix';
        searchM.style.height = '50px';
        form.style.top = '8px';
        searchLogo.style.display = 'block';
    }else{
        elevator.className = 'elevator'
        search.className = 'search';
        searchM.style.height = '60px';
        form.style.top = '25px';
        searchLogo.style.display = 'none';
    }

    //切换楼层的字体颜色
    if(top < header.offsetHeight + banner.offsetHeight){
        clearColor();
    }else if(top >= header.offsetHeight + banner.offsetHeight && top < elevatorArr[0]){
        clearColor();
        elevatorA[0].style.color = 'red';
    }else if(top >= elevatorArr[0] && top < elevatorArr[1]){
        clearColor();
        elevatorA[1].style.color = 'red';
    }else if(top >= elevatorArr[1] && top < elevatorArr[2]){
        clearColor();
        elevatorA[2].style.color = 'red';
    }else if(top >= elevatorArr[2] ){
        clearColor();
        elevatorA[3].style.color = 'red';
    }
}
