// Waline 浏览量统计初始化
// 重要：请在下面三处位置将 'https://your-waline-server.vercel.app' 替换为你自己的 Waline 服务器地址
// 部署教程：https://waline.js.org/
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Waline === 'undefined') {
        console.warn('Waline SDK 未加载，无法统计浏览量');
        return;
    }

    // 检测是否为文章详情页
    const isSinglePage = document.body.classList.contains('single-post') ||
                         document.body.classList.contains('single') ||
                         document.body.classList.contains('page');

    // 从页面中的 data-path 获取正确的路径
    let currentPath = window.location.pathname;
    const firstPageviewElement = document.querySelector('.waline-pageview-count');
    if (firstPageviewElement && firstPageviewElement.getAttribute('data-path')) {
        currentPath = firstPageviewElement.getAttribute('data-path');
    }

    console.log('🔍 页面类型检测:', {
        isSinglePage: isSinglePage,
        urlPathname: window.location.pathname,
        dataPath: currentPath,
        bodyClasses: document.body.className
    });

    if (isSinglePage) {
        // 文章详情页：先更新计数，然后刷新显示
        console.log('📝 文章页：增加浏览量...', currentPath);

        Waline.pageviewCount({
            serverURL: 'https://your-waline-server.vercel.app',// 重要：替换为你自己的 Waline 服务器地址
            path: currentPath,
            update: true,
        });

        setTimeout(function() {
            console.log('🔄 刷新浏览量显示...');
            Waline.pageviewCount({
                serverURL: 'https://your-waline-server.vercel.app',// 重要：替换为你自己的 Waline 服务器地址
                update: false,
            });
        }, 500);
    } else {
        // 列表页/首页：只读取浏览量，不增加计数
        console.log('📋 列表页：读取浏览量...');
        const pageviewElements = document.querySelectorAll('.waline-pageview-count');
        if (pageviewElements.length > 0) {
            Waline.pageviewCount({
                serverURL: 'https://your-waline-server.vercel.app',// 重要：替换为你自己的 Waline 服务器地址
                update: false,
            });
        }
    }
});
