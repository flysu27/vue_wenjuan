<template>
  <div>
    <el-card
      class="box-card"
      :key="index"
      v-for="(item, index) in detail.questions"
      style="margin: 10px;"
    >
      <div slot="header" class="clearfix">
        <div class="questionTitle">
          <!--显示必填标识-->
          <span style="color: #F56C6C;">
            <span v-if="item.mustbe == '1'">*</span>
            <span v-else>&nbsp;</span>
          </span>
          {{ index + 1 + "." + item.qtitle }}
        </div>
        <div v-if="!isDisplay" style="float: right;">
          <el-button
            style="padding: 2px"
            type="text"
            v-if="index-1>=0"
            @click="moveQuestion(index,index-1)"
            >上移</el-button
          >
          <el-button
            style="padding: 2px"
            type="text"
             v-if="index+1<=detail.questions.length-1"
            @click="moveQuestion(index,index+1)"
            >下移</el-button
          >
          <el-button
            style="padding: 2px"
            type="text"
            @click="editorQuestion(item)"
            >编辑</el-button
          >
          <el-button
            style="padding: 2px;color: #F56C6C"
            type="text"
            @click="
              () =>
                deleteQuestion(
                  item.id,
                  index,
                  getPreNextUuid(index, detail.questions, true)
                )
            "
            >删除</el-button
          >
        </div>
      </div>
      <!--单选题展示-->
      <Radio :item="item" v-if="item.qtype == '1'" />
      <!--多选题展示-->
      <Checkbox :item="item" v-else-if="item.qtype == '2'" />
      <!--填空题展示-->
      <InputText :item="item" v-else-if="item.qtype == '3'" />
      <el-button
      icon="el-icon-circle-plus"
      @click="() => addQuestion(getPreNextUuid(index, detail.questions))"
      style="margin-top: 10px;"
      >添加题目</el-button>
    </el-card>
    
  </div>
</template>
<script>
import InputText from "./questions/inputText/InputText.vue";
import Checkbox from "./questions/checkbox/Checkbox.vue";
import Radio from "./questions/radio/Radio.vue";

export default {
  components: {
    Radio,
    Checkbox,
    InputText
  },
  props: {
    detail: Object | Array,
    isDisplay: Boolean,
    moveQuestion: Function,
    editorQuestion: Function,
    deleteQuestion: Function,
    addQuestion: Function,
    getPreNextUuid: Function
  },
  methods: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
.box-card {
  width: 100%;
  text-align: left;
}
</style>
