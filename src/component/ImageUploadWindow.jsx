import { PlusIcon } from "../asset/icon/Icons";
import styles from "./css/ImageUploadWindow.module.css";
import React, { useState } from "react";

const defaultPaintingInfo = {
    basicInfo: {
        title: { displayName: "名称", content: "春山行旅图" },
        artist: { displayName: "作者", content: "李昭道" },
        era: { displayName: "朝代", content: "隋唐" },
        size: { displayName: "尺寸", content: "95.5, 55.3" },
        institution: { displayName: "机构", content: "台北故宫博物院" },
    },
    otherInfo: ["题材", "画风", "笔触", "画布", "构图", "画家流派", "主要元素", "装裱方式", "破损程度", "绘画用途"]
}

/* 
upload start: 传入1以启动
*/
const ImageUploadWindow = ({ onClose }) => {
    const [uploadStage, setUploadStage] = useState(1);
    const [selectUploadImage, setSelectUploadImage] = useState(null);

    const handleImageUploadChange = (event) => {
        const file = event.target.files; // 获取用户选中的所有文件
        const reader = new FileReader();
        // 监听 FileReader 的加载事件
        reader.onload = (e) => {
            const newImage = e.target.result;
            setSelectUploadImage(newImage);
        };
        reader.readAsDataURL(file); // 读取文件为 Data URL
    };

    return (
        <div className={styles.imageUploadWindow}>
            {uploadStage == 1 && (
                <div className={styles.imageUploadStage}>
                    <div className={styles.imageUploadCotainer}>
                        <label className={styles.imageUploadBox} >
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                style={{ display: "none" }} // 隐藏实际的文件选择框
                                onChange={handleImageUploadChange}
                            />
                            <PlusIcon />
                            <p
                                style={{
                                    fontSize: "3.333vh",
                                    fontWeight: "600",
                                    color: "#625745",
                                }}
                            >
                                拖拽上传
                            </p>
                        </label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.button}
                            onClick={() => setUploadStage(2)}
                        >
                            打开
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                setUploadStage(0);
                                onClose();
                            }}
                        >
                            取消
                        </button>
                    </div>
                </div>
            )}
            {uploadStage == 2 && (
                <div className={styles.propertyInputStage}>
                    <div className={styles.propertyInputContainer}>
                        <div id={styles.thumbnail} className={`${styles.infoBlock} ${styles.largeInfoBlock}`}>缩略图：</div>
                        <div id={styles.basicInfoContainer} className={styles.propertyInfoContainer}>
                            {Object.entries(defaultPaintingInfo.basicInfo).map(([key, value], index) => (
                                <div className={styles.propertyInfoBox}>
                                    <div className={`${styles.smallInfoBlock} ${styles.infoBlock}`}>{value.displayName}</div>
                                    <div className={`${styles.propertyInfo} ${styles.infoBlock}`}>{value.content}</div>
                                </div>
                            ))}
                        </div>
                        <div id={styles.backgroundIntro} className={`${styles.infoBlock} ${styles.largeInfoBlock}`}>背景简介：</div>
                        <div id={styles.colorSchemeAndPoem}>
                            <div id={styles.colorScheme} className={`${styles.infoBlock} ${styles.largeInfoBlock}`}>配色（自动）：</div>
                            <div id={styles.poem} className={`${styles.infoBlock} ${styles.largeInfoBlock}`}>诗歌：</div>
                        </div>
                        <div id={styles.otherInfoContainer} className={styles.propertyInfoContainer}>
                            {defaultPaintingInfo.otherInfo.map((value, index) => (
                                <div className={styles.propertyInfoBox}>
                                    <div className={`${styles.smallInfoBlock} ${styles.infoBlock}`}>{value}</div>
                                    <div className={`${styles.propertyInfo} ${styles.infoBlock}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.footerButtonContainer}>
                        <button className={styles.button}>确认上传</button>
                        <button className={styles.button} onClick={() => {
                            setUploadStage(0);
                            onClose();
                        }}>取消</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageUploadWindow;