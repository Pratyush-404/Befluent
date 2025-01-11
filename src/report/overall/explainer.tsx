import { IonButton, IonContent, IonPopover } from '@ionic/react'

export const Explainer = ({
  content,
  ...props
}: {
  id: string
  content: string
}) => {
  const id = props.id + '-explainer'
  return (
    <>
      <IonButton id={id} size={'small'} fill={'clear'}>
        ?
      </IonButton>
      <IonPopover trigger={id} triggerAction={'click'}>
        <IonContent className={'ion-padding'}>{content}</IonContent>
      </IonPopover>
    </>
  )
}
