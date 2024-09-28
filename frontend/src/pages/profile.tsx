import UserProfile from '@/components/UserProfile';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProfilePage() {
    return (
        <div>
            <Navbar/>
            <main>
                <UserProfile />
            </main>
            <Footer/>
        </div>
    );
}
