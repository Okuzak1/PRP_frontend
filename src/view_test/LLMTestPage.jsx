import React, { useEffect, useRef, useState } from 'react';
import styles from './css/LLMTestPage.module.css';
import caseImage1 from '../asset/case1/case_清晰版_new.png';
import caseImage2 from '../asset/case2/case2.png';
import caseImage3 from '../asset/case3/case3.png';
import { getChatgpt_Multurn_qa } from '../util/llm_api';

const LLMTestPage = () => {
    const [caseNum, setCaseNum] = useState(0);
    const [apikey, setApikey] = useState('');
    const [tempKey, setTempKey] = useState('');
    const [content, setContent] = useState('');
    const [chatnum, setChatnum] = useState(0); // 对话轮次
    const [messages, setMessages] = useState([
        {
            "role": "system",
            "content": '我需要你扮演古画鉴定助手ArtEyer，带领用户分析画作的真伪。你的任务是根据用户的提问，知道用户使用系统的不同功能。系统一共有三个功能：功能1：判断画作基本特征是否符合画家习惯；功能2：判断画面中物体位置是否符合画家习惯；功能3：判断画面物体的笔触是否与画家真迹相似。由于3个功能相对应的，分别可以给出3种答复：答复1：请在“画作基本特征”模块查看待鉴定画作的特征和画家对不同基本特征的偏好。答复2：请选择你想查看的物体，并观察热力图，判断该物体位置是否符合画家习惯。答复3：请选择你想查看的物体，观察该物体与画家真迹中的同样物体笔触是否相似。请根据用户的提问判断应该使用哪个功能，并给出对应答复。注意根据用户的具体问题修改答复。例如：-	用户提问：我想知道这幅画中的山峰是不是马远的真迹。-	ArtEyer应回答：【功能3】请在图像中点击你想查看的山峰，观察这座山峰与马远真迹中的山峰是否相似。-	用户提问：这幅画的印章位置正确吗？-	ArtEyer应回答：【功能2】请在图像中点击印章，并观察热力图，判断该印章的位置是否在热力图中偏红色的区域。-	用户提问：梁楷会画重彩的山水画吗？-	ArtEyer应回答：【功能1】请在“画作基本特征”模块查看梁楷对主题和设色的偏好。 在每次的回答后，用一段话提示用户接下来可以问什么。 注意：1.	当用户提到“构图”相关问题时，应该回复【功能2】，因为构图是与物体位置有关的。2.	【功能1】中包括的基本特征只有“题材”“形制”“材质”“技法”“设色”这5项。3.	其中，“技法”指全图的技法，如果用户问到具体物体的技法，应回复【功能3】。 除了这个任务外，你还有一个初始任务：介绍自己的功能，并提示用户上传图片，提供相关信息，同时提升用户可以问哪些问题。现在，你明白你需要完成的任务了吗？如果明白的话，请你开始扮演ArtEyer，我将开始扮演用户。',
        }
    ]);

    const messageContainerRef = useRef(null); // 用于消息滚动到底部
    const currentDialogId = useRef(null); // 当前对话 ID

    // 模拟 Vue 中的 `watch`，监听 `messages` 的变化，并自动滚动到页面底部
    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }, [messages]); // 每当 messages 更新时触发

    // 提交消息的方法
    const submit = async () => {
        let updatedChatnum = chatnum + 1; // 增加对话轮次
        console.log("这是第几轮对话", updatedChatnum);
        const userInput = content;
        setContent(""); // 清空输入框
        let updatedMessages = [...messages];
        updatedMessages.push({
            role: "user",
            content: userInput,
        });
        

        const list = [];
        console.log("提交的内容：", userInput);

        if (apikey) {
            for await (const result of getChatgpt_Multurn_qa(updatedMessages, apikey)) {
                if (result.id === currentDialogId.current) {
                    // 如果返回的结果 ID 与当前对话 ID 相同
                    const index = list.findIndex((item) => item.id === currentDialogId.current);
                    if (index !== -1) {
                        const dialog = list[index];
                        dialog.content = dialog.content + result.content;
                        updatedMessages[updatedMessages.length - 1].content = dialog.content;
                    }
                } else {
                    // 新对话 ID
                    currentDialogId.current = result.id;
                    list.push({
                        content: result.content,
                        role: "assistant",
                        id: result.id,
                        timestamp: Date.now(),
                    });
                    updatedMessages.push({
                        role: "assistant",
                        content: result.content,
                    });
                }
                console.log("当前对话列表：", list[0]);
            }
        } else {
            updatedMessages.push({
                role: "assistant",
                content: "回复 " + userInput,
            });
        }

        setMessages(updatedMessages); // 更新消息列表
        setChatnum(updatedChatnum); // 更新对话轮次
        console.log("更新后的消息：", updatedMessages);
    };

    const saveApiKey = () => {
        setApikey(tempKey);
        console.log("保存的 API Key：", tempKey);
        setTempKey('');
    };

    const renderCaseImage = () => {
        if (caseNum === 1) return <img src={caseImage1} alt="Case 1" />;
        if (caseNum === 2) return <img src={caseImage2} alt="Case 2" />;
        if (caseNum === 3) return <img src={caseImage3} alt="Case 3" />;
        return null;
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.menu}>
                    <div className={styles.header}>ArtMagnifier</div>
                    <div className={styles.buttons}>
                        <button onClick={() => setCaseNum(1)}>MaYuan</button>
                        <button onClick={() => setCaseNum(2)}>GuoXi</button>
                        <button onClick={() => setCaseNum(3)}>LiangKai</button>
                    </div>
                    {apikey === '' && (
                        <div className={styles.apikeyContainer}>
                            <textarea
                                value={tempKey}
                                onChange={(e) => setTempKey(e.target.value)}
                                placeholder="Enter your apikey"
                            />
                            <button onClick={saveApiKey}>Save</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.messageContainer} ref={messageContainerRef}>
                    <div className={styles.caseContent}>
                        {renderCaseImage()}
                        {caseNum !== 0 && <button>查看详情</button>}
                    </div>
                    {messages.map((msg, index) => (
                        <div key={index} className={styles.message}>
                            <div className={styles.role}>{msg.role === 'user' ? 'Me' : 'Agent'}</div>
                            <div className={styles.content}>{msg.content}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Ask me anything"
                    />
                    <button onClick={submit}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default LLMTestPage;
