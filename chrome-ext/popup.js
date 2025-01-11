const useLocal = false

const appLink = useLocal ? 'http://localhost:5173' : 'https://app.befluent.ai'
document.getElementById('reportsLink').href = appLink + '/reports'
document.getElementById('appLink').href = appLink
