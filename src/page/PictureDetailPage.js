import styles from "./css/PictureDetailPage.module.css"
import ImageViewer from "../component/ImageViewer";
import { ExitIcon, FavoriteIcon, HomeIcon, UnfavoriteIcon } from "../asset/icon/Icons";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../component/UserAvatar";
import { useState } from "react";
import Zhelantu from "../asset/pictures/折槛图.png"

const defaultPictureDetailInfo = {
    image: Zhelantu,
    basic_info: {
        "名称": "宋人画折槛图",
        "作者": "佚名",
        "朝代": "宋代",
        "尺寸": "纵：173.9 公分，横：101.8 公分",
        "机构": "台北故宫博物院"
    },
    background_intro: "      在《汉书．朱云传》中有详细记载。西汉成帝时（西元前三三至七年在位），宰相张禹恃宠而骄，朝中大臣多因张禹曾为皇上的老师，而不敢加以纠举弹劾。一日，槐里令朱云上书求见，当着公卿大臣面前，请赐上方斩马剑斩佞臣，皇上怒斥朱云以下犯上，竟然当廷污辱其师，于是下令要将朱云处死。朱云攀着殿槛抵抗，以至槛折。",
    fixer: {},
    other_info: {
        "1": "图轴",
        "2": "绢本、设色",
        "3": "故事画",
        "4": "人物、植物",
        color_distribution: ["#8F604B", "#6A624C", "#91886B", "#D0AC86", "#67604D"],
    },
    is_favorite: true,

}


const PictureDetailPage = () => {
    const navigate = useNavigate();

    const [favoriteState, setFavoriteState] = useState(defaultPictureDetailInfo.is_favorite);
    const [barContentVisibilityStates, setBarContentVisibility] = useState(Array(5).fill(false));
    const toggleVisibility = (index) => {
        const newVisibilityStates = [...barContentVisibilityStates];
        newVisibilityStates[index] = !barContentVisibilityStates[index];
        setBarContentVisibility(newVisibilityStates);
    };
    const otherInfoLength = Object.entries(defaultPictureDetailInfo.other_info).length; // 总长度

    
    return (
        <div className={styles.PictureDetailPage}>
            <button className={styles.backwardButton + " buttonFlat"} onClick={() => navigate(-1)}>
                <div className={"buttonIconContainer"}><ExitIcon /></div>
                <p className={"buttonText"}>退出</p>
            </button>
            <button className={styles.topPageButton + " buttonFlat"} onClick={() => navigate('/')}>
                <div className={"buttonIconContainer"}><HomeIcon /></div>
                <p className={"buttonText"}>首页</p>
            </button>
            <ImageViewer />
            <div className={styles.leftBarContainer}>
                <div className={styles.l1 + " " + styles.barUnit} onClick={() => toggleVisibility(0)}><p>基本信息</p></div>
                {barContentVisibilityStates[0] && <div className={styles.l1e + " " + styles.barExpansionUnit}>
                    <div className={styles.l1eContent}>
                        {Object.entries(defaultPictureDetailInfo.basic_info).map(([key, value], index) => (
                            <>
                                <div className={styles.infoKey}><p>{key}</p></div>
                                <div className={styles.infoValue}><p>{value}</p></div>
                            </>
                        ))}
                    </div>
                </div>}
                <div className={styles.l2 + " " + styles.barUnit} onClick={() => toggleVisibility(1)}><p>背景简介</p></div>
                {barContentVisibilityStates[1] && <div className={styles.l2e + " " + styles.barExpansionUnit}>
                    <div className={styles.expansionContent + " " + styles.l2eContent}>
                        <p>{defaultPictureDetailInfo.background_intro}</p>
                    </div>
                </div>}
                <div className={styles.l3 + " " + styles.barUnit} onClick={() => toggleVisibility(2)}><p>修复者</p></div>
                {barContentVisibilityStates[2] && <div className={styles.l3e + " " + styles.barExpansionUnit}>
                    <div className={styles.expansionContent + " " + styles.l3eContent}>
                        <UserAvatar
                            diameter="calc(2.5vw + 4.25vh)"
                            style={{
                                borderStyle: "hidden",
                                gridArea: "1 / 1 / 3 / 2",
                                placeSelf: "center center",
                                margin: "1.3889vh 0.78125vw",
                            }}
                        />
                        <p className={styles.userName}>用户4288</p>
                        <div className={styles.userDetailContainer}>
                            <div className={styles.userDetailSimulator} />
                            <div className={styles.userDetailSimulator} />
                        </div>
                    </div>
                </div>}
            </div>
            <div className={styles.rightBarContainer}>
                <div className={styles.r1 + " " + styles.barUnit} onClick={() => toggleVisibility(3)}><p>其他信息</p></div>
                {barContentVisibilityStates[3] && <div className={styles.r1e + " " + styles.barExpansionUnit}>
                    <div className={styles.r1eContent}>
                        {Object.entries(defaultPictureDetailInfo.other_info).map(([key, value], index) => {
                            const itemHeight = `calc((100% - 9.26vh) / ${otherInfoLength})`; // 计算每项的高度
                            return key === "color_distribution" ? (
                                <div
                                    key={index}
                                    className={styles.otherInfoItem + " " + styles.colorDistributionContainer}
                                    style={{ height: itemHeight }}
                                >
                                    {value.map((v, i) => (
                                        <div
                                            key={i}
                                            className={styles.colorDistributionCube}
                                            style={{
                                                backgroundColor: v,
                                                width: `calc((100% - 2.34375vw) / ${value.length})`, // 子元素高度均分
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            ) : (
                                <div key={index} className={styles.otherInfoItem} style={{ height: itemHeight }}>
                                    <p>{value}</p>
                                </div>
                            );
                        })}

                    </div>
                </div>}

                <div className={styles.r2 + " " + styles.barUnit} onClick={() => toggleVisibility(4)}><p>原图对比</p></div>
                {barContentVisibilityStates[4] && (<div className={styles.r2e + " " + styles.barExpansionUnit}>
                    <div className={styles.expansionContent + " " + styles.r2eContent}>
                        <img src={defaultPictureDetailInfo.image} alt="原图" className={styles.originImage} />
                    </div>
                </div>)}
                <div className={styles.r3 + " " + styles.barUnit}>
                    <div className={styles.favoriteIconContainer} onClick={() => setFavoriteState(!favoriteState)}>
                        {favoriteState ? <FavoriteIcon /> : <UnfavoriteIcon />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PictureDetailPage;