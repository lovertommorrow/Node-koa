<template>
  <div>
    <el-dialog
      :visible="modifyUserInfo"
      width="25%"
      top="0"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleClose('CLOSE')"
    >
      <div slot="title" class="dialog_title">设置头像及用户名</div>
      <div class="user_content">
        <div class="upload_user_img">
          <div class="show" @click="handleUpload">
            <div class="upload_img">
              <i v-show="!cutImgNone" class="el-icon-camera"></i>
              <span v-show="!cutImgNone" class="upload_text">上传图片</span>
              <img
                v-show="cutImgNone"
                :src="cutUrl"
                alt="Picture"
                class="use_img"
              />
            </div>
            <div v-show="cutImgNone" class="cover_upload">
              <p>修改头像</p>
            </div>
          </div>
          <form
            enctype="multipart/form-data"
            class="handle_add"
            name="fileinfo"
            @click="handleUpload"
          >
            <input
              type="file"
              id="change"
              ref="inputFile"
              accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
              @change="handleChangeFile"
            />
          </form>
        </div>
        <el-input
          placeholder="请输入用户名"
          v-model="userName"
          class="user_name"
          clearable
        ></el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handleClose('SAVE')">确 定</el-button>
      </div>
    </el-dialog>

    <CutUserImgDialog
      v-if="cutUserImg"
      :cutUserImg="cutUserImg"
      :picValue="picValue"
      @CutImageDialogClose="CutImageDialogClose"
      @CutImgSave="CutImgSave"
    />
  </div>
</template>

<script>
import CutUserImgDialog from './CutUserImgDialog'
export default {
  name: 'ModifyUserInfo',
  props: {
    modifyUserInfo: {
      type: Boolean
    },
    userInfo: {
      type: Object
    }
  },
  components: { CutUserImgDialog },
  computed: {},
  data() {
    return {
      userName: '',
      cutUserImg: false,
      file_list: [],
      picValue: '',
      cutImgNone: false,
      cutUrl: '',
      imgFile: ''
    }
  },
  watch: {
    userInfo: {
      deep: true,
      immediate: true,
      handler(val) {
        if (Object.keys(val).length > 0) {
          this.cutUrl = val.pkpmPortraitUri
          this.userName = val.name
          if (val.pkpmPortraitUri.length > 0) {
            this.cutImgNone = true
          }
        }
      }
    }
  },
  methods: {
    handleClose(type) {
      this.$emit('ModifyUserInfoChange', {
        name: this.userName,
        img: this.imgFile,
        url: this.cutUrl,
        type: type
      })
    },
    handleUpload() {
      this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))
    },
    handleChangeFile(e) {
      this.picValue = ''
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.cutUserImg = true
      event.target.value = ''
    },
    CutImageDialogClose() {
      this.cutUserImg = false
    },
    CutImgSave(param) {
      this.cutUserImg = false
      this.cutUrl = param.url
      this.cutImgNone = true
      this.imgFile = param.file
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Source Han Sans CN;
  font-weight: 400;
  ::v-deep .el-dialog {
    margin: 0 !important;
  }
  ::v-deep .el-dialog__header {
    padding: 0;
    height: 41px;
    line-height: 41px;
    padding-left: 15px;
    font-size: 14px;
    color: #758086;
    border-bottom: 1px solid #e2e2e2;

    .el-dialog__headerbtn {
      top: 12px;
      right: 15px;
      font-size: 14px;
    }
  }
  ::v-deep .el-dialog__body {
    padding: 0;
    .user_content {
      text-align: center;
      margin-top: 30px;
      .upload_user_img {
        width: 124px;
        height: 124px;
        background: #f2f2f2;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        margin: 0 auto;
        text-align: center;
        .show {
          position: relative;
          .upload_img {
            display: flex;
            flex-direction: column;
            .el-icon-camera {
              font-size: 32px;
              color: #a5a5a5;
              margin-top: 35px;
            }
            .upload_text {
              font-size: 14px;
              font-weight: 400;
              color: #323a47;
              margin-top: 10px;
            }
            .use_img {
              width: 124px;
              height: 124px;
              vertical-align: top;
              border-radius: 50%;
            }
          }
          .cover_upload {
            width: 124px;
            height: 124px;
            position: absolute;
            border-radius: 50%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.55);
            opacity: 0;
            p {
              color: #fff;
              font-size: 14px;
              margin-top: 80px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #ffffff;
              text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.47);
            }
            &:hover {
              opacity: 1;
            }
          }
        }
        .handle_add {
          display: none;
        }
      }
      .user_name {
        margin-top: 30px;
        width: 142px;
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d1d3d4;
          border-radius: unset;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #323a47;
          text-align: center;
        }
        .el-input__inner ::-webkit-input-placeholder {
          color: #d4d6d7;
        }
      }
    }
  }
  ::v-deep .el-dialog__footer {
    .el-button {
      width: 120px;
      height: 40px;
      background: #2878ff;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      margin-top: 20px;
    }
  }
}
</style>
