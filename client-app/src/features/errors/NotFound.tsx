import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function Notfound(){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search"/>
                    Oops - we've looked everywhere but couldn't find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">
                Return to activities Page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}