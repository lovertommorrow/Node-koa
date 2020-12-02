<template>
  <el-dialog
    :visible.sync="cutUserImg"
    width="20%"
    top="0"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <div slot="title" class="dialog_title">上传头像</div>
    <div class="img_content">
      <img ref="image" :src="imgUrl" alt="userImg" />
    </div>
    <div slot="footer">
      <el-button type="primary" @click="handleSave">保存头像</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'ModifyUserInfo',
  props: {
    cutUserImg: {
      type: Boolean
    },
    picValue: {}
  },
  components: {},
  data() {
    return {
      cropper: '',
      croppable: false,
      imgUrl: ''
    }
  },
  watch: {
    picValue: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.imgUrl = this.getObjectURL(val)
          if (this.cropper) {
            this.cropper.replace(this.imgUrl)
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const self = this
      const image = this.$refs.image
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        center: false,
        initialAspectRatio: 1,
        background: false,
        zoomOnWheel: false,
        zoomable: false,
        ready: function() {
          self.croppable = true
        }
      })
    })
  },
  methods: {
    handleClose() {
      this.$emit('CutImageDialogClose')
    },
    //url 转化
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    handleSave() {
      if (!this.croppable) {
        return
      }
      const croppedCanvas = this.cropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
      })
      // 接口接收file内容的blob对象
      croppedCanvas.toBlob(data => {
        const file = new File([data], `${new Date().getTime()}.png`, {
          type: 'image/png'
        })
        this.$emit('CutImgSave', { url: croppedCanvas.toDataURL(), file: file })
      })
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
    .img_content {
      width: 240px;
      height: 240px;
      background: #e5e5e5;
      z-index: 9999;
      overflow: hidden;
      margin: 30px auto 0;
      img {
        width: 100%;
      }
    }
  }
  ::v-deep .el-dialog__footer {
    .el-button {
      width: 119px;
      height: 39px;
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
