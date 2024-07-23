import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";


function Videocall() {
  const [peerId, setPeerId] = useState(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id)=> {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      let getUserMedia = navigator.mediaDevices.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true }).then(stream => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);
        call.on("stream",  (remoteStream)=> {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      }).catch(err => {
        console.error("Failed to get local stream", err);
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    let getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }).then(stream => {
      localVideoRef.current.srcObject = stream;
      let call = peerInstance.current.call(remotePeerId, stream);
      call.on("stream", (remoteStream)=> {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    }).catch(err => {
      console.log("Failed to get local stream", err);
    });
  };

  return (
    <>
      <h1>TellMe</h1>
      <h4>{peerId}</h4>
      <input type='text' value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={localVideoRef} autoPlay playsInline />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </>
  );
}

export default Videocall;
