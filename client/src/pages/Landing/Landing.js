import React from 'react';
import { Image, Button } from 'semantic-ui-react';


class Landing extends React.Component {
    render() {
        return (
            <div>
                
                <Image src={require(`../../assets/images/tempTitle.png`)} className="temp-title" />
                
                <Button primary className="btn__landing" >Sign in or sign up with Goodreads</Button> 
                
                <ul className="slideshow">
                    <li>
                        <Image src={require(`../../assets/images/slideshow/1.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/2.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/3.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/4.png`)} className="cvr-img"  />
                    </li>
                </ul>
            </div>
        );
    }
}

export default Landing;


