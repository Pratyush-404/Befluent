import { useEffect, useState } from 'react'
import { supa } from '../../supabase'
import { IonContent, IonItem, IonLabel, IonPage } from '@ionic/react'
import { useAuthUser } from '../AuthUserProvider'

export default function Page() {
  const [reports, setReports] = useState<
    { id: number; date: string; password: string }[]
  >([])
  const authUser = useAuthUser()
  useEffect(() => {
    supa
      .from('reports')
      .select('id, date, password')
      .eq('user_id', authUser.id)
      .then(({ data }) => {
        if (data) setReports(data)
      })
  }, [])
  return (
    <IonPage>
      <IonContent>
        <h1>Reports</h1>
        {reports.map((r) => (
          <IonItem href={`/reportV2/${r.id}/${r.password}`}>
            <IonLabel>{r.date}</IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  )
}
