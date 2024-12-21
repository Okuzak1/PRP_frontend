import styles from './css/ArtGalleryAndSearchPage.module.css'

import Chuntiaotu from "../asset/pictures/personalProject/层楼春眺图.png"
import Jiangsitu from "../asset/pictures/personalProject/长夏江寺图.png"
import Fuguitu from "../asset/pictures/玉堂富贵图.png"
import Zhaoliang from "../asset/pictures/水殿招凉.png"
import Youchuntu from "../asset/pictures/摹张萱虢国夫人游春图.png"
import Duozitu from "../asset/pictures/personalUpload/吉祥多子图.png"
import Jiege from "../asset/pictures/personalUpload/杰阁媐春.png"
import Jiaomintu from "../asset/pictures/personalUpload/龙宿郊民图.png"
import Suichaotu from "../asset/pictures/personalUpload/岁朝图.png"
import { useNavigate } from 'react-router-dom';
import { ExitIcon, MagnifierIcon } from '../asset/icon/Icons';

const defaultPictures = [Duozitu, Jiege, Jiaomintu, Suichaotu, Jiangsitu, Chuntiaotu, Fuguitu, Zhaoliang, Youchuntu]
const defaultPicturesName = ["层楼春眺图", "长夏江寺图", "玉堂富贵图", "水殿招凉", "摹张萱虢国夫人游春图", "吉祥多子图", "杰阁媐春", "龙宿郊民图", "岁朝图"]

const SearchPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.artGalleryPage + " scrollbarPage"}>
            <button className={styles.exitButton + " buttonFlat"} onClick={() => navigate('/')}>
                <div className={"buttonIconContainer"}><ExitIcon /></div>
                <p className={"buttonText"}>退出</p>
            </button>
            <div className={styles.topBackground} >
                <div className={styles.searchContainer}>
                    <div className={styles.searchBox}>
                    <input className={styles.searchInput} type="text" placeholder="唐宋" />
                    <div className={styles.searchIconContainer} ><MagnifierIcon /></div>
                    </div>
                </div>
            </div>

            <div className={styles.gridContainer}>
                {defaultPictures.map((image, index) => (
                    <div key={index} className={styles.gridItem} onClick={() => navigate('/detail')}>
                        <img src={image} alt={`Art Gallery ${index}`} />
                        <div key={index} className={styles.itemMask}>
                            <p>{defaultPicturesName[index]}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.bottomBackground} />
            
        </div>
    )
}

export default SearchPage;