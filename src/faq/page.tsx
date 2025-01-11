import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  useIonAlert,
} from '@ionic/react'

const Page = () => {
  const [presentAlert] = useIonAlert()

  return (
    <IonPage>
      <IonContent>
        <h1>FAQs</h1>
        <IonList>
          {Object.entries(data).map(([question, answer]) => (
            <IonItem
              key={question}
              onClick={() => {
                presentAlert({
                  header: question,
                  message: answer,
                  buttons: ['OK'],
                })
              }}
            >
              {question}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
export default Page

const data = {
  'What is Befluent.ai ?':
    'Befluent.ai is a conversational English learning app on which you can practice Business English with our AI tutor without the need of a human teacher. Our AI tutor improves your business conversational skill, pronunciation, brevity and overall English fluency.',
  'How do i subscribe to Befluent.ai Pro?':
    "To subscribe to Befluent.ai Pro, go to the 'Subscription' section in the app, choose the Pro plan that suits your needs, and follow the instructions to complete the payment.",
  'How Befluent.ai works?':
    'Befluent.ai uses advanced AI algorithms to adapt to your learning style and pace. It provides personalized lessons, tracks your progress, and offers exercises and quizzes to reinforce learning.',
  'How do I edit my personal details in app?':
    "To edit your personal details, navigate to the 'Profile' section in the app, and make the necessary changes.",
  'Can I learn English in 30 days?':
    'Learning English in 30 days depends on your current level, dedication, and the time you invest daily. Befluent.ai can provide a structured learning path to help you make significant progress.',
  'I found a problem in the app!':
    "If you encounter a problem in the app, please use the 'Support' section to report the issue. Provide as much detail as possible to help us resolve it quickly.",
  'How do access from another device?':
    'To access your account from another device, simply download the Befluent.ai app on the new device and log in with your existing account credentials.',
}
