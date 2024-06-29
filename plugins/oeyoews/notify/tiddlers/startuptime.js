/*\
title: $:/plugins/oeyoews/notify/startuptime.js
type: application/javascript
module-type: startup

startuptime
\*/
exports.name = 'notify-startuptime-hook';
exports.platforms = ['browser'];
exports.after = ['load-modules'];
exports.synchronous = true;
exports.startup = () => {
  try {
    const configfilename = '$:/config/tiddlywiki-starter-kit/setting.json';
    if (!$tw.wiki.tiddlerExists(configfilename)) {
      // TODO: Create config file
      console.warn(`${configfilename} 文件不存在`);
    }

    const settings = $tw.wiki.getTiddlerData(configfilename) || {};
    const notifier = new $tw.Notify();
    const startTime = performance.now();

    window.addEventListener('load', () => {
      const loadTime = Math.floor(performance.now() - startTime);
      if (settings?.['notify#startuptime'] === 'no') return;
      notifier.display({
        title: '启动时间',
        text: `本次启动耗时约 ${loadTime} 毫秒`,
        position: 'bottom x-center',
        showCloseButton: false,
        effect: 'slide',
        type: 2,
        customIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 0l10.23 6v12L12 24L1.77 18V6L12 0zm3.961 17.889l.154-.02c.113-.043.22-.081.288-.19c.227-.329-.357-.462-.566-.827c-.209-.364-1.071-2.364-.418-2.924s1.359-.79 1.629-1.315c.117-.236.238-.475.269-.742c.159.132.283.255.497.262c.567.036 1.054-.658 1.307-1.315c.135-.404.244-.832.218-1.226c-.069-.76.013-1.582.62-2.087c-.599.302-1.167.69-1.845.789c-.374-.114-.75-.216-1.147-.2c-.194-.253-.456-.727-.797-.782c-.58.208-.597 1.105-.842 2.321a5.351 5.351 0 0 0-1.154-.193c-.54-.035-1.42.134-2.038.116c-.619-.018-1.836-.562-2.849-.445c-.407.05-.817.12-1.195.291c-.231.105-.565.421-.733.468c-1.69.473-4.442.453-3.879-2.102c.044-.196.056-.373-.03-.417c-.11-.055-.17.06-.234.187c-.985 2.138.764 3.514 2.752 3.52c.625-.048.324-.007.904-.118l-.015.082a1.87 1.87 0 0 0 .865 1.718c-.27.771-.805 1.389-1.173 2.097c.138.881 1.031 2.057 1.4 2.225c.326.147 1.036.149 1.2-.089c.059-.111.02-.351-.044-.474c.277.308.651.736 1.013.942c.217.104.434.17.677.18l.31-.016c.154-.033.336-.058.44-.195c.116-.2.007-.756-.476-.796c-.483-.04-.795-.222-1.24-.882c-.365-.638.077-1.517.226-2.145c.765.123 1.535.22 2.31.222c.336-.017.67-.03 1.001-.093c.106.27.402 1.025.404 1.239c.007.601-.219 1.205-.121 1.807c.06.177.005.512.35.526l.388.018l.267-.008c.341.573.637.572 1.307.591zm-7.518-1.66l-.063-.056c-.184-.198-.66-.544-.572-.865c.075-.238.213-.457.323-.683l-.004.023c-.02.282-.059.56.032.837c.278.228.663.59.918.837c-.138-.038-.4-.117-.53-.066l-.104-.026z"/></svg>`,
        autotimeout: 3000
      });
    });
  } catch (e) {}
};
