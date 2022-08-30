<!--
程序名：数据分析页面
功能：对问卷调查结果的数据进行分析并用图表可视化展示
-->
<template>
  <div
    id="pdfDom"
    class="Count"
    v-loading="loading"
    element-loading-text="生成中..."
    style="width:100%"
  >
    <div v-if="!(detail.length == 0)" class="opera-buttons">
      <el-button type="primary" size="mini" @click="exportJSON"
        >导出json</el-button
      >
      <el-button type="primary" size="mini" @click="simData">{{
        isSimData ? "正常数据" : "模拟数据"
      }}</el-button>
    </div>
    <div v-if="detail.length == 0">暂时没有数据</div>
    <el-card class="question" :key="index" v-for="(item, index) in detail">
      <div slot="header" class="clearfix">
        <span style="color: #F56C6C;">
          <span v-if="item.mustbe == '1'">*</span>
          <span v-else>&nbsp;</span>
        </span>
        <span
          >{{ index + 1 + "." + item.qtitle }}

          <el-tag
            effect="dark"
            type="success"
            v-if="isSimData && item.mustbe != '1'"
          >
            填报人数:
            <el-input-number
              v-model="item.personCount"
              :min="item.minPC"
              :max="item.maxPC"
              label="模拟填报人数"
            ></el-input-number
            >人
          </el-tag>
          <el-tag effect="dark" type="success" v-else>
            填报人数: {{ item.personCount }}人
          </el-tag>
          <el-tag effect="dark" type="warning">
            {{
              item.qtype == "1" ? "单选" : item.qtype == "2" ? "多选" : "填空"
            }}
          </el-tag>
        </span>
      </div>
      <!--如果数据库中的问题类型为单项选择或者多项选择-->
      <!--则将数据库中的数据以表格、柱状图、饼状图、圆环图、条形图的方式进行展示-->
      <div v-if="item.qtype == '1' || item.qtype == '2'">
        <el-table
          size="small"
          :data="item.options"
          style="width: 100%"
          stripe
          class="table"
        >
          <el-table-column prop="title" label="选项"></el-table-column>
          <el-table-column prop="personCount" label="数量" width="180">
            <template slot-scope="scope">
              <el-input-number
                @change="handleChange(index, scope.$index)"
                v-if="isSimData"
                v-model="scope.row.personCount"
                :min="0"
                :max="item.maxPC"
                label="模拟填报人数"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="percent"
            label="占比"
            width="180"
          ></el-table-column>
        </el-table>

        <el-table-column class="tableShow">
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="changeValue(index, 1)"
            >柱状图</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="changeValue(index, 2)"
            >饼状图</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="changeValue(index, 3)"
            >圆环图</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="changeValue(index, 4)"
            >条形图</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="changeValue(index, 0)"
            >隐藏图表</el-button
          >
        </el-table-column>

        <div :id="'img' + index" class="img" v-show="visible[index] == 1"></div>
        <div
          :id="'bing' + index"
          class="bing"
          v-show="visible[index] == 2"
        ></div>
        <div
          :id="'ring' + index"
          class="ring"
          v-show="visible[index] == 3"
        ></div>
        <div :id="'tz' + index" class="tz" v-show="visible[index] == 4"></div>
      </div>
      <!--如果数据库中的问题类型为text类型则将数据以弹窗表格的形式进行显示-->

      <div
        style="display: flex; flex-wrap: wrap;
    gap: 10px;"
        v-if="item.qtype == '3' && item.content"
      >
        <div
          v-for="(jdItem, jdIndex) in item.content.split('&$%').slice(0, -1)"
          :key="jdIndex"
          style=""
        >
          <VoiceRecord
            justPlay="true"
            v-if="jdItem.startsWith('upload')"
            :voicedown="[jdItem.replace('upload', '')]"
          />
          <div v-if="!jdItem.startsWith('upload')" class="jiandaanswer">
            {{ jdItem }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
import FileSaver from "file-saver";
import { getWenjuan } from "./api";
import VoiceRecord from "./VoiceRecord/VoiceRecord.vue";
export default {
  data() {
    return {
      jsonContent: "",
      dialogTableVisible: false,
      visible: [],
      loading: false,
      detail: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      questionId: 0,
      wjId: 0,
      exportExcelLoading: false,
      answerText2ExcelQeustionId: 0,
      isSimData: false,
      wTotalCount: 0
    };
  },
  components: {
    VoiceRecord
  },
  mounted() {
    this.dataAnalysis();
  },
  methods: {
    handleChange(qid, oid) {
      let cur = this.detail[qid].options[oid];
      cur.percent = this.getPercent(
        parseInt(cur.personCount),
        parseInt(this.detail[qid].maxPC)
      );
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    simData() {
      this.isSimData = !this.isSimData;

      this.detail.forEach(item => {
        item.maxPC = this.wTotalCount;
        item.minPC = 0;
        if (item.mustbe == "1") {
          item.minPC = this.wTotalCount;
        }
        let curTotal = item.maxPC;
        let tmp = 0;
        for (let i = 0; i < item.options.length; i++) {
          if (i < item.options.length - 1) {
            tmp = this.randomNum(0, curTotal);
            curTotal -= tmp;
          } else {
            tmp = curTotal;
          }
          item.options[i].personCount = tmp;
          item.options[i].percent = this.getPercent(
            parseInt(tmp),
            parseInt(item.maxPC)
          );
        }

        item.personCount = this.wTotalCount;
      });
    },
    exportJSON() {
      // 将json转换成字符串
      const data = JSON.stringify(this.jsonContent);
      const blob = new Blob([data], { type: "" });
      FileSaver.saveAs(blob, this.jsonContent.title + ".json");
    },

    getPercent(count, total) {
      let res = (count / total).toFixed(2);

      return (isNaN(res) ? 1 : res) * 100 + "%";
    },

    answerText2Excel(questionId) {
      this.answerText2ExcelQeustionId = questionId;
      designOpera({
        opera_type: "answer_text_to_excel",
        questionId: questionId
      }).then(data => {
        this.doDownload(data.b64data, data.filename, "excel");
        this.answerText2ExcelQeustionId = 0;
      });
    },

    //切换图表
    changeValue(num, value) {
      this.$set(this.visible, num, value);
      if (value == 1) {
        this.setImg(num);
      } else if (value == 2) {
        this.setPar(num);
      } else if (value == 3) {
        this.setRing(num);
      } else if (value == 4) {
        this.setTz(num);
      }
    },
    //请求后端数据
    dataAnalysis(id) {
      this.loading = true;
      this.detail = [];
      this.wjId = id;
      getWenjuan({
        id: this.wjId
      }).then(data => {
        this.jsonContent = data.msg;
        this.detail = data.msg.questions;
        let that = this;
        this.wTotalCount = parseInt(this.jsonContent.totalPerson);
        this.detail && this.detail.map(function(item, index) {
          item.options.map(function(item2) {
            item2["percent"] = that.getPercent(
              item2.personCount,
              item.personCount
            );
            return item2;
          });

          return item;
        });
        this.visible = [];
        this.loading = false;
      });
      this.dialogShow = false;
    },
    getTitleArr(arr) {
      let res = [];
      arr.forEach(item => {
        res.push(item.title);
      });
      return res;
    },
    getPersonCount(arr) {
      let res = [];
      arr.forEach(item => {
        res.push(item.personCount);
      });
      return res;
    },
    resizeMyChartContainer(f_canvas) {
      if (window.innerWidth <= 540) {
        f_canvas.style.height = window.innerHeight * 0.65 + "px";
        f_canvas.style.width = window.innerWidth * 0.75 + "px";
      }
      return f_canvas;
    },
    //柱状图
    setImg(id) {
      let myChart = echarts.init(
        this.resizeMyChartContainer(document.getElementById("img" + id))
      );
      var option = {
        tooltip: {},
        legend: {
          data: ["数量"]
        },
        dataset: {
          dimensions: ["options", "personCount", "percent"],
          source: this.detail[id]
        },
        xAxis: {
          type: "category",
          data: this.getTitleArr(this.detail[id].options)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量：",
            type: "bar",
            barWidth: 30,
            color: "deepskyblue",
            data: this.getPersonCount(this.detail[id].options)
          }
        ]
      };
      myChart.setOption(option);
    },
    getParOptionData(arr) {
      let res = [];
      arr.forEach(item => {
        res.push(item.title);
      });
      return res;
    },
    getParSeriesData(arr) {
      let res = [];
      arr.forEach(item => {
        res.push({ value: item.personCount, name: item.title });
      });
      return res;
    },
    // 饼状图
    setPar(id) {
      let myChart = echarts.init(
        this.resizeMyChartContainer(document.getElementById("bing" + id))
      );
      var option = {
        tooltip: {},

        color: ["#409EFF", "#FFB54D", "#FF7466", "#44DB5E"],
        legend: {
          orient: "vertical",
          left: "left",
          data: this.getParOptionData(this.detail[id].options)
        },
        series: [
          {
            name: "统计结果：",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.getParSeriesData(this.detail[id].options),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    // 圆环图
    setRing(id) {
      let myChart = echarts.init(
        this.resizeMyChartContainer(document.getElementById("ring" + id))
      );
      var option = {
        tooltip: {},

        color: ["#409EFF", "#FFB54D", "#FF7466", "#44DB5E"],
        legend: {
          orient: "vertical",
          left: "left",
          data: this.getParOptionData(this.detail[id].options)
        },
        series: [
          {
            name: "数量：",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: this.getParSeriesData(this.detail[id].options),
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    //圆环图
    setTz(id) {
      let myChart = echarts.init(
        this.resizeMyChartContainer(document.getElementById("tz" + id))
      );
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#409EFF", "#FFB54D", "#FF7466", "#44DB5E"],
        legend: {
          data: ["填报"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.getTitleArr(this.detail[id].options)
        },
        series: [
          {
            name: "填报",
            type: "bar",
            data: this.getPersonCount(this.detail[id].options)
          }
        ]
      };

      myChart.setOption(option);
    },
    //文本内容
    setText(id) {
      return {
        resule: this.detail[id].result
      };
    }
  }
};
</script>
<style scoped>
.jiandaanswer {
  background-color: #409eff;
  padding: 5px;
  color: #fff;
  padding: 0 10px;
  line-height: 30px;
  border-radius: 4px;
  word-break: break-all;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
}
.Count {
  height: 100vh;
}
.Count .question {
  max-width: 800px;
  width: 80%;
  display: inline-block;
  margin: 5px;
  text-align: left;
}
.tableShow {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.tableShow .el-button {
  margin-top: 10px;
}
.Count .img {
  width: 500px;
  height: 300px;
}
.Count .bing {
  width: 500px;
  height: 300px;
}
.Count .ring {
  width: 500px;
  height: 300px;
}
.Count .tz {
  width: 500px;
  height: 300px;
}
.opera-buttons {
  padding: 10px;
}
.tableShow {
}
</style>
