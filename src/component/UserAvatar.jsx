import React from "react";
import PropTypes from "prop-types";
import styles from "./css/UserAvatar.module.css";

import DefaultAvatar from "../asset/DefaultAvatar2x.png";

const UserAvatar = ({ diameter = "calc(6.3vw + 11.2vh)", avatar, style }) => {
  // 默认参数

  const defaultBorderWidth = "calc(0.104167vw + 0.185185vh)";

  // 头像样式
  const avatarStyle = {
    width: diameter,
    aspectRatio: 1,
    borderWidth: defaultBorderWidth,
    margin: defaultBorderWidth,
    backgroundColor: "#997E60",
    borderColor: "#FEF6E1",
    ...style,
  };

  // 判断头像是否为空
  const imageUrl = avatar || DefaultAvatar;

  return (
    <div className={styles.avatarContainer} style={avatarStyle}>
      <img
        className={styles.avatarImage}
        src={imageUrl}
        alt="用户头像"
        onError={(e) => (e.target.src = DefaultAvatar)} // 处理无效图像链接
      />
    </div>
  );
};

UserAvatar.propTypes = {
  radius: PropTypes.string,
  avatar: PropTypes.string,
};

export default UserAvatar;
