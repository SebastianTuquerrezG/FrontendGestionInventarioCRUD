import Navbar from '../components/Navbar';
import ProductCarousel from '../components/Carousel';
import Footer from '../components/Footer';
import useAuth from './hooks/useAuth';

export default function HomePage() {
  useAuth();
  
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <ProductCarousel />
      </div>
      <Footer />
    </div>
  );
}
