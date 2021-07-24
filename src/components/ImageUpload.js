import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { storage, db } from '../firebase';
import '../css/ImageUpload.css'

function ImageUpload({username}) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    //Uploading images for storage on firebase from a local folder.
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            //progress function
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransfered / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error.message)
            },
            () => {
                //complete functionuser
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image in the database.
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                })
            }
        )
    }

    return (
        <div className="imageupload">
            <progress
                className="imageupload__progress"
                value={progress}
                max="100"/>
            <input type="text"
                placeholder="Enter a caption .."
                onChange={event => setCaption(event.target.value)}
                value={ caption }
            />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >Upload</Button>
        </div>
    )
}

export default ImageUpload;
