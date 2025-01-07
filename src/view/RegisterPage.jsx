import { BackwardIcon } from '../asset/icon/Icons';
import { postRequest } from '../network/ApiService';
import styles from './css/LoginRegsiterPage.module.css'
import { useNavigate } from 'react-router-dom';

// 用于部署演示注册登录
export let staticUserAccoutRepository = {
    data: [],
}

const RegisiterPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.loginPage + ' backgroundPage'}>
            <button className={styles.backward + " buttonFlat"} onClick={() => navigate(-1)}>
                <div className="buttonIconContainer"><BackwardIcon /></div>
                <p className="buttonText">返回</p>
            </button>

            <div className={styles.dialogContainer}>
                <p className={styles.dialogTitle}>注册</p>
                <form
                    className={styles.formContainer}
                    onSubmit={(e) => {
                        e.preventDefault(); // 防止默认刷新页面
                        const email = e.target.email.value;
                        const password = e.target.password.value;

                        let requestBody = { "userType": "user", "name": email.substring(0, email.indexOf("@")), "email": email, "password": password };
                        // 模拟提交逻辑，例如调用API
                        alert(`已提交：${requestBody.name} 的 ${requestBody.email} 注册`);
                        // 这里可以替换为你实际的提交逻辑，例如调用API
                        process.env.REACT_APP_DEPLOY_MODE === "frontend_only" ?
                            staticUserAccoutRepository.data.push(requestBody)
                            :
                            postRequest("/users", requestBody)
                            .then((response) => {
                                console.log(response)
                            });
                    }}
                >
                    <div className={styles.inputBox}>
                        <input
                            className={styles.inputContent}
                            type="email" // 使用 type="email" 提供额外的输入校验
                            placeholder="邮箱"
                            name="email"
                            required // 表示这是必填字段
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            className={styles.inputContent}
                            type="password" // 使用 type="password" 保护密码不显示
                            placeholder="密码"
                            name="password"
                            required // 表示这是必填字段
                        />
                    </div>
                    <button className={styles.registerSubmit} type="submit">提交注册</button>
                </form>
                
            </div>
        </div>
    )
}

export default RegisiterPage;