import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

function App() {

const [phoneList, setPhoneList] = useState([]);
const [audioFile, setAudioFile] = useState(null);
const [sessionId, setSessionId] = useState(null);
const [qrCode, setQrCode] = useState(null);
const guid = "2042755e-1222-470f-a47f-e1766c254196";

  // useEffect(() => {
  //   axios.get(`http:ocalhost:3000/session/start/${guid}`, {
  //     headers: {
  //       'accept': 'application/json',
  //       'x-api-key': 'W5WSpZnezS7dstrr6yynJ5LnW'
  //     }
  //   })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       setSessionId(guid);      
  //     }
  //   })
  //     .catch((error) => {
  //       console.error(error);
  //     });;
  //   }, [guid]);

  useEffect(() => {
    console.log("renderizou")
     axios.get(`http://localhost:3000/session/qr/${guid}`, {
          headers: {
            'accept': 'application/json',
            'x-api-key': 'W5WSpZnezS7dstrr6yynJ5LnW'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.qr);
            setQrCode(response.data.qr);
          } 
        })
        .catch((error) => {
          console.error(error);
        });  

   openPopup();
        
  }, [sessionId]);

  const openPopup = () => {
    if (qrCode) {
      window.open(qrCode, 'QR Code', 'width=200,height=200');
    }
  };

const handlePhoneChange = (e) => {
  setPhoneList(e.target.value.split(','));
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64Data = reader.result.split(',')[1];
    setAudioFile(base64Data);
  };
  reader.readAsDataURL(file);
};

const handleSubmit = () => {

  phoneList.forEach(phone => {
    const payload = {
      chatId: `${phone}@c.us`,
      contentType: "MessageMedia",
      content: {
        mimetype: 'audio/ogg',
        data: audioFile,
        filename: 'audio.ogg',
      },
    };

    axios.post(
      `http://localhost:3000/client/sendMessage/${guid}`, 
      payload, {
        headers: {
          'accept': '*/*',
          'x-api-key': 'W5WSpZnezS7dstrr6yynJ5LnW',
          'Content-Type': 'application/json'
        }
      })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  });
};

return (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: 'white', color: 'black' }}>
    {qrCode && <div style={{marginBottom: '20px'}}><QRCode value={qrCode} /></div>}
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid black', padding: '20px', boxShadow: '5px 5px 10px rgba(0,0,0,0.15)' }}>
      <label htmlFor="phoneList">Lista de Telefones:</label>
      <input type="text" id="phoneList" onChange={handlePhoneChange} />

      <label htmlFor="audioFile">Arquivo de Áudio:</label>
      <input type="file" id="audioFile" accept="audio/ogg" onChange={handleFileChange} />

      <button type="button" onClick={handleSubmit}>Enviar</button>
    </form>
  </div>
);
}

export default App
