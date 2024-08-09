import React from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';


const MainLayout = () => {
    const outlet = useOutlet();
    return (<div>
        <header>
          <Header/>
        </header>
      
        <main>  
            {outlet}
        </main>
       
        <footer>
            <Footer/>
        </footer>

    </div>);
};

export default MainLayout;