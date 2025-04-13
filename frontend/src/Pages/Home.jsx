import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
export function Home() {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="contants h-screen w-full flex items-center justify-center">
          <Card />
        </div>
        <Footer />
      </div>
    </>
  );
}
