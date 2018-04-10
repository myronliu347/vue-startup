// 注册的地址为 sw-precache-webpack-pulgin 生成的 service-worker.js 或者自己手动维护的 service worker 文件
navigator.serviceWorker &&
    navigator.serviceWorker.register('/service-worker.js').then(() => {
        navigator.serviceWorker.addEventListener('message', e => {
            // service-worker.js 如果更新成功会 postMessage 给页面，内容为 'sw.update'
            if (e.data === 'sw.update') {
                // TODO 更新之后reload操作
            }
        });
    });
