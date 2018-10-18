import React from 'react';
import { Image } from 'semantic-ui-react';


export default class Slideshow extends React.Component {
    state = {
        imageCards: Array.apply(null, {length: 4}).map(Number.call, Number),
    }
    
    render() {
        return (
            <ul className="slideshow">
                {this.state.imageCards.map((index) => (
                    <li key={index}>
                        <Image
                            key={index + 4}
                            id={index}
                            src={require(`../../assets/images/slideshow/${index}.png`)}
                            className="cvr-img"
                        />
                    </li>
                ))}
            </ul>
        )
    }
};