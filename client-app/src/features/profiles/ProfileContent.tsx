import { Tab, TabPane } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";
import ProfileAbout from "./ProfileAbout";

interface Props {
    profile: Profile;
}
export default observer( function ProfileContent({profile}:Props){

    const {profileStore}=useStore();

    const panes=[
        { menuItem: 'About', render: () => <TabPane> <ProfileAbout/> </TabPane> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        { menuItem: 'Events', render: () => <TabPane> <ProfileActivities/> </TabPane>},
        { menuItem: 'Followers', render: () =><TabPane> <ProfileFollowings/> </TabPane>},
        { menuItem: 'Following', render: () => <TabPane> <ProfileFollowings/> </TabPane>},
        ];

        return (
            <Tab
                menu={{ fluid: true, vertical: true }}
                menuPosition='right'
                panes={panes}
                onTabChange={(_, data)=>profileStore.setActiveTab(data.activeIndex as number)}
            />
        )
    
})