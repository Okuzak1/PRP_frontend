import { useState } from 'react';
import { BackwardIcon, CheckMarkIcon } from '../asset/icon/Icons';
import { postRequest } from '../network/ApiService';
import styles from './css/LoginRegsiterPage.module.css'
import { useNavigate } from 'react-router-dom';
import { staticUserAccoutRepository } from './RegisterPage';



const LoginPage = () => {
    const navigate = useNavigate();
    const [isMemorizePass, setIsMemorizePass] = useState(false);

    return (
        <div className={styles.loginPage + ' backgroundPage'}>
            <button className={styles.backward + " buttonFlat"} onClick={() => navigate('/')}>
                <div className="buttonIconContainer"><BackwardIcon /></div>
                <p className="buttonText">返回</p>
            </button>

            <div className={styles.dialogContainer}>
                <p className={styles.dialogTitle}>登录/注册</p>
                <form
                    className={styles.formContainer}
                    onSubmit={(e) => {
                        e.preventDefault(); // 防止默认刷新页面
                        const email = e.target.email.value;
                        const password = e.target.password.value;
                        // 模拟提交逻辑，例如调用API
                        alert(`已提交：${email}, ${password}`);
                        // 这里可以替换为你实际的提交逻辑，例如调用API
                        const deploy_mode = process.env.REACT_APP_DEPLOY_MODE;
                        console.debug(deploy_mode);
                        if (process.env.REACT_APP_DEPLOY_MODE === "frontend_only"){
                            const logedUser = staticUserAccoutRepository.data.find((user) => 
                                user.email === email && user.password === password
                            );
                            if (logedUser){
                                alert(`成功登录：${logedUser.name}`);
                                navigate("/profile");
                            }else
                                alert("登录失败！");
                        } else{
                            postRequest("/users/login", { "email": email, "password": password })
                            .then((response) => {
                                alert(`成功登录：${response.data.name}`);
                                navigate("/profile");
                            })
                            .catch((error) => {
                                console.error("错误详细信息：", error);
                                alert("登录失败！");
                            });
                        }
                    }}
                >
                    <div className={styles.inputBox}>
                        <input className={styles.inputContent} type="email" placeholder="账号" name="email" required />
                    </div>
                    <div className={styles.inputBox}>
                        <input className={styles.inputContent} type="password" placeholder="密码" name="password" required />
                    </div>
                    <div className={styles.submitTail}>
                        <button className={styles.loginSubmit} type='submit'>登录</button>
                        <div className={styles.memorizeAndRegister}>
                            <div className={styles.memorizePass}>
                                
                                <div className={styles.memorizePassCheckbox} onClick={() => setIsMemorizePass(!isMemorizePass)}>
                                    {isMemorizePass && <CheckMarkIcon />}
                                </div>
                                <div className={styles.hint+ " " + styles.memorizePassHint}>记住密码</div>
                            </div>
                            <div className={styles.hint + " " + styles.registerHint} onClick={() => navigate('/register')}>没有账号，注册新账号</div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default LoginPage;