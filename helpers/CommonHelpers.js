
import Colors from './Colors';
import ImageRotate from 'react-native-image-rotate';
import ImagePicker from 'react-native-image-crop-picker';

import {
    Image,
    ImageEditor
} from 'react-native';

function mapTemplate(info, width) {
    let template = {};
    template.info = info;
    const w = info.SpaceWidth + info.PaddingLeft + info.PaddingRight;
    const ratio = width / w;
    template.left = info.PaddingLeft * ratio;
    template.right = info.PaddingRight * ratio;
    template.top = info.PaddingTop * ratio;
    template.bottom = info.PaddingBottom * ratio;
    template.width = width - template.left - template.right;
    template.height = template.width * (info.SpaceHeight / info.SpaceWidth);
    return template;
}

function cropImage(uri, width, height, success: (data) => void) {
    ImagePicker.openCropper({
        path: uri,
        width: width,
        height: height,
        cropperActiveWidgetColor: Colors.activeLabel,
        cropperStatusBarColor: Colors.tint,
        cropperToolbarColor: Colors.tint,
        cropperToolbarTitle: 'CHỈNH SỬA HÌNH ẢNH',
        cropperChooseText: 'CẮT',
        cropperCancelText: "HUỶ"
    }).then(image => {
        console.log(image);
        success(image);
    });
}

function rotateImage(uri, success: (data) => void) {
    ImageRotate.rotateImage(uri, 90,
        (newUri) => {
            success(newUri);
        },
        (error) => {
          console.error(error);
        }
      );
}

function iosMapUri(uri, success: (data) => void, failure: (error) => void) {
    Image.getSize(uri, (width, height) => {
        const cropData = {
            offset: { x: 0, y: 0 },
            size: { width: width, height: height }
        }
        ImageEditor.cropImage(uri, cropData, (url) => {
            success(url);
        },
            (error) => {
                failure(error);
            });
    },
        (error) => {
            failure(error);
        });
}

export {
    mapTemplate,
    cropImage,
    rotateImage,
    iosMapUri
}