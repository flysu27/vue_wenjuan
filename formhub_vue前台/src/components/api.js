/**
 * 程序名：api接口
 * 功能：与后端通讯的api接口定义
 */
import axios from "axios";

//用户是否注册
export const isRegister = data => {
  return axios({
    method: "get",
    url: "/api/login",
    headers: {
      username: data.username
    }
  }).then(res => res.data);
};
// 用户注册
export const userAdd = data => {
  return axios({
    method: "post",
    url: "/api/user",
    headers: {
      username: data.username,
      password: data.password,
      verify: data.verify
    }
  }).then(res => res.data);
};
// 用户登录
export const userLogin = data => {
  return axios({
    method: "post",
    url: "/api/login",
    headers: {
      username: data.username,
      password: data.password,
      verify: data.verify
    }
  }).then(res => res.data);
};
// 用户登录状态检测
export const loginStatus = data => {
  return axios({
    method: "put",
    url: "/api/login"
  }).then(res => res.data);
};
// 问卷列表
export const wenjuanList = data => {
  return axios({
    method: "GET",
    url: "/api/plaza/id/" + data.id,
    headers: {
      startpage: data.startpage ? data.startpage : 0,
      pagesize: data.pagesize ? data.pagesize : 20,
      createTime: data.createTime ? data.createTime : "desc"
    }
  }).then(res => res.data);
};
// 上传答卷
export const uploadW = (data, wid, isUpload = false) => {
  let wj = { data: JSON.stringify(data) };
  return axios({
    method: "POST",
    url: "/api/wenjuan/id/" + wid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      formhub: isUpload
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(wj)
  }).then(res => res.data);
};
export const upfile = data => {
  const form = new FormData();
  form.append("upfile", data);

  return axios.post("/api/file", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const downfile = async filename => {
  return await axios
    .get("/api/file", {
      headers: {
        filename
      }
    })
    .then(data => {
      const newbolb = new Blob([data], {
        type: "audio/wav"
      });
      return new File([newbolb], new Date().getTime() + ".wav");
    });
};

// 人数0
export const setZero = wid => {
  return axios({
    method: "DELETE",
    url: "/api/wenjuan/id/" + wid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      isZero: true
    }
  }).then(res => res.data);
};
// 单个问卷
export const getWenjuan = (data, code = "0") => {
  
  let url = "/api/wenjuan/id/" + data.id;
  return axios({
    method: "GET",
    url,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      code: code
    }
  }).then(res => res.data);
};
// 发起xxx-formdata 格式请求
function dataFormat(data) {
  let ret = "";
  for (let it in data) {
    ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
  }
  return ret;
}
// 添加问题及选项
import { uuid } from "../assets/uuidgen";

export const addQuestion = (data, wid) => {
  // 当前问题唯一uuid
  data.curQuesUuid = uuid();
  /*
  {
    // 前后题目uuid
     uuids: {
        prevQuesUuid: this.willAddQuestion.prevQuesUuid,
        nextQuesUuid: this.willAddQuestion.nextQuesUuid
     },
     questions: [newItem]
  },
  */
  let wj = { data: JSON.stringify(data) };
  
  return axios({
    method: "PUT",
    url: "/api/wenjuan/id/" + wid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      ques: true
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(wj)
  }).then(res => res.data);
};
// 添加问卷
export const addWenjuan = data => {
  let wj = { data: JSON.stringify(data) };
  return axios({
    method: "POST",
    url: "/api/wenjuan",
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(wj)
  }).then(res => res.data);
};
// 修改问卷基本信息
export const updateW = data1 => {
  // alert(data1.id);
  let wj = { data: JSON.stringify(data1.msg) };
  return axios({
    method: "PUT",
    url: "/api/wenjuan/id/" + data1.id,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(wj)
  }).then(res => res.data);
};
// 删除问卷
export const deleteW = id => {
  // alert(id);
  return axios({
    method: "delete",
    url: "/api/wenjuan/id/" + id,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
    //transformRequest允许在向服务器发送前，修改请求数据
  }).then(res => res.data);
};
// 修改问题基本信息
export const updateQ = (data1, qid) => {
  let q = { data: JSON.stringify(data1.questions) };
  return axios({
    method: "PUT",
    url: "/api/question/id/" + qid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(q)
  }).then(res => res.data);
};
// 移动问题
export const moveQ = (qid, uuidInfo, moveToUuidInfo) => {
  
  let q = { data: JSON.stringify({uuidInfo, moveToUuidInfo}) };
  return axios({
    method: "PUT",
    url: "/api/question/id/" + qid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(q)
  }).then(res => res.data);
}
// 删除问题
export const deleteQ = (id, uuids) => {
  return axios({
    method: "delete",
    url: "/api/question/id/" + id,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    data: dataFormat({data: JSON.stringify(uuids)})
    //transformRequest允许在向服务器发送前，修改请求数据
  }).then(res => res.data);
};
// 添加选项
export const addOptions = (data1, qid) => {
  let q = { data: JSON.stringify(data1) };
  return axios({
    method: "post",
    url: "/api/option/id/" + qid,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(q)
  }).then(res => res.data);
};
// 删除选项
export const deleteO = id => {
  return axios({
    method: "delete",
    url: "/api/option/id/" + id,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
    //transformRequest允许在向服务器发送前，修改请求数据
  }).then(res => res.data);
};
// 跟新选项
export const updateO = (data1, id) => {
  let q = { data: JSON.stringify(data1) };
  return axios({
    method: "PUT",
    url: "/api/option/id/" + id,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    //transformRequest允许在向服务器发送前，修改请求数据
    data: dataFormat(q)
  }).then(res => res.data);
};
