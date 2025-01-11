import { IonPage, IonSpinner } from '@ionic/react'
import { useEffect, useState } from 'react'
import { Level } from '../supa-types'
import { Right } from './right/right'
import { Overall } from './overall/overall'
import { Skills } from './skills/skills'
import { useParams } from 'react-router'
import { supa } from '../../supabase'
import { Database } from '../../types_db'
import { Level0 } from './level0'
import { ChatExercises } from '../../chrome-ext/content'
import {
  AdvancedExerciseName,
  advancedExercises as mobileExercises,
} from '../exercises/advancedExercises'
import { chatJson } from '../supa-functions'

export default function Page() {
  const params = useParams<{ id: string; password?: string }>()
  const [data, setData] =
    useState<Database['public']['Tables']['reports']['Row']>()
  useEffect(() => {
    const query = supa.from('reports').select().eq('id', params.id)

    if (params.password) query.eq('password', params.password)
    else query.is('password', null)

    query.single().then((r) => {
      if (!r.data) return
      setData(r.data)
      if (r.data.chatExercises)
        setChatExercises(r.data.chatExercises as ChatExercises)
      if (r.data.advancedExercises)
        setAdvancedExercises(r.data.advancedExercises as AdvancedExerciseName[])
      supa.auth.getUser().then(({ data: { user } }) => {
        if (!user) return
        supa
          .from('reports')
          .update({ user_id: user.id })
          .eq('id', params.id)
          .then()
      })
    })
  }, [])

  // const [showRawTranscript, setShowRawTranscript] = useState(false)
  // const [showTranscript, setShowTranscript] = useState(false)

  //oct 22 version support
  const transcript = data?.transcript
  const [chatExercises, setChatExercises] = useState<ChatExercises>()
  const [advancedExercises, setAdvancedExercises] =
    useState<AdvancedExerciseName[]>()
  useEffect(() => {
    if (!transcript) return
    chatJson(
      `Given that the English learner has spoken: ${transcript}, select two English learning exercises in JSON format like {exercises:{name: string, description: string}[]}`
    ).then((r) => setChatExercises(r.exercises))
    chatJson(
      `Given that the English learner has spoken: ${transcript}, from this set:${advancedExercisesLibrary}, select 3 items in JSON format like {exercises:string[]}`
    ).then((r) => {
      setAdvancedExercises(r.exercises)
    })
  }, [transcript])

  if (!data) return <IonSpinner />
  return (
    <IonPage
      style={{
        flexDirection: 'row',
        fontFamily: '"Red Hat Display", sans-serif',
      }}
    >
      <Level0>
        <Overall
          userLevel={data.cefr_level.toLowerCase() as Level}
          userLevelExplanation={data.level_explanation}
        />

        <Skills
          clarityScore={data.clarity_score || -1}
          fluencyScore={data.fluency_score}
          vocabularyScore={data.vocabulary_score}
          grammarScore={data.grammar_score}
          fillerWordScore={data.low_filler_word_score}
        />

        <div
          style={{
            background: 'white',
            borderRadius: 24,
            marginBottom: 30,
          }}
          className={'ion-padding'}
        >
          <h3>Feedback</h3>
          <p>{data.feedback}</p>
          <h3>Improvement Notes</h3>
          <p>{data.improvement_notes}</p>
        </div>
        {/*<IonButton onClick={() => setShowRawTranscript((b) => !b)}>*/}
        {/*  Raw Transcript*/}
        {/*</IonButton>*/}
        {/*{showRawTranscript && <div>{data.raw_transcript}</div>}*/}
        {/*<IonButton onClick={() => setShowTranscript((b) => !b)}>*/}
        {/*  Transcript*/}
        {/*</IonButton>*/}
        {/*{showTranscript && <div>{transcript}</div>}*/}
      </Level0>
      <Right
        chatExercises={chatExercises || []}
        advancedExercises={advancedExercises || []}
      />
    </IonPage>
  )
}
const advancedExercisesLibrary = mobileExercises.slice(1)
