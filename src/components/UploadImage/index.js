import React, { Component } from 'react';
import { Upload, Spin, Icon } from 'antd';
import ImgCrop from 'antd-img-crop/src';
import { APP_CONSTANTS, MODAL_TYPE } from '../../utils/constants';
import { parseImage } from '../../utils/images';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      this.setState({ loading: false });
      const { onChange } = this.props;
      if (onChange) {
        onChange(info.file.response.data);
      }
    }
  }

  render() {
    const { value, modalType, size, category } = this.props;

    const uploadEnabled = modalType !== MODAL_TYPE.VIEW;

    return (
      <ImgCrop>
        <Upload
          name="file"
          action={`${APP_CONSTANTS.API_BASE_URL}files/${category}`}
          listType="picture-card"
          onChange={this.onAvatarChange}
          showUploadList={false}
          openFileDialogOnClick={uploadEnabled}
        >
          <Spin spinning={this.state.loading}>
            <img
              style={{ width: size || 184, height: size || 184 }}
              alt={category}
              src={parseImage(value) || '/assets/default_avatar.png'}
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/assets/default_avatar.png';
              }}
            />
            {uploadEnabled && (
              <div style={{ height: 25, fontSize: 15, marginTop: 5 }}>
                <Icon type="upload" style={{ fontSize: 25, marginRight: 10 }} />
                Upload
              </div>
            )}
          </Spin>
        </Upload>
      </ImgCrop>
    );
  }
}

export default UploadImage;
