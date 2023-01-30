import { ChatEngine } from 'react-chat-engine';
import "./App.css";
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';


const App = () => {
        if (!localStorage.getItem('username')) return <LoginForm / >
            return ( < ChatEngine height = "100vh"
                projectID = "9b2a2208-9420-4e79-b2f1-4eee9d7f253d"
                userName = { localStorage.getItem('username') }
                userSecret = { localStorage.getItem('password') }
                renderChatFeed = {
                    (ChatAppProps) => < ChatFeed {...ChatAppProps }
                    />} / > );
            };

        export default App;