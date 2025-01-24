async function fetchLiftStatuses() {
  try {
    const response = await fetch('/api/lift-status');
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const liftStatuses = await response.json();

    // Обновляем статусы на странице
    Object.keys(liftStatuses).forEach(lift => {
      const { status, lastUpdated } = liftStatuses[lift];
      const statusElement = document.getElementById(`status-lift-${lift}`);
      if (statusElement) {
        // Сохраняем текст статуса и дату обновления
        statusElement.dataset.lastUpdated = lastUpdated;
        statusElement.dataset.statusText = status;
      }
    });

    startTimeUpdater();

  } catch (error) {
    console.error('Ошибка при получении статусов лифтов:', error);
  }
}

function startTimeUpdater() {
  //console.log('Запускаем обновление времени');
  setInterval(() => {
    document.querySelectorAll('.lift-status').forEach(element => {
      const lastUpdated = element.dataset.lastUpdated;
      const statusText = element.dataset.statusText;

      if (lastUpdated) {
        const timeDifference = calculateTimeDifference(lastUpdated);
        element.textContent = `${statusText} (уже ${timeDifference.toFixed(9)} дней)`;
      }
    });
  }, 1); // Обновляем каждую миллисекунду
}

// Функция для расчёта разницы во времени (в днях)
function calculateTimeDifference(lastUpdated) {
  const now = new Date();
  const updatedAt = new Date(lastUpdated);
  const differenceInMilliseconds = now - updatedAt; // Разница в миллисекундах
  return differenceInMilliseconds / (1000 * 60 * 60 * 24); // Перевод в дни
}

// Установить текущий год в шапку
const currentYear = new Date().getFullYear();
document.getElementById('header-text').textContent = `${currentYear} ЭТО ОЧЕРЕДНОЙ ГОД ЛИФТ ПОБЕДЫ В 11 ОБЩАГЕ`;

// Вставить статусы в лифты
document.addEventListener('DOMContentLoaded', fetchLiftStatuses);