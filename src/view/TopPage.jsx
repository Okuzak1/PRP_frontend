import { useNavigate } from 'react-router-dom';
import PictureIcon, { AttachmentIcon, CameraIcon, CancelXMarkIcon, ChainCrossIcon, ChatIcon, IndividualIcon, InternetIcon, LiquorIcon, Magnifier2Icon, MagnifierIcon, PaletteIcon, SendMessageIcon, SidebarIcon, ToolboxIcon, ZhujianIcon } from '../asset/icon/Icons';
import styles from './css/TopPage.module.css'
import '../asset/font/font.css'
import { useEffect, useRef, useState } from 'react';
import { getChatgpt_Multurn_qa } from '../util/llm_api';

let base64_image;
const agentHistoryRecordRepository = [
  {
    id: 1,
    title: "图片中的物体",
    timeStamp: "2024-12-29",
    chatnum: 1,
    messages: [
      {
        "role": "user",
        "content": [
          { type: "text", text: "What's in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          }
        ]
      },
      {
        "role": "assistant",
        "content": "\n\nThis image shows a wooden boardwalk extending through a lush green marshland.",
      },
    ]
  },
  {
    id: 2,
    title: "马远画作基本特征解读",
    timeStamp: "2024-12-11",
    chatnum: 0,
    messages: [
      {
        "role": "system",
        "content": '我需要你扮演古画鉴赏助手ArtEyer，带领用户鉴赏画作。'
      },
      {
        role: "user",
        // content: [
        //   {
        //     type: "text", text: `马远画作的题材主要是什么?在“山水”“花鸟”“人物”中选择。\n马远画作的形制主要是什么?选项包含“立轴”“长卷”“册页”“扇面”等。\n马远画作的材料主要是什么?在“纸本”“绢本”中选择。\n马远画作的技法主要是什么?在“工笔”“写意”“兼工带写”中选择。\n马远画作的设色主要是什么?在“水墨”“淡彩”“重彩”中选择。`
        //   },
        //   { type: "image_url", image_url: { "url": `data:image/jpeg;base64,${base64_image}` } },
        // ]
        content: `马远画作的题材主要是什么?在“山水”“花鸟”“人物”中选择。\n马远画作的形制主要是什么?选项包含“立轴”“长卷”“册页”“扇面”等。\n马远画作的材料主要是什么?在“纸本”“绢本”中选择。\n马远画作的技法主要是什么?在“工笔”“写意”“兼工带写”中选择。\n马远画作的设色主要是什么?在“水墨”“淡彩”“重彩”中选择。`
      }
    ]
  }
]

const TopPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // AI mode
  const [focusChatId, setFocusChatId] = useState(null);  // 选中的ChatId

  const [apikey, setApikey] = useState('');
  const [content, setContent] = useState('');
  const [chatnum, setChatnum] = useState(0); // 对话轮次
  const [messages, setMessages] = useState([]);
  const [selectUploadImages, setSelectUploadImages] = useState([]);

  const messageContainerRef = useRef(null); // 用于消息滚动到底部
  const currentDialogId = useRef(null); // 当前对话 ID
  const messageInputRef = useRef(null);

  // 模拟 Vue 中的 `watch`，监听 `messages` 的变化，并自动滚动到页面底部
  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]); // 每当 messages 更新时触发

  // todo：提交图片
  // 提交消息的方法
  const submit = async () => {
    // 新增对话项目
    if (!focusChatId) {
      let date = new Date();
      const chatId = agentHistoryRecordRepository.length + 1;
      agentHistoryRecordRepository.push({
        id: chatId,
        title: "未命名",
        timeStamp: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        chatnum: 0,
        messages: [],
      })
      setMessages([]);
      setChatnum(0);
      setFocusChatId(chatId);
    }
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
    for (var i = 0, len = agentHistoryRecordRepository.length; i < len; i++) {
      if (agentHistoryRecordRepository[i].id === focusChatId) {
        agentHistoryRecordRepository[i].chatnum = updatedChatnum;
        agentHistoryRecordRepository[i].messages = updatedMessages;
        break;
      }
    }
    console.log("更新后的消息：", updatedMessages);
  };

  // 上传图片
  const handleImageUploadChange = (event) => {
    const files = event.target.files; // 获取用户选中的所有文件
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      // 监听 FileReader 的加载事件
      reader.onload = (e) => {
        newImages.push(e.target.result);

        // 当所有图片加载完成时更新状态
        if (newImages.length === files.length) {
          setSelectUploadImages((prevImages) => [...prevImages, ...newImages]); // 合并旧图片和新图片
        }
      };

      reader.readAsDataURL(file); // 读取文件为 Data URL
    }
  };

  return (
    <div className={styles.topPage + ' backgroundPage'}>
      {/* 侧边栏 */}
      <div className={styles.sidebar + ` ${isSidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.topButtonContainer}>
          <div className={styles.topButton} onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            setFocusChatId(null);
          }}><SidebarIcon /></div>
          <div className={styles.topButton}><ChatIcon /></div>
        </div>
        <div className={styles.middleButtonContainer}>
          <button className={styles.middleButton} onClick={() => setFocusChatId(null)}>
            <ChainCrossIcon />
            <p className={styles.boldText} >询问AI</p>
          </button>
          <button className={styles.middleButton}>
            <Magnifier2Icon />
            <p className={styles.boldText}>查找历史</p>
          </button>
        </div>
        <div className={styles.bottomContainer}>
          <p className={styles.boldText + ' ' + styles.bottomTitle}>历史记录</p>
          <div className={styles.bottomItemContainer}>
            {
              agentHistoryRecordRepository.map((chat, index) => (
                <button
                  className={styles.middleButton + " " + styles.bottomButton}
                  onClick={() => {
                    setFocusChatId(chat.id);
                    setMessages(chat.messages);
                    setChatnum(chat.chatnum);
                  }}>
                  <p className={styles.mediumText}>{chat.title}</p>
                </button>
              ))
            }
            <textarea
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
              placeholder="Enter your apikey"
              style={{ marginTop: "5vh", width: "80%", height: "8vh" }}
            />
          </div>
        </div>
      </div>
      {/* 头部导航栏 */}
      <div className={styles.header}>
        <div className={styles.sidebarButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}><SidebarIcon /></div>
        <button id={styles.artGalleryButton} className={styles.button} onClick={() => navigate('/art-gallery')}>
          <div className={styles.buttonIconContainer}><PictureIcon /></div>
          <p className={styles.buttonText + ' text'}>画廊</p>
        </button>
        <button id={styles.profileButton} className={styles.button} onClick={() => navigate('/login', { replace: false })}>
          <div className={styles.buttonIconContainer}><IndividualIcon /></div>
          <p className={styles.buttonText}>个人中心</p>
        </button>
      </div>

      {isSidebarOpen && (
        <div className={styles.mainContentContainer}>
          {/* AI 对话栏 */}
          {focusChatId && (
            <div className={styles.llmDialogContainer} ref={messageContainerRef}>
              <div className={styles.messageContainer}>
                {messages.map((message, index) => (
                  ((message.role === 'user' || message.role === 'assistant') &&
                    <div
                      key={index}
                      className={message.role === 'user' ? styles.userMessage : styles.aiMessage}
                    >
                      {Array.isArray(message.content)
                        ? message.content.map((contentItem, idx) => {
                          if (contentItem.type === 'text') {
                            return <p key={idx} className={styles.textMessage}>{contentItem.text}</p>;
                          } else if (contentItem.type === 'image_url') {
                            return (
                              <img
                                key={idx}
                                className={styles.imageMessage}
                                src={contentItem.image_url.url}
                                alt="User content"
                              />
                            );
                          }
                          return null;
                        })
                        : <p className={styles.textMessage}>{message.content}</p>}
                    </div>)
                ))}
              </div>
            </div>)}
          {/* AI信息输入栏 */}
          <div className={styles.searchContainer + " " + styles.messageInputContainer + ` ${focusChatId && styles.bottomChatInput}`}>
            <div className={styles.searchBox} style={{ paddingTop: "0.5vh" }}>
              {selectUploadImages && selectUploadImages.length > 0 &&
                <div className={styles.imageInputRow}>
                  {selectUploadImages.map((image, index) => (
                    <div className={styles.imageInput}>
                      <img
                        src={image}
                        alt={`User uploaded ${index}`}
                      />
                      <div className={styles.imageCancelIconContainer} onClick={() => setSelectUploadImages(selectUploadImages.filter((_, imgIndex) => imgIndex !== index))}>
                        <CancelXMarkIcon />
                      </div>
                    </div>
                  ))}
                </div>}

              <div className={styles.textInputRow} id={styles.messageTextInutRow}>
                <p
                  className={`${styles.messageInput} ${styles.textInput}`}
                  type="text"
                  value={content}
                  onInput={(e) => setContent(e.target.innerText)}
                  onKeyDown={(e) => e.key === "Enter" && content && submit()}
                  contentEditable="true"
                >
                  {content}
                </p>
              </div>

              <div className={styles.buttonInputRow}>
                {/* label与input配合 */}
                <label className={styles.attachButtonContainer + " " + styles.inputFunctionalButton} >
                  <AttachmentIcon />
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }} // 隐藏实际的文件选择框
                    multiple
                    onChange={handleImageUploadChange}
                  />
                </label>
                <div className={styles.toolboxButtonContainer + " " + styles.inputFunctionalButton} ><ToolboxIcon /></div>
                <div className={styles.internetButtonContainer + " " + styles.inputFunctionalButton} ><InternetIcon /></div>
                <div
                  className={styles.searchIconContainer}
                  onClick={submit}
                  style={{ right: "1.25vw", display: "flex", position: "absolute" }}
                >
                  <SendMessageIcon />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 搜索栏 */}
      {!isSidebarOpen &&
        <div className={styles.searchBoxContentContainer}>
          <div className={styles.searchContainer + " " + styles.searchInputContainer}>
            <div className={styles.searchBox} style={{ width: "54.17vw" }}>
              <div className={styles.textInputRow} id={styles.searchTextInutRow}>
                <input className={`${styles.searchInput} ${styles.textInput}`} type="text" placeholder="请输入查找古画信息" />
                <div className={styles.searchIconContainer} onClick={() => navigate('/search')}><MagnifierIcon /></div>
              </div>
            </div>
          </div>
        </div>
      }

      {/* 导航栏 */}
      {!isSidebarOpen &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.navigationContainer + ` ${isSidebarOpen ? styles.hidden : styles.visible}`}>
            <div className={styles.naviBox}>
              <div className={styles.naviButton}>
                <div className={styles.naviIconContainer}><ZhujianIcon /></div>
              </div>
              <p className={styles.naviText}>诗画修复</p>
            </div>

            <div className={styles.naviBox}>
              <div className={styles.naviButton}>
                <div className={styles.naviIconContainer}><CameraIcon /></div>
              </div>
              <p className={styles.naviText}>实图修复</p>
            </div>

            <div className={styles.naviBox}>
              <div className={styles.naviButton}>
                <div className={styles.naviIconContainer}><PaletteIcon /></div>
              </div>
              <p className={styles.naviText}>色彩验证</p>
            </div>

            <div className={styles.naviBox}>
              <div className={styles.naviButton}>
                <div className={styles.naviIconContainer}><LiquorIcon /></div>
              </div>
              <p className={styles.naviText}>色彩调试</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default TopPage;