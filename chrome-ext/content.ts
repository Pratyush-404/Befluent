import { chatJson, transcribe } from '../src/supa-functions'
import { supa } from '../supabase'
import { advancedExercises as mobileExercises } from '../src/exercises/advancedExercises'

async function record() {
  notifyRecordingStatusChange(true)
  const audioChunks: Blob[] = []
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data)
  }
  mediaRecorder.onstop = async () => {
    const blob = new Blob(audioChunks, { type: 'audio/webm' })

    const { data: transcriptionResult } = await transcribe(blob)
    if (!transcriptionResult) {
      alert('Transcription failed')
      return
    }
    if (!isDev && transcriptionResult.text.split(' ').length < 50)
      return console.log('Raw transcript too short')

    let totalClarityScore = 0
    transcriptionResult.segments.forEach((segment) => {
      totalClarityScore += calculateClarityScore(
        segment.avg_logprob,
        segment.no_speech_prob
      )
    })

    const rawTranscript = transcriptionResult.text
    const clarityScore = Math.round(
      totalClarityScore / transcriptionResult.segments.length
    )

    const transcriptJson = await chatJson(
      `User transcript: ${rawTranscript}.\n\nRemove the active listening portions of the transcript. Also remove any non English words. Return JSON like { transcript: string }`
    )
    const transcript = transcriptJson.transcript

    if (!isDev && transcript.split(' ').length < 50)
      return console.log('Transcript too short')

    const [reportDataJson, chatExercises, advancedExercises]: [
      ReportDataJson,
      { exercises: ChatExercises },
      { exercises: string[] }
    ] = await Promise.all([
      chatJson(`
        User transcript: ${transcript}.
        User spoken clarity score: ${clarityScore}.
        In your feedback, provide examples from the transcript.
        Return JSON like {
          CEFRLevel: string,
          levelExplanation: string,
          fluencyScore: 0-100,
          fluencyFeedback: string,
          fluencyImprovementNotes: string,
          vocabularyScore: 0-100,
          vocabularyFeedback: string,
          vocabularyImprovementNotes: string,
          grammarScore: 0-100,
          grammarFeedback: string,
          grammarImprovementNotes: string,
          lowFillerWordScore: 0-100,
          fillerWordFeedback: string,
          fillerWordImprovementNotes: string,
          feedback: string,
          improvementNotes: string
        }.
      `),
      chatJson(
        `Given that the English learner has spoken: ${transcript}, select two English learning exercises in JSON format like {exercises:{name: string, description: string}[]}`
      ),
      chatJson(
        `Given that the English learner has spoken: ${transcript}, from this set:${advancedExercisesLibrary}, select 3 items in JSON format like {exercises:string[]}`
      ),
    ])
    const feedback = [
      reportDataJson.fluencyFeedback,
      reportDataJson.vocabularyFeedback,
      reportDataJson.grammarFeedback,
      reportDataJson.fillerWordFeedback,
      reportDataJson.feedback,
    ].join(' ')
    const improvementNotes = [
      reportDataJson.fluencyImprovementNotes,
      reportDataJson.vocabularyImprovementNotes,
      reportDataJson.grammarImprovementNotes,
      reportDataJson.fillerWordImprovementNotes,
      reportDataJson.improvementNotes,
    ].join(' ')
    const password = generateRandomString(6)
    const insertion = await supa
      .from('reports')
      .insert({
        clarity_score: clarityScore,
        cefr_level: reportDataJson.CEFRLevel,
        level_explanation: reportDataJson.levelExplanation,
        fluency_score: reportDataJson.fluencyScore,
        vocabulary_score: reportDataJson.vocabularyScore,
        grammar_score: reportDataJson.grammarScore,
        low_filler_word_score: reportDataJson.lowFillerWordScore,
        feedback,
        improvement_notes: improvementNotes,
        password,
        chatExercises: chatExercises.exercises,
        advancedExercises: advancedExercises.exercises,
      })
      .select('id')
      .single()
    if (!insertion.data) return

    window.open(`${appLink}/reportV2/${insertion.data.id}/${password}`)
  }

  const stopRecording = () => {
    if (mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }
    notifyRecordingStatusChange(false)
  }

  window.addEventListener('beforeunload', stopRecording)
  mediaRecorder.start()
  setTimeout(() => {
    stopRecording()
    window.removeEventListener('beforeunload', stopRecording)
  }, duration)
}

record()
const duration = 15 * 60 * 1000
const isDev = false
const useLocal = false
const appLink = useLocal ? 'http://localhost:5173' : 'https://app.befluent.ai'

function calculateClarityScore(avgLogprob: number, noSpeechProb: number) {
  return Math.min(
    Math.max(
      Math.round((Math.exp(avgLogprob) * 1.6 - noSpeechProb * 1.6) * 100),
      0
    ),
    100
  )
}
function notifyRecordingStatusChange(isRecording: boolean) {
  chrome.runtime.sendMessage({ type: 'RECORDING_STATUS_CHANGED', isRecording })
}
type ReportDataJson = {
  CEFRLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  levelExplanation: string
  fluencyScore: number
  fluencyFeedback: string
  fluencyImprovementNotes: string
  vocabularyScore: number
  vocabularyFeedback: string
  vocabularyImprovementNotes: string
  grammarScore: number
  grammarFeedback: string
  grammarImprovementNotes: string
  lowFillerWordScore: number
  fillerWordFeedback: string
  fillerWordImprovementNotes: string
  feedback: string
  improvementNotes: string
}
export type ReportData = {
  rawTranscript: string
  transcript: string
  clarityScore: number
  CEFRLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  levelExplanation: string
  fluencyScore: number
  vocabularyScore: number
  grammarScore: number
  lowFillerWordScore: number
  feedback: string
  improvementNotes: string
}
function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
export type ChatExercises = { name: string; description: string }[]
const advancedExercisesLibrary = mobileExercises.slice(1)
