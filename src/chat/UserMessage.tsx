export function UserMessage(props: { content: string }) {
  return (
    <div
      style={{
        whiteSpace: 'break-spaces',
        marginLeft: 'auto',
        width: 'fit-content',
        maxWidth: '75%',
        backgroundColor: 'var(--ion-color-primary)',
        color: 'white',
        borderRadius: '30px',
        borderStartEndRadius: '0',
        display: 'flex',
      }}
      className={
        'ion-margin ion-padding ion-justify-content-between ion-align-items-center'
      }
    >
      {props.content}
    </div>
  )
}
