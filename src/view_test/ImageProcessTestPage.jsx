import Compressor from 'compressorjs';
import caseImage1 from '../asset/case1/case_清晰版_new.png';
import axios from 'axios';
import { useState } from 'react';


const file_output = '../asset/test';

const ImageProcessTestPage = () => {

    // const handleFileProcessing = async () => {

    //     try {
    //         // 1. 将图片等比例缩放为 300x300 并编码为 Base64
    //         const resizedBase64 = await resizeImage(caseImage1, file_output, 0.1, 'png');
    //         console.log("Resized Base64:", resizedBase64);

    //         // 2. 将图片文件直接编码为 Base64（无需缩放）
    //         const base64Data = await encodeBase64(resizedBase64);
    //         console.log("Original Base64:", base64Data);

    //         // 3. 解码 Base64 为 Blob
    //         const decodedBlob = decodeBase64(base64Data, file_output);
    //         console.log("Decoded Blob:", decodedBlob);
    //         console.log("Image saved successfully.");

    //     } catch (error) {
    //         console.error("Error processing file:", error);
    //     }
    // };

    // 2. 将图片文件直接编码为 Base64（无需缩放）

    const [rawImg, setRawImg] = useState(null); //File
    const [resultImg, setResultImg] = useState(null); // url

    const imagePath = "../asset/case1/case_清晰版_new.png"; // 图片路径（在 public 文件夹中）

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // 获取用户选择的第一个文件
        if (file) {
            setRawImg(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // setBlobFileContent(reader.result); // 将文件内容保存到 state
            };
            reader.onerror = () => {
                console.error("文件读取失败");
            };
        }
    };


    const handleOnClick = () => {
        async function convertImageToFile() {
            try {
                const response = await fetch(caseImage1); // 请求图片资源
                const blob = await response.blob(); // 将响应转换为 Blob 对象
                const file = new File([blob], "case_清晰版_new.png", { type: blob.type }); // 创建 File 对象
                setRawImg(file); // 保存到状态中
                console.log("File object:", file);
            } catch (error) {
                console.error("Error converting image to File:", error);
            }
        }

        convertImageToFile();
    }

    const handleSubmit = () => {
        new Compressor(rawImg, {
            quality: 0.6,
            maxHeight: 1080,
            convertTypes: "image/jpg",
            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            success(result) {
                const formData = new FormData();

                // The third parameter is required for server
                formData.append('file', result, result.name);
                console.log('Load success', formData);
                // Send the compressed image file to server with XMLHttpRequest.
                // axios.post('/path/to/upload', formData).then(() => {
                //     console.log('Upload success');
                // });

                // 将 Blob 转换为 URL 并保存到状态
                const url = URL.createObjectURL(result);
                setResultImg(url);
            },
            error(err) {
                console.log(err.message);
            },
        });
    }


    return (
        <div>
            <h1>文件读取器</h1>
            <input type="file" onChange={handleFileChange} />
            <div>
                <h3>文件内容：</h3>
                {resultImg && <img alt='test' src={resultImg}></img>}
            </div>
            <button type="button" onClick={handleOnClick}>处理文件</button>
            <button type='button' onClick={handleSubmit}>提交处理</button>
        </div>
    )
}

export default ImageProcessTestPage;