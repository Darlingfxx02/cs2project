// Fallback скрипт, который выполняется, если основные JS файлы не загрузились
(function() {
  // Создаем базовый интерфейс для отображения состояния
  function createFallbackUI() {
    // Проверяем, пустой ли root элемент
    const rootElement = document.getElementById('root');
    if (!rootElement || rootElement.children.length > 0) return;
    
    // Создаем контейнер
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.maxWidth = '90%';
    container.style.margin = '0 auto';
    container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Заголовок
    const heading = document.createElement('h2');
    heading.textContent = 'Загрузка приложения...';
    heading.style.marginBottom = '20px';
    heading.style.color = '#333';
    
    // Создаем индикатор загрузки
    const loader = document.createElement('div');
    loader.style.width = '40px';
    loader.style.height = '40px';
    loader.style.border = '4px solid #f3f3f3';
    loader.style.borderTop = '4px solid #3498db';
    loader.style.borderRadius = '50%';
    loader.style.animation = 'spin 1s linear infinite';
    loader.style.margin = '0 auto 20px auto';
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
    
    // Сообщение с инструкциями
    const message = document.createElement('p');
    message.innerHTML = 'Если приложение не загружается длительное время, попробуйте:<br>' +
                       '1. Обновить страницу<br>' +
                       '2. Очистить кеш браузера<br>' +
                       '3. Открыть ссылку напрямую в браузере';
    message.style.lineHeight = '1.5';
    message.style.color = '#666';
    
    // Сборка UI
    container.appendChild(heading);
    container.appendChild(loader);
    container.appendChild(message);
    rootElement.appendChild(container);
    
    // Добавляем отладочную информацию, если включен режим отладки
    if (window.location.search.includes('debug=true')) {
      const debugInfo = document.createElement('div');
      debugInfo.style.marginTop = '20px';
      debugInfo.style.padding = '10px';
      debugInfo.style.background = '#f5f5f5';
      debugInfo.style.borderRadius = '4px';
      
      const debugHeading = document.createElement('h3');
      debugHeading.textContent = 'Technical Info';
      
      const debugData = document.createElement('pre');
      debugData.style.whiteSpace = 'pre-wrap';
      debugData.style.wordBreak = 'break-all';
      debugData.style.fontSize = '12px';
      
      // Собираем техническую информацию
      const technicalInfo = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        telegramWebAppDetected: !!(window.Telegram && window.Telegram.WebApp),
        timestamp: new Date().toISOString()
      };
      
      debugData.textContent = JSON.stringify(technicalInfo, null, 2);
      
      debugInfo.appendChild(debugHeading);
      debugInfo.appendChild(debugData);
      container.appendChild(debugInfo);
    }
  }
  
  // Проверяем загрузку основного скрипта через 3 секунды
  setTimeout(function() {
    // Если React не загрузился (root пустой), показываем заглушку
    createFallbackUI();
  }, 3000);
})(); 