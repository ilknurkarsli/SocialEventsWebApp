import { Profile } from "./profile"

export interface Activity {
    id: string
    title: string
    date: Date| null
    description: string
    category: string
    city: string
    venue: string
    hostUsername: string
    isGoin: boolean
    isHost: boolean
    isCancelled?: boolean;
    host?: Profile
    attendees: Profile[]
  }

  export class Activity implements Activity{
    constructor(init?: ActivityFormValues) {
     Object.assign(this,init);
      
    }
  }


  export class ActivityFormValues{
    id?: string =undefined;
    title: string= "";
    category: string= "";
    description: string= "";
    date: Date | null =null;
    city: string= "";
    venue: string= "";

    constructor(activity?: ActivityFormValues) {
        if(activity){
          this.id=activity.id;
          this.title=activity.title;
          this.category=activity.category;
          this.description=activity.description;
          this.date=activity.date;
          this.city=activity.city;
          this.venue=activity.venue;
        }
    }
  }