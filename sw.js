/*
 * @Author: strick
 * @LastEditors: strick
 * @Date: 2023-02-13 15:08:32
 * @LastEditTime: 2023-02-14 10:48:37
 * @Description: 
 * @FilePath: /web/pe/sw.js
 */

// 安装
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("resource").then(cache => {
      cache.addAll(["/assets/js/demo.js"]).then(() => {
        console.log("资源都已获取并缓存");
      }).catch(error => {
        console.log('缓存失败:', error);
      });
    })
  );
});

// 拦截
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      // 响应缓存
      if (response) {
        console.log("fetch cache");
        return response;
      }
      return fetch(e.request);
    })
  );
});

