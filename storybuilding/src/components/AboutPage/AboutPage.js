import React from 'react';
import {Link} from 'react-router-dom'
import Nav from '../Nav';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
            <section className="hero is-info is-fullheight">
            <Nav/>
            <div className="is-fluid columns">
                <div className='column is-three-fifths is-offset-one-fifth'>
                <p className='is-size-2'>What is Quilltly</p> 
                <br/>
                    <p className='block'>Quilltly is a project made with love by three junior software engineers in the Winter of 2020-2021 as part of a project
                    meant to bring people together during the first winter of life during COVID.</p> 

                    

                    <p className='block'>The project has since been updated from its original design and now supports a more seamless user experience and user interface.</p>
 
                    
                    
                    </div>
                    </div>

                    <div className='columns container is-fluid'>
                        <div className='column'></div>
                        <div className='column'>
                            <div class="column card">
                            <div class="card-image">
                                    <figure class="image is-1by1">
                                    <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHGiKiJ60qEDA/profile-displayphoto-shrink_400_400/0/1636636844658?e=1658361600&v=beta&t=WWoauU6Bea_zJf2er0A6NOaMjV3Qqxj9hcM4MK9aaRM" alt="Profile Image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                <p class="title is-4" style={{color:"black"}}>Adelaide Evans</p>
                                </div>            
                            </div>
                        </div>

                        <div className='column'>
                            <div class="column card">
                                <div class="card-image">
                                    <figure class="image is-1by1">
                                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQFfW7lx85G-lw/profile-displayphoto-shrink_400_400/0/1583326321552?e=1658361600&v=beta&t=EMhbPcaszA-Sdpwy270n1nvTWmw2gYSP7DviB0duE8w" alt="Profile Image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                <p class="title is-4" style={{color:"black"}}>Alvionna Sunyaro</p>
                                </div>            
                            </div>
                        </div>

                        <div className='column'>
                            <div class="column card">
                                <div class="card-image">
                                    <figure class="image is-1by1">
                                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFZmtxMXaLanA/profile-displayphoto-shrink_400_400/0/1597260437075?e=1658361600&v=beta&t=HxI45Up4h_lw2on8rvax2B0us0aUlrlWc0-BsnsXwzY" alt="Profile Image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-4" style={{color:"black"}}>Jonathan Hoff</p>
                                </div>            
                            </div>
                        </div>
                        <div className='column'></div>
                    </div>

                            


                <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li class="is-active"><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  </div>
            </section>
            </>
        );
    }
}

export default AboutPage;