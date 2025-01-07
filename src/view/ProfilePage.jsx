import { useNavigate } from "react-router-dom";
import styles from './css/ProfilePage.module.css';
import './css/ProfilePage.css';
import { ExitIcon, InspectDetailIcon, InvisibleIcon, NewProjectIcon, RenameIcon, UploadIcon, VisibleIcon } from "../asset/icon/Icons";
import UserAvatar from "../component/UserAvatar";
import Sanguantu from "../asset/pictures/markedPicture/三官图地官.png";
import Chuntiaotu from "../asset/pictures/personalProject/层楼春眺图.png"
import Jiangsitu from "../asset/pictures/personalProject/长夏江寺图.png"
import Fuguitu from "../asset/pictures/玉堂富贵图.png"
import Zhaoliang from "../asset/pictures/水殿招凉.png"
import Youchuntu from "../asset/pictures/摹张萱虢国夫人游春图.png"
import Duozitu from "../asset/pictures/personalUpload/吉祥多子图.png"
import Jiege from "../asset/pictures/personalUpload/杰阁媐春.png"
import Jiaomintu from "../asset/pictures/personalUpload/龙宿郊民图.png"
import Suichaotu from "../asset/pictures/personalUpload/岁朝图.png"
import { useState } from "react";
import { Carousel } from "antd";


const defaultMarkedImg = [Sanguantu, Youchuntu, Zhaoliang]
const defaultPersonalProjectsImg = [Jiangsitu, Chuntiaotu, Fuguitu, Zhaoliang, Youchuntu]
const defaultPersonalUploadsImg = [Duozitu, Jiege, Jiaomintu, Suichaotu, Jiangsitu, Chuntiaotu, Fuguitu, Zhaoliang, Youchuntu]

const ProfilePage = () => {
    const navigate = useNavigate();

    const [isCreateDetailVisible, setCreateDetailVisible] = useState(false);
    const [isPersonalProjectDetailVisible, setPersonalProjectDetailVisible] = useState(0);


    const [visibilityStates, setVisibilityStates] = useState(
        Array(defaultPersonalUploadsImg.length).fill(true) // 初始状态，全为可见
    );

    const toggleVisibility = (index) => {
        // 更新点击可见图标的状态
        const updatedStates = [...visibilityStates];
        updatedStates[index] = !updatedStates[index];
        setVisibilityStates(updatedStates);
    };

    const personalProjectExtendOnClick = (index) => {
        if (isPersonalProjectDetailVisible !== index + 1)
            setPersonalProjectDetailVisible(index + 1);
        else
            setPersonalProjectDetailVisible(0);
    }

    return (
        <div className={styles.profilePage}>

            <button className={styles.backwardButton + " buttonFlat"} onClick={() => navigate('/')}>
                <div className={"buttonIconContainer"}><ExitIcon /></div>
                <p className={"buttonText"}>退出</p>
            </button>
            <div className={styles.uploadAndCreateButtons}>
                <button className={styles.buttons + " buttonFlat"}>
                    <div className={"buttonIconContainer"}><UploadIcon /></div>
                    <p className={"buttonText"}>上传</p>
                </button>

                <button
                    className={styles.buttons + " buttonFlat"}
                    onClick={() => setCreateDetailVisible(!isCreateDetailVisible)}
                >
                    <div className={"buttonIconContainer"}><NewProjectIcon /></div>
                    <p className={"buttonText"}>创建</p>
                </button>

                {isCreateDetailVisible && (
                    <div className={styles.popupContainer}>
                        <button className={styles.popupButton} onClick={() => alert("上传新建")}>上传新建</button>
                        <button className={styles.popupButton} onClick={() => alert("选择已有")}>选择已有</button>
                    </div>
                )}

            </div>
            <div className={styles.userInfoContainer}>
                <UserAvatar diameter="95%" style={{ zIndex: 3, }} />
                <div className={styles.userNameContainer}>
                    <p>用户4288</p>
                    <div className={styles.renameIconContainer}>
                        <RenameIcon />
                    </div>
                </div>
                <div className={styles.userDetailContainer}>
                    <div className={styles.userDetailSimulator} />
                    <div className={styles.userDetailSimulator} />
                    <div className={styles.userDetailSimulator} />
                </div>
            </div>
            <div className={styles.markedPictureContainer + " markedPictureContainer"}>
                {/* <img src={Sanguantu} alt="marked" /> */}

                <Carousel
                    autoplay
                    adaptiveHeight={true}
                    className={styles.carousel}
                    dots={false}
                    effect="scrollx"
                >
                    {defaultMarkedImg.map((image, index) => (
                        <div>
                            <img src={image} alt="marked" />
                        </div>
                    ))}
                </Carousel>

                <div className={styles.lowerMark} onClick={() => navigate('/art-gallery')}>
                    <div>
                        <p>查看标记图画</p>
                        <InspectDetailIcon />
                    </div>
                </div>
            </div>
            <p className={styles.personalProjectText + " personalProjectAndUploadText"}>个人项目</p>
            <div className={styles.personalProjectContainer + " scrollbarContainer"}>
                {defaultPersonalProjectsImg.map((image, index) => (
                    <div
                        key={index}
                        className={styles.projectGridItem}
                        onClick={() => personalProjectExtendOnClick(index)}
                    >
                        <img src={image} alt={`Personal Project ${index}`}></img>
                        {isPersonalProjectDetailVisible === index + 1 && (
                            <div className={styles.popupContainer + " " + styles.personalProjectPopupContainer}>
                                <button className={styles.popupButton} onClick={() => alert("公开分享")}>公开分享</button>
                                <button className={styles.popupButton} onClick={() => alert("删除文件")}>删除文件</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className={styles.personalUploadText + " personalProjectAndUploadText"}>个人上传</p>
            <div className={styles.personalUploadContainer + " scrollbarContainer"}>
                {defaultPersonalUploadsImg.map((image, index) => (
                    <div key={index} className={styles.projectGridItem}>
                        <img src={image} alt={`Personal Project ${index}`} />
                        <div
                            className={styles.visibleIconContainer}
                            onClick={() => toggleVisibility(index)}
                        >
                            {visibilityStates[index] ? <VisibleIcon /> : <InvisibleIcon />}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.topBackground} />
            <div className={styles.topBackgroundMask} />

        </div>
    )
}

export default ProfilePage;