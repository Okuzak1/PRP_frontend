import { useNavigate } from 'react-router-dom';
import PictureIcon, { CameraIcon, IndividualIcon, LiquorIcon, MagnifierIcon, PaletteIcon, ZhujianIcon } from '../asset/icon/Icons';
import styles from './css/TopPage.module.css'
import '../asset/font/font.css'

const TopPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className={styles.topPage + ' backgroundPage'}>
      <div className={styles.header}>
        <div className={styles.headerSpace}></div>
        <button id={styles.artGalleryButton} className={styles.button} onClick={() => navigate('/art-gallery')}>
          <div className={styles.buttonIconContainer}><PictureIcon /></div>
          <p className={styles.buttonText + ' text'}>画廊</p>
        </button>
        <button id={styles.profileButton} className={styles.button} onClick={() => navigate('/login', {replace: false})}>
          <div className={styles.buttonIconContainer}><IndividualIcon /></div>
          <p className={styles.buttonText}>个人中心</p>
        </button>
      </div>
      {/* 搜索栏 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="请输入查找古画信息" />
          <div className={styles.searchIconContainer} onClick={() => navigate('/search')}><MagnifierIcon /></div>
        </div>
      </div>

      {/* 导航栏 */}
      <div style={{ display:'flex', justifyContent: 'center' }}>
        <div className={styles.navigationContainer}>
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
    </div>
  )
}

export default TopPage;