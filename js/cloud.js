/* PlatformX — 云服务初始化
 * 通过本地化 SDK（js/workbuddy-cloud-sdk.js）初始化单例 client，
 * 供 app.js 使用 Auth / Database / LLM 能力。
 * SDK 已本地化，不依赖任何 CDN（消除 jsdelivr 网络抖动问题）。
 * endpoint / oauthRelayBaseUrl / publishableKey 均来自 publicConfig。
 */
(function () {
  const PUBLIC_CONFIG = {
    endpoint: 'https://platformx.app.workbuddy.host',
    oauthRelayBaseUrl: 'https://www.workbuddy.cn/v2/as/genie-baas/oauth',
    publishableKey: 'wbpk_4P4EuEisEGwx4wd7625QEy_d58aEBgA9Cz96f10iWSTo4vi61xFn3zB'
  };

  if (typeof WorkBuddyCloud === 'undefined') {
    console.warn('[PlatformX] WorkBuddyCloud SDK 未加载，云服务能力不可用。');
    window.cloud = null;
    return;
  }

  window.cloud = WorkBuddyCloud.createWorkBuddyCloud({
    endpoint: PUBLIC_CONFIG.endpoint,
    oauthRelayBaseUrl: PUBLIC_CONFIG.oauthRelayBaseUrl,
    publishableKey: PUBLIC_CONFIG.publishableKey
  });

  // 标记云服务可用
  window.cloudReady = true;
})();
