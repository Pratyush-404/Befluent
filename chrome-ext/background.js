chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-128.png',
    title: 'Extension Installed',
    message:
      'It will automatically start on Meet and Zoom links. After 15 minutes (and at least 100 spoken words), you will receive your report.',
  })
})
function updateIcon(isRecording) {
  const iconPath = isRecording
    ? 'icons/icon-128-recording.png'
    : 'icons/icon-128.png'
  chrome.action.setIcon({ path: iconPath })
}
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'RECORDING_STATUS_CHANGED') {
    updateIcon(message.isRecording)
  }
})
