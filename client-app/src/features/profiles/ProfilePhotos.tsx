import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, Image, Grid, Button, TabPane } from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface Props{
    profile:Profile
}

export default observer( function ProfilePhotos({profile}:Props){
    const {profileStore: {isCurrentUser, uploadPhoto, uploading , loading, setMainPhoto, deletePhoto}}=useStore();
    const [addPhotoMode, setAddPhotoMode]=useState(false);
    const [target, setTarget]=useState("");

    function handleSetMainPhoto (photo:Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        setMainPhoto(photo);
    }

    function handlePhotoUpload(file: Blob){
        uploadPhoto(file).then(()=>setAddPhotoMode(false));
    }

    function handleDletePhoto (photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }
    return(
        <TabPane>
            <Grid>
                <Grid.Column width={16}>
                <Header floated="left" icon="image" content="photos"/>
                {isCurrentUser&& (
                    <Button floated="right" basic content={addPhotoMode ? "Cancel" : "Add photo"} onClick={()=>setAddPhotoMode(!addPhotoMode)}/>
                )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ):(
                    <Card.Group itemsPerRow={5}>
                        {profile.photos?.map(photo=>(
                        <Card key={photo.id}>
                            <Image src={photo.url}/>
                            {isCurrentUser &&(
                                <Button.Group fluid widths={2}>
                                    <Button basic color="green" content="Main" name={"main"+photo.id} disabled={photo.isMain} loading={target ==="main"+photo.id && loading} onClick={e=>handleSetMainPhoto(photo,e)}/>
                                    <Button basic color="red" icon="trash" loading={target ===photo.id && loading} onClick={e=>handleDletePhoto(photo,e)} disabled={photo.isMain} name={photo.id}/>
                                </Button.Group>
                            )}
                        </Card>
                        ))}
                    </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </TabPane>
    )
})