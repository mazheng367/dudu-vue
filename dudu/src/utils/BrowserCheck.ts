export function checkScreenZoom() {
    const zoom = detectZoom();
    if (zoom < 100) {
        createZoomCheckDom();
    } else {
        let dom = document.querySelector("#oZoomCheckDom");
        if (dom && dom.parentNode) {
            dom.removeEventListener("click", zoomCloseHandler);
            dom.parentNode.removeChild(dom);
        }
    }
}


function detectZoom() {
    let ratio = 0,
        screen = window.screen;

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if ((screen as any).deviceXDPI && (screen as any).logicalXDPI) {
        ratio = (screen as any).deviceXDPI / (screen as any).logicalXDPI;
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }

    return ratio;
}

function createZoomCheckDom() {
    let dom = document.querySelector("#oZoomCheckDom");
    if (dom) {
        return;
    }
    dom = document.createElement("div");
    dom.setAttribute("id", "oZoomCheckDom");
    dom.className = "zoom-checker";
    dom.innerHTML = `您的浏览器的缩放比例不是最佳缩放比例，可能会影响某些功能的正常使用。<br>请使用如下方式调整：<br>1、快捷键ctrl+0<br>2、浏览器设置面板-&gt;显示-&gt;缩放<i class='close-icon'></i>`;
    document.body.appendChild(dom);
    dom.addEventListener("click", zoomCloseHandler);
}

function zoomCloseHandler(event: Event) {
    const target = event.target as Element;
    if (target.className.indexOf("close-icon") === -1) {
        return;
    }
    let dom = document.querySelector("#oZoomCheckDom");
    if (dom && dom.parentNode) {
        dom.removeEventListener("click", zoomCloseHandler);
        dom.parentNode.removeChild(dom);
    }
}