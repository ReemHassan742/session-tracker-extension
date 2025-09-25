const SESSION_EMAIL_SUBJECT = "New Session Submission"; // Update to match your actual subject
const RATE_PER_SESSION = 50; // Customize your rate

function doGet(e) {
  const period = getCustomBillingPeriod(); // {startDate, endDate}
  const searchQuery = `subject:"${SESSION_EMAIL_SUBJECT}" after:${formatDateForQuery(period.startDate)} before:${formatDateForQuery(period.endDate, true)}`;
  
  const emailThreads = GmailApp.search(searchQuery);
  let sessionCount = 0;

  emailThreads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const date = message.getDate();
      if (date >= period.startDate && date < period.endDate) {
        sessionCount++;
      }
    });
  });

  const salary = sessionCount * RATE_PER_SESSION;

  const result = {
    period: {
      start: period.startDate.toDateString(),
      end: period.endDate.toDateString()
    },
    sessionCount: sessionCount,
    ratePerSession: RATE_PER_SESSION,
    estimatedSalary: salary
  };

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getCustomBillingPeriod() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let startDate, endDate;

  if (now.getDate() >= 25) {
    startDate = new Date(currentYear, currentMonth, 25);
    endDate = new Date(currentYear, currentMonth + 1, 25);
  } else {
    startDate = new Date(currentYear, currentMonth - 1, 25);
    endDate = new Date(currentYear, currentMonth, 25);
  }

  return { startDate, endDate };
}

function formatDateForQuery(date, isBefore = false) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Gmail expects 1-indexed month
  const day = date.getDate();
  if (isBefore) {
    const adjusted = new Date(date);
    adjusted.setDate(adjusted.getDate() + 1);
    return `${adjusted.getFullYear()}/${adjusted.getMonth() + 1}/${adjusted.getDate()}`;
  }
  return `${year}/${month}/${day}`;
}
