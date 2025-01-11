// import { IonContent, IonPage } from '@ionic/react'
// import { Database } from '../../types_db'
// import { useState } from 'react'
// import { supa } from '../../supabase'
//
// export const AdminExercisesBasic = () => {
//   const [level, setLevel] = useState<InsertExercise['level']>()
//   const [type, setType] = useState<InsertExercise['type']>()
//   const [content, setContent] = useState('')
//   const [question, setQuestion] = useState('')
//   const [options, setOptions] = useState('')
//   const [answer, setAnswer] = useState('')
//   const [explanation, setExplanation] = useState('')
//   const [status, setStatus] = useState('')
//   return (
//     <IonPage>
//       <IonContent>
//         <h1>Admin Exercises</h1>
//         <p>{status}</p>
//         <select onChange={(e) => setLevel(e.target.value as typeof level)}>
//           <option value={undefined} />
//           {levels.map((l) => (
//             <option key={l} value={l}>
//               {l}
//             </option>
//           ))}
//         </select>
//         <select onChange={(e) => setType(e.target.value as typeof type)}>
//           <option value={undefined} />
//           {types.map((t) => (
//             <option key={t} value={t}>
//               {t}
//             </option>
//           ))}
//         </select>
//         <input
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="content"
//         />
//         <input
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="question"
//         />
//         <label>
//           options (comma separated)
//           <input
//             value={options}
//             onChange={(e) => setOptions(e.target.value)}
//             placeholder="options"
//           />
//         </label>
//         <input
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           placeholder="answer"
//         />
//         <input
//           value={explanation}
//           onChange={(e) => setExplanation(e.target.value)}
//           placeholder="explanation"
//         />
//         <button
//           onClick={() => {
//             if (
//               !level ||
//               !type ||
//               !content ||
//               !question ||
//               !options ||
//               !answer ||
//               !explanation
//             )
//               return alert('fill all fields')
//             supa
//               .from('exercises')
//               .insert({
//                 level,
//                 type,
//                 content,
//                 question,
//                 options: options.split(',').map((o) => o.trim()),
//                 answer,
//                 explanation,
//               })
//               .then((r) => {
//                 if (r.error) setStatus(r.error.message)
//                 else setStatus('success')
//                 setTimeout(() => setStatus(''), 5000)
//               })
//           }}
//         >
//           save
//         </button>
//       </IonContent>
//     </IonPage>
//   )
// }
// type InsertExercise = Database['public']['Tables']['exercises_basic']['Insert']
// const levels: Database['public']['Enums']['level'][] = [
//   'a1',
//   'a2',
//   'b1',
//   'b2',
//   'c1',
//   'c2',
// ]
// const types: Database['public']['Enums']['exercise_type'][] = [
//   'Enhancing Reading Skill of Ability',
//   'Enhancing Reading Skill of Association',
// ]
