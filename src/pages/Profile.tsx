import { IonInput, IonItem, IonList } from '@ionic/react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { LoadingPage } from '../loading-page'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  if (user === undefined) return <LoadingPage />
  return (
    <>
      <h1 className={'ion-text-center'}>Profile</h1>
      <IonList>
        <IonItem>
          <IonInput
            label={'Name'}
            value={user.full_name || ''}
            onIonChange={(e) => {
              setUser({ ...user, full_name: String(e.target.value) })
            }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Native Language"
            value={user.native_language || undefined}
            onIonChange={(e) => {
              setUser({
                ...user,
                native_language: String(e.target.value),
              })
            }}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            label={'Goals'}
            placeholder={'Work, Study, Travel, Hobby'}
            value={user.goals}
            onIonChange={(e) => {
              setUser({
                ...user,
                goals: String(e.target.value),
              })
            }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label={'Interests'}
            placeholder={'Business, Technology, Science, Art, Sports, Music'}
            value={user.interests}
            onIonChange={(e) => {
              setUser({
                ...user,
                interests: String(e.target.value),
              })
            }}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label={'Challenge'}
            placeholder={'Time, Motivation, Remembering, Nervous'}
            value={user.challenge}
            onIonChange={(e) => {
              setUser({
                ...user,
                challenge: String(e.target.value),
              })
            }}
          />
        </IonItem>
        {/*<IonItem>*/}
        {/*  <IonSelect*/}
        {/*    label={'Level'}*/}
        {/*    placeholder={''}*/}
        {/*    value={user.level}*/}
        {/*    onIonChange={(e) => {*/}
        {/*      setUser({*/}
        {/*        ...user,*/}
        {/*        level: String(e.target.value) as UserData['level'],*/}
        {/*      })*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const).map((level) => (*/}
        {/*      <IonSelectOption key={level} value={level}>*/}
        {/*        {level}, {levelMapping[level]}*/}
        {/*      </IonSelectOption>*/}
        {/*    ))}*/}
        {/*  </IonSelect>*/}
        {/*</IonItem>*/}
      </IonList>
    </>
  )
}
// const nativeLanguages: UserData['native_language'][] = [
//   // null,
//   'Arabic',
//   'Hindi',
//   'Tamil',
//   'Telugu',
//   'Malayalam',
//   'English',
//   'Punjabi',
//   'Kannada',
//   'Urdu',
//   'German',
//   'French',
//   'Spanish',
//   'Filipino',
//   'Indonesian',
//   'Japanese',
//   'Russian',
//   'Chinese',
//   'Portuguese',
//   'Polish',
//   'Korean',
//   'Turkish',
//   'Thai',
//   'Armenian',
//   'Kurdish',
//   'Dari',
//   'Hebrew',
//   'Berber',
//   'Kazakh',
//   'Pashto',
//   'Uzbek',
//   'Yiddish',
//   'Persian (Farsi)',
// ]
// const levelMapping = {
//   a1: 'beginner',
//   a2: 'beginner',
//   b1: 'intermediate',
//   b2: 'intermediate',
//   c1: 'advanced',
//   c2: 'advanced',
// }
