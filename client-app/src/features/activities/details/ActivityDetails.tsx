import { useEffect } from "react";
import {  Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivtityDetailInfo";
import ActivityDetailSidebar from "./ActivityDetailSidebar";


export default observer (function ActivityDeatils() {
  const {activityStore}=useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity}=activityStore;
  const {id}=useParams();

  useEffect(()=>{
    if(id) loadActivity(id);
    return()=>clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if(loadingInitial || !activity) return <LoadingComponent/>;
  return (
   <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity}/>
        <ActivityDetailChat activityId={activity.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar activity={activity}/>
      </Grid.Column>
   </Grid>
  );
})
