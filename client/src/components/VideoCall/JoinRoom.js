import React, { useState } from "react";

const JoinRoom = () => {
    const [roomId, setRoomId] = useState(null);
    const onSubmit = () => {
        // navigate(`/video/${roomId}`)
        window.location.assign(`/videoCall/${roomId}`);
    };

    return (
        <div>
            <input type="text" onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default JoinRoom