import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer( function ActivityFilters() {

    const {activityStore: {predicate, setPredicate}}=useStore();

    return (
        <>
            <Menu vertical size="large" style={{width:"100%", marginTop:"25px"}} >
                <Header icon="filter" attached color="teal" content="Filters"/>
                <Menu.Item content="All activities" active={predicate.has("all")} onClick={()=>setPredicate("all", "true")}/>
                <Menu.Item content="Im going" active={predicate.has("isGoing")} onClick={()=>setPredicate("isGoing", "true")}/>
                <Menu.Item content="Im hosting" active={predicate.has("isHost")} onClick={()=>setPredicate("isHost", "true")}/>
            </Menu>
            <Header/>
            <Calendar onChange={(date)=>setPredicate("startDate", date as Date)} value={predicate.get("startDate") || new Date()}/>
        </>
    )
})