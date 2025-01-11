import { Listen } from './Listen'
import { Translate } from './Translate'
import { IonButton, IonGrid, IonRow } from '@ionic/react'

export function AssistantMessage({
  content,
  setUserInputTypeListen,
  showHint,
}: {
  content: string
  setUserInputTypeListen?: () => void
  showHint?: () => void
}) {
  const parsed = JSON.parse(content) as {
    feedback: string
    message: string
    question: string
  }
  const fullMessage = parsed.feedback + parsed.message + parsed.question
  return (
    <div
      style={{
        whiteSpace: 'break-spaces',
        marginRight: '25%',
        backgroundColor: 'white',
        borderRadius: '30px',
        borderStartStartRadius: '0',
        position: 'relative',
      }}
      className={'ion-margin ion-padding-horizontal ion-padding-top'}
    >
      {parsed.feedback && (
        <>
          Feedback: {parsed.feedback}
          <br />
        </>
      )}
      {parsed.message}
      <br />
      {parsed.question}
      <IonGrid>
        <IonRow className={'ion-justify-content-end'}>
          <Translate fullMessage={fullMessage} />
          <Listen
            content={fullMessage}
            setUserInputType={setUserInputTypeListen}
          />
        </IonRow>
      </IonGrid>
      {showHint ? (
        <IonButton
          onClick={showHint}
          color="warning"
          size={'small'}
          style={{ position: 'absolute', right: 0 }}
        >
          HINT
        </IonButton>
      ) : null}
    </div>
  )
}
