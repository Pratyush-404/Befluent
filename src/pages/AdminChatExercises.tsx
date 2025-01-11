import { IonButton, IonContent, IonPage, IonToast } from '@ionic/react'
import { useEffect, useState } from 'react'
import { supa } from '../../supabase'
import { ExerciseTemplate } from '../supa-types'

export const AdminChatExercises = () => {
  const [templates, setTemplates] = useState<ExerciseTemplate[]>([])
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await supa.from('exercise_templates').select('*')
      if (data) setTemplates(data)
    }
    fetchTemplates()
  }, [])
  const [newItem, setNewItem] = useState<{
    name: string
    description: string
  }>({
    name: '',
    description: '',
  })
  const [toastMessage, setToastMessage] = useState('')
  const handleInputChange =
    (index: number, field: keyof Omit<ExerciseTemplate, 'id'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTemplates((prev) => {
        const next = [...prev]
        next[index][field] = e.target.value
        return next
      })
    }
  return (
    <IonPage>
      <h1>Admin Chat Exercises</h1>
      <IonContent>
        <div style={{ maxHeight: '70vh', overflow: 'scroll' }}>
          {templates.map((t, i) => (
            <div key={t.id}>
              <label>
                name
                <input value={t.name} onChange={handleInputChange(i, 'name')} />
              </label>
              <label>
                description
                <textarea
                  value={t.description}
                  onChange={handleInputChange(i, 'description')}
                  style={{
                    width: 400,
                    height: 100,
                  }}
                />
              </label>
              <IonButton
                onClick={async () => {
                  await supa
                    .from('exercise_templates')
                    .update(templates[i])
                    .match({ id: t.id })
                  setToastMessage('Saved')
                }}
              >
                Save
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => {
                  const confirm = window.confirm('Are you sure?')
                  if (!confirm) return
                  supa
                    .from('exercise_templates')
                    .delete()
                    .eq('id', templates[i].id)
                    .then((r) =>
                      setTemplates((prev) => {
                        if (r.error) {
                          setToastMessage('Failed to create')
                          return prev
                        }
                        const next = [...prev]
                        next.splice(i, 1)
                        return next
                      })
                    )
                }}
              >
                Delete
              </IonButton>
            </div>
          ))}
        </div>
        <br />
        <div>
          <h2>New Exercise</h2>
          <label>
            name
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </label>
          <label>
            description
            <textarea
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              style={{
                width: 400,
                height: 100,
              }}
            />
          </label>
          <IonButton
            onClick={() =>
              supa
                .from('exercise_templates')
                .insert(newItem)
                .select()
                .single()
                .then((r) => {
                  setTemplates((prev) => {
                    const data = r.data
                    if (!data) {
                      setToastMessage('Failed to create')
                      return prev
                    }
                    return [...prev, data]
                  })
                  setNewItem({ name: '', description: '' })
                })
            }
          >
            Add Exercise
          </IonButton>
        </div>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          onDidDismiss={() => setToastMessage('')}
          duration={5000}
        />
      </IonContent>
    </IonPage>
  )
}
