import { Carousel } from "antd";
import styles from './css/TestPage.module.css';
// import './css/TestPage.module.css'
import './css/TestPage.css'
import Sanguantu from "../asset/pictures/markedPicture/三官图地官.png";
import Chuntiaotu from "../asset/pictures/personalProject/层楼春眺图.png";
import Jiangsitu from "../asset/pictures/personalProject/长夏江寺图.png";
const defaultMarkedImg = [Sanguantu, Chuntiaotu, Jiangsitu];

const TestPage = () => {
    return (
        <div className={styles.testPage + " testPage"}>
            <p className="text">test</p>
            <img className="img1" src={Sanguantu} alt="first"></img>
            <Carousel autoplay adaptiveHeight={true} className={styles.carouselStyle}>
                {defaultMarkedImg.map((image, index) => (
                    <div>
                        <img src={image} alt="6" /> 
                    </div>
                ))}
            </Carousel>


        </div>
    )
}

export default TestPage;