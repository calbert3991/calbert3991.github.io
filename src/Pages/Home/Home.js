import './Home.css';

import PictureCollage from '../../Components/PictureCollage/PictureCollage.js'

function Home() {
    return (
      <div className="Home">
        <header className="Home-header">
        </header>
        <section className="Home-body">
            <PictureCollage className="heroElement"
                backgroundColor="#353541"
                height="100vh"
                width="100vw"
                pictureHeight="400px"
                pictureWidth="300px"
            />
        </section>
        <footer className="Home-footer">
        </footer>
      </div>
    );
  }
  
  export default Home;