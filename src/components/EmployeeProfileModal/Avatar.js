import React, { Component } from 'react';
import { Upload, Spin } from 'antd';
import { connect } from 'dva';
import ImgCrop from 'antd-img-crop/src';
import styles from './index.less';
import { APP_CONSTANTS, PROFILE_MODAL_TYPE } from '../../utils/constants';
import { parseImage } from '../../utils/images';

class Avatar extends Component {
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
    const { name, value, people: { profileModalType } } = this.props;

    const uploadDisabled = profileModalType !== PROFILE_MODAL_TYPE.VIEW;

    return (
      <ImgCrop>
        <Upload
          name="file"
          action={`${APP_CONSTANTS.API_BASE_URL}files/avatar`}
          listType="picture-card"
          onChange={this.onAvatarChange}
          showUploadList={false}
          openFileDialogOnClick={uploadDisabled}
        >
          <Spin spinning={this.state.loading}>
            <img
              className={styles.avatar}
              alt={`${name} profile`}
              src={parseImage(value) || '/assets/default_avatar.png'}
              onError={e => {
            e.target.onerror = null;
            e.target.src = '/assets/default_avatar.png';
          }}
            />
          </Spin>
        </Upload>
      </ImgCrop>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Avatar);
