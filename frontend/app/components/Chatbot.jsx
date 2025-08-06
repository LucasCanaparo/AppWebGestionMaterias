import { useState } from 'react'

export default function Chatbot() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setVisible(!visible)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        💬
      </button>

      {/* iFrame del chatbot */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '360px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            zIndex: 999,
          }}
        >
          <iframe
            allow="microphone;"
            width="100%"
            height="100%"
            src="https://console.dialogflow.com/api-client/demo/embedded/bdd5d50f-aadc-4872-bca2-907aa08ff957"
            title="Chatbot"
            style={{ border: 'none' }}
          />
        </div>
      )}
    </>
  )
}
