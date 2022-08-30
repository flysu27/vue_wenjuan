<!--
程序名：问卷设计主页面
功能：对问卷进行设计
-->
<template>
  <div :class="{ home: true, notclick: isChange }">
    <div class="m-opera" v-if="!isMobile && isPC">
      <el-tooltip
        class="item"
        effect="dark"
        content="创建问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-plus"
          type="text"
          class="rightButton"
          @click="addWjButtonClick"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="编辑问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-edit"
          type="text"
          class="rightButton"
          @click="editWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="nowSelect.status == 0 ? '发布问卷' : '暂停问卷'"
        placement="bottom"
      >
        <el-button
          :icon="
            nowSelect.status == 0 ? 'el-icon-video-play' : 'el-icon-video-pause'
          "
          type="text"
          class="rightButton"
          @click="pushWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="预览问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-view"
          type="text"
          class="rightButton"
          @click="previewWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="删除问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-delete"
          type="text"
          class="rightButton"
          @click="deleteWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="分享问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-share"
          type="text"
          class="rightButton"
          @click="shareWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="重置问卷人数"
        placement="bottom"
      >
        <el-button
          icon="el-icon-warning"
          type="text"
          class="rightButton"
          @click="zero"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
    </div>
    <div class="m-opera" v-if="(isMobile && !isPC) || wjList.length == 0">
      <el-tooltip class="item" effect="dark" content="返回问卷列表">
        <el-button type="text" @click.stop.prevent="backWenjuanList"
          >返回问卷列表</el-button
        >
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="创建问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-plus"
          type="text"
          class="rightButton"
          @click="addWjButtonClick"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="编辑问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-edit"
          type="text"
          class="rightButton"
          @click="editWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="nowSelect.status == 0 ? '发布问卷' : '暂停问卷'"
        placement="bottom"
      >
        <el-button
          :icon="
            nowSelect.status == 0 ? 'el-icon-video-play' : 'el-icon-video-pause'
          "
          type="text"
          class="rightButton"
          @click="pushWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="预览问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-view"
          type="text"
          class="rightButton"
          @click="previewWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="删除问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-delete"
          type="text"
          class="rightButton"
          @click="deleteWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="分享问卷"
        placement="bottom"
      >
        <el-button
          icon="el-icon-share"
          type="text"
          class="rightButton"
          @click="shareWj"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="重置问卷人数"
        placement="bottom"
      >
        <el-button
          icon="el-icon-warning"
          type="text"
          class="rightButton"
          @click="zero"
          :disabled="nowSelect.id == 0 || nowSelect.id == null"
        ></el-button>
      </el-tooltip>
    </div>
    <el-row>
      <el-col :span="6" class="leftNav">
        <!--操作栏-->
        <div class="opera">
          <el-tooltip
            class="item"
            effect="dark"
            content="创建问卷"
            placement="bottom"
          >
            <el-button
              icon="el-icon-plus"
              type="text"
              class="rightButton"
              @click="addWjButtonClick"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑问卷"
            placement="bottom"
          >
            <el-button
              icon="el-icon-edit"
              type="text"
              class="rightButton"
              @click="editWj"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="nowSelect.status == 0 ? '发布问卷' : '暂停问卷'"
            placement="bottom"
          >
            <el-button
              :icon="
                nowSelect.status == 0
                  ? 'el-icon-video-play'
                  : 'el-icon-video-pause'
              "
              type="text"
              class="rightButton"
              @click="pushWj"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="预览问卷"
            placement="bottom"
          >
            <el-button
              icon="el-icon-view"
              type="text"
              class="rightButton"
              @click="previewWj"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除问卷"
            placement="bottom"
          >
            <el-button
              icon="el-icon-delete"
              type="text"
              class="rightButton"
              @click="deleteWj"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="分享问卷"
            placement="bottom"
          >
            <el-button
              icon="el-icon-share"
              type="text"
              class="rightButton"
              @click="shareWj"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="重置问卷人数"
            placement="bottom"
          >
            <el-button
              icon="el-icon-warning"
              type="text"
              class="rightButton"
              @click="zero"
              :disabled="nowSelect.id == 0 || nowSelect.id == null"
            ></el-button>
          </el-tooltip>
        </div>

        <!--左侧导航栏-->
        <el-menu
          :default-active="defaultActive.toString()"
          v-loading="loading"
          class="menu"
        >
          <!--问卷列表-->
          <div
            style="width:100%;text-align: center;font-size: 15px;line-height: 20px;margin-top: 20px;color: #303133"
            v-if="nowSelect.id == 0 || nowSelect.id == null"
          >
            点击上方&nbsp;+&nbsp;创建第一个问卷
          </div>
          <el-menu-item
            style="height:auto;"
            v-for="(item, index) in wjList"
            :key="index"
            :index="(index + 1).toString()"
            @click="wjClick(item.wenjuan_id, index)"
          >
            <div>
              <i class="el-icon-tickets"></i>
              <span slot="title" style="display: inline-block">
                <span
                  style="color: #F56C6C;font-size: 13px;"
                  v-if="item.status == 0"
                >
                  <i
                    class="el-icon-link"
                    style="margin:0;font-size: 13px;color: #F56C6C;width:10px;"
                  ></i>
                  未发布
                </span>
                <span
                  style="color: #67C23A;font-size: 13px;"
                  v-if="item.status == 1"
                >
                  <i
                    class="el-icon-link"
                    style="margin:0;font-size: 13px;color: #67C23A;width:10px;"
                  ></i>
                  已发布
                </span>
                {{ item.title }}
              </span>
            </div>
            <div
              style="    display: flex;
    flex-wrap: wrap;
    gap: 10px;"
            >
              <div style="line-height:100%">
                <el-tag effect="dark" style="margin-left:5px"
                  >已填报:{{ item.personCount }}人</el-tag
                >
                <el-tag effect="dark" style="margin-left:5px"
                  >期望:{{ item.totalPerson }}人</el-tag
                >
                <el-tag effect="dark" style="margin-left:5px">
                  完成比例:{{
                    (item.personCount / item.totalPerson).toFixed(2) * 100
                  }}%</el-tag
                >
              </div>
              <div style="line-height:100%">
                <el-tag effect="dark" style="margin-left:5px"
                  >有效期: 【{{
                    new Date(parseInt(item.timeCreated))
                      | dateformat("YY-MM-DD HH:mm:ss")
                  }}】-【{{
                    new Date(parseInt(item.timeEnd))
                      | dateformat("YY-MM-DD HH:mm:ss")
                  }}】</el-tag
                >
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col
        :span="18"
        class="rightNav"
        v-bind:style="{ position: isAbl, display: isDisplay }"
      >
        <!--标签页-->
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="问卷设计" name="wjsj">
            <!--内容区域-->
            <div class="content">
              <div v-show="nowSelect.id == 0 || nowSelect.id == null">
                请先选择问卷
              </div>
              <design
                ref="design"
                v-show="nowSelect.id != 0 && nowSelect.id != null"
              ></design>
            </div>
          </el-tab-pane>
          <el-tab-pane label="回答统计" name="hdtj">
            <div class="content" ref="pdf">
              <div v-show="nowSelect.id == 0 || nowSelect.id == null">
                请先选择问卷
              </div>
              <data-show
                ref="dataShow"
                v-show="nowSelect.id != 0 && nowSelect.id != null"
              ></data-show>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!--添加问卷弹窗-->
    <el-dialog
      @close="closeDialog"
      :title="dialogTitle"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      class="dialog"
    >
      <el-form ref="form" :model="willAddWj" label-width="80px">
        <el-form-item label="问卷标题" style="width: 100%;" required>
          <el-input
            v-model="willAddWj.title"
            placeholder="请输入问卷标题(140字)"
            maxLength="140"
          ></el-input>
        </el-form-item>
        <el-form-item label="问卷描述" style="width: 100%;" required>
          <el-input
            v-model="willAddWj.intro"
            type="textarea"
            maxLength="255"
            placeholder="请输入问卷描述(255字)"
            rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束时间" style="width: 100%;" required>
          <el-date-picker
            required
            v-model="willAddWj.timeEnd"
            type="datetime"
            placeholder="选择日期时间"
            align="left"
            :picker-options="pickerOptions"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="期望填报人数"
          style="width: 100%;"
          required
          label-width="auto"
        >
          <el-input-number
            v-model="willAddWj.totalPerson"
            :min="1"
            label="期望填报人数"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="是否私密问卷"
          style="width: 100%;"
          required
          label-width="auto"
        >
          <el-switch v-model="isSecret"></el-switch>
        </el-form-item>
        <el-form-item
          label="是否登录填报"
          style="width: 100%;"
          required
          label-width="auto"
        >
          <el-switch v-model="isLoginUpload"></el-switch>
        </el-form-item>
        <el-form-item
          v-show="isSecret"
          label="提取码(4位)"
          style="width: 100%;"
          required
          label-width="auto"
        >
          <el-input-number
            v-model="willAddWj.code"
            :min="1000"
            :max="9999"
            label="提取码"
            required
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div style="width: 100%;text-align: right">
        <el-button style="margin-left: 10px;" @click="dialogShow = false"
          >取消</el-button
        >
        <el-button type="primary" style="margin-left: 10px;" @click="addWj"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!--分享问卷弹窗-->
    <el-dialog
      title="分享问卷"
      :visible.sync="shareDialogShow"
      :close-on-click-modal="true"
      class="dialog"
      @opened="makeQrcode"
    >
      <el-form ref="form" :model="shareInfo" label-width="80px">
        <el-form-item label="问卷链接" style="width: 100%;">
          <el-row>
            <el-col :span="16">
              <el-input v-model="shareInfo.url" readonly></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                style="margin-left: 5px;"
                v-clipboard:copy="shareInfo.url"
                v-clipboard:success="copySuccess"
                v-clipboard:error="copyError"
                >复制</el-button
              >
              <el-button style="margin-left: 5px;" @click="openShareUrl"
                >打开</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="二维码" style="width: 100%;">
          <canvas id="canvas" style="width: 150px;height: 150px;"></canvas>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  deleteW,
  addWenjuan,
  loginStatus,
  wenjuanList,
  updateW,
  setZero
} from "./api";
import Design from "./Design.vue";
import DataShow from "./DataShow.vue";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import QRCode from "qrcode";

export default {
  components: {
    ElButton,
    Design,
    QRCode,
    DataShow
  },
  data() {
    return {
      isChange: false,
      isPC: true,
      isFirst: false, // 第一次进入
      isMobile: false, // 控制移动端问卷显示与问卷列表
      isLoginUpload: false, // 登录填报
      dialogTitle: "添加问卷",
      isSecret: false, //填报密码
      startpage: 0, //页数
      pagesize: 100, // 一页问卷数
      createTimeRule: "desc",
      defaultActive: 1, //当前激活菜单
      activeName: "wjsj", //标签页当前选择项
      wjList: [], //问卷列表
      loading: false, //是否显示加载中
      dialogShow: false, //添加问卷弹窗是否显示
      shareDialogShow: false, //分享问卷弹窗是否显示
      tempDialog: false, //模板库弹窗是否显示
      tempData: [],
      tempDataCount: 0,
      tempLoading: false,
      tempSearchText: "",
      editing: false,
      willAddWj: {
        id: 0,
        title: "关于的问卷",
        flag: 0,
        intro: "感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！",
        totalPerson: 50, //期望人数
        timeEnd: "", // 结束时间
        code: "0"
      },
      shareInfo: {
        url: ""
      },
      // 快捷悬着时间
      pickerOptions: {
        // 当前时间前不可选
        disabledDate(date) {
          return date.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "半天后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 12);
              picker.$emit("pick", date);
            }
          },
          {
            text: "1天后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "2天后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 48);
              picker.$emit("pick", date);
            }
          },
          {
            text: "4天后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 96);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  mounted() {
    if (document.body.clientWidth <= 540) {
      this.isPC = false;
    }
    this.logincheck();
    this.getWjList();
  },
  watch: {
    isSecret: function(val) {
      if (val && !this.editing) {
        this.willAddWj.code = String(this.rand(1000, 9999));
      }
    }
  },
  computed: {
    //现在选中的问卷信息
    nowSelect() {
      let now = this.wjList[this.defaultActive - 1];

      if (this.wjList.length == 0) {
        return {
          id: null,
          title: null,
          status: null,
          intro: null,
          totalPerson: null, //期望人数
          timeEnd: null, // 结束时间
          code: null,
          mustLogin: null
        };
      }
      return {
        id: now.wenjuan_id,
        title: now.title,
        status: now.status,
        intro: now.intro,
        totalPerson: now.totalPerson, //期望人数
        timeEnd: now.timeEnd, // 结束时间
        code: now.code,
        mustLogin: now.mustLogin
      };
    },
    isAbl() {
      this.isChange = true;
      let timer = setTimeout(() => {
        this.isChange = false;
        timer = null;
      }, 500);
      return this.isPC ? "static" : this.isMobile ? "absolute" : "static";
    },
    isDisplay() {
      return this.isPC ? "block" : this.isMobile ? "block" : "none";
    }
  },
  methods: {
    zero() {
      this.$confirm(
        "确定重置" +
          this.nowSelect.title +
          "? 重置后已填报人数和简答内容不可恢复！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.loading = true;

        setZero(this.nowSelect.id).then(data => {
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "填报重置成功!"
            });
            this.loading = false;
            this.getWjList(this.nowSelect.id);
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
        });
      });
    },
    closeDialog() {
      this.isSecret = false;
      this.editing = false;
    },
    logincheck() {
      loginStatus({}).then(data => {
        // 本地调试读取uid失败
        this.$cookieStore.setCookie("userid2", parseInt(data.msg));
        if (data.code == 500) {
          this.$router.push({ path: "/login" });
        } else {
          this.$router.push({ path: "/home" });
        }
      });
    },
    //预览模板问卷
    lookTempWj(item) {
      let url = window.location.origin + "/tempdisplay/" + item.tempid; //问卷链接
      window.open(url);
    },
    //发布问卷/暂停问卷
    pushWj() {
      let status = 1;
      if (this.nowSelect.status == 1) status = 0;
      //console.log(this.nowSelect);
      updateW({
        id: this.nowSelect.id,
        msg: {
          status: status
        }
      }).then(data => {
        //console.log(data);
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: status == 1 ? "问卷发布成功！" : "问卷暂停成功！"
          });
          this.getWjList();
        } else {
          this.$message({
            type: "error",
            message: data.msg
          });
        }
      });
    },
    //分享问卷
    shareWj() {
      if (this.nowSelect.status == 0) {
        //问卷未发布
        this.$message({
          type: "error",
          message: "请先发布问卷能分享！"
        });
        return;
      }
      this.shareInfo.url =
        window.location.origin + "/display/" + this.nowSelect.id; //问卷链接
      this.shareDialogShow = true;
    },
    //生成二维码
    makeQrcode() {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.shareInfo.url);
    },
    //复制分享链接成功
    copySuccess(e) {
      //console.log(e);
      this.$message({
        type: "success",
        message: "已复制链接到剪切板"
      });
    },
    //复制分享链接失败
    copyError(e) {
      //console.log(e);
      this.$message({
        type: "error",
        message: "复制失败"
      });
    },
    //打开分享链接
    openShareUrl() {
      window.open(this.shareInfo.url);
    },
    //预览问卷
    previewWj() {
      let url = window.location.origin + "/display/" + this.nowSelect.id; //问卷链接
      window.open(url);
    },
    //编辑问卷
    editWj() {
      this.dialogShow = true;
      this.willAddWj = this.nowSelect;

      this.editing = true;
      this.isSecret = this.nowSelect.code != "0" ? true : false;
      this.isLoginUpload = this.nowSelect.mustLogin != "0" ? true : false;
      this.dialogTitle = "编辑问卷";
    },
    rand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    //添加问卷按钮点击
    addWjButtonClick() {
      this.dialogShow = true;
      this.dialogTitle = "添加问卷";
      this.isLoginUpload = false;
      this.isSecret = false;
      this.willAddWj = {
        id: null,
        title: null,

        intro: null,
        totalPerson: null, //期望人数
        timeEnd: null, // 结束时间
        code: null,
        isLoginUpload: null
      };
    },
    //添加问卷
    addWj() {
      //console.log(this.willAddWj.title);
      if (!this.willAddWj.title) {
        this.$message({
          type: "error",
          message: "标题不能为空"
        });
        return;
      }
      if (!this.willAddWj.timeEnd) {
        this.$message({
          type: "error",
          message: "结束时间不能为空"
        });
        return;
      }
      if (!this.willAddWj.intro) {
        this.$message({
          type: "error",
          message: "简介不能为空"
        });
        return;
      }
      if (this.isSecret && !this.willAddWj.code) {
        this.$message({
          type: "error",
          message: "需要填写验证码不能为空"
        });
        return;
      }
      // 公开 code 为 0
      if (!this.isSecret) {
        this.willAddWj.code = "0";
      }

      if (this.editing) {
        updateW({
          id: this.willAddWj.id,
          msg: {
            title: this.willAddWj.title,
            intro: this.willAddWj.intro,
            timeEnd: String(this.willAddWj.timeEnd),
            totalPerson: this.willAddWj.totalPerson,
            code: this.willAddWj.code,
            mustLogin: this.isLoginUpload ? "1" : "0"
          }
        }).then(data => {
          //console.log(data);
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: data.msg
            });
            this.getWjList(this.willAddWj.id);
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
        });
      } else {
        addWenjuan({
          title: this.willAddWj.title,
          intro: this.willAddWj.intro,
          timeCreated: String(new Date().getTime()),
          timeEnd: String(this.willAddWj.timeEnd),
          totalPerson: this.willAddWj.totalPerson,
          code: this.willAddWj.code,
          mustLogin: this.isLoginUpload ? "1" : "0",
          questions: []
        }).then(data => {
          //console.log(data);
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: data.msg
            });
            this.getWjList();
            this.defaultActive = 1;
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
        });
      }
      this.loading = false;
      this.dialogShow = false;
      this.willAddWj.title = "";
      this.editing = false;
      this.isSecret = false;
      this.isLoginUpload = false;
    },
    //获取问卷列表
    getWjList(wid = false) {
      this.loading = true;
      wenjuanList({
        startpage: this.startpage,
        pagesize: this.pagesize,
        createTime: this.createTimeRule,
        id: this.$cookieStore.getCookie("userid2")
      }).then(data => {
        this.wjList = data.msg;
        this.loading = false;
        //获取当前选中问卷题目
        this.lookDetail(wid ? wid : this.wjList[0].wenjuan_id);
      });
    },
    //删除问卷
    deleteWj() {
      this.$confirm(
        "确定删除" + this.nowSelect.title + "? 删除后不可恢复！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.loading = true;
        deleteW(this.nowSelect.id).then(data => {
          //console.log(data);
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.loading = false;
            this.getWjList();
            this.defaultActive = 1;
          } else {
            this.$message({
              type: "error",
              message: data.msg
            });
          }
        });
      });
    },
    // 返回问卷列表
    backWenjuanList() {
      this.isMobile = false;
    },
    //问卷点击
    wjClick(id, index) {
      this.defaultActive = (index + 1).toString();
      this.lookDetail(id);
    },
    //查看问卷详情
    lookDetail(id) {
      this.$refs.design.init(id, this.nowSelect.title, this.nowSelect.intro);
      if (this.isFirst && document.body.clientWidth < 540) {
        this.isMobile = true;
      } else {
        this.isFirst = true;
      }
      this.$refs.dataShow.dataAnalysis(id);
    }
  }
};
</script>
<style scoped>
.home {
  position: absolute;
  width: 100%;
  text-align: left;
}
.home .badgeItem {
  margin-top: 40px;
}
.content {
  padding: 20px;
  padding-right: 50px;
  height: calc(100vh - 175px);
  text-align: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
.menu {
  background-color: white;
  height: calc(100vh - 50px);
  overflow-x: scroll;
  overflow-y: scroll;
  left: 0;
}
.home .opera {
  position: relative;
  background-color: #fafafa;
  text-align: center;
  height: 40px;
}
.home .rightButton {
  font-size: 16px;
}
.home .addWjDiv {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.m-opera {
  display: none;
}
.notclick {
  pointer-events: none;
}
@media screen and (max-width: 540px) {
  .home .leftNav {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: scroll;
    position: relative;
  }
  .home .m-opera {
    display: flex;
    justify-content: space-evenly;
    z-index: 999;
  }
  .home .opera {
    display: none;
  }
  el-dialog {
    width: 100% !important;
  }
  .home .rightNav {
    width: 100%;
    height: calc(100vh - 50px);
  }
  .el-tabs {
    height: calc(100vh);
  }
  .home .content {
    padding: 0;
  }
}
</style>
