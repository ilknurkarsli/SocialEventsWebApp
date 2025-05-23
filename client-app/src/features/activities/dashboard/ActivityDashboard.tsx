import { useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';


export default observer( function ActivityDashboard(){

    const {activityStore}=useStore();
    const {loadingActivities, activityRegistry, setPagingParams, pagination}=activityStore;
    const [loadingNex, setLoadingNext]=useState(false);

    function handleGetNext(){
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage+1));
        loadingActivities().then(()=>setLoadingNext(false));
    }

    useEffect(()=>{

    })

    useEffect(()=>{
    if(activityRegistry.size <= 1) loadingActivities();
    },[loadingActivities, activityRegistry.size]) 
    // sondaki boş koseli parantez (dependencies) içi bos oldugunda useeffect hookundaki kodun her sayfa yuklendiğinde calıscagı anlamına gelir. eğer içinde bir dependency varsa o parametre her değiştiğinde tekrar çalışır.


    return (
        <Grid>
            <Grid.Column width="10">
                {activityStore.loadingInitial && activityRegistry.size===0 && !loadingNex ? (
                    <>
                        <ActivityListItemPlaceholder/>
                        <ActivityListItemPlaceholder/>
                    </>
                ): (
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext} 
                        hasMore={!loadingNex && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
                        <ActivityList/>
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNex}/>
            </Grid.Column>
        </Grid>
        )
    }
)