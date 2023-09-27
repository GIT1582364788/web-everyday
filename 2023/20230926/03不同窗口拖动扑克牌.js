const card = document.querySelector('.card')

// 量一下浏览器通知栏的高度 79
const BAR = 79

// 第一个工具函数
function getClientPoint(screenX, screenY){
    const clientX = screenX - window.screenX;
    const clinetY = screenY - window.screenY - BAR;
    return [clientX, clinetY]
}
// 第二个工具函数
function getScreenPoint(clientX, clinetY){
    const screenX = clientX + window.screenX;
    const screenY = clinetY + window.screenY + BAR;
    return [screenX, screenY]
}

// 卡片拖动
card.onmousedown = (e) => {
    let x = e.pageX - card.offsetLeft;
    let y = e.pageY - card.offsetTop;
    window.onmousemove = (e) => {
        const cx = e.pageX - x;
        const cy = e.pageY - y;
        card.style.left = cx + 'px';
        card.style.top = cy + 'px';
        // 通知其他窗口 ： 1.标签页之间的通信（效率高没有延迟，要求同一浏览器，同一台电脑） 2.服务器websocket（走接口，可以跨设备，跨平台。）
        channel.postMessage(getScreenPoint(cx, cy))
    }
    window.onmouseup = () => {
        window.onmousemove = null
        window.onmouseup = null
    }
}

function init(){
    // url地址获取  .html?hidden
    if(location.search.includes('hidden')){
        card.style.left = '-1000px'
    }
}
init()

// 标签页之间的通信
const channel = new BroadcastChannel('card');
channel.onmessage = (e) => {
    // console.log(e.data);
    const [cx, cy] = getClientPoint(...e.data)
    card.style.left = cx + 'px';
    card.style.top = cy + 'px';
}