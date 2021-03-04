import { common, admin } from "./http";
import "@/mock/mock";
// 上传图片
export const upload = (image) => {
  const formData = new FormData();
  formData.append("imgData", image, image.name);
  return common.post("/upload", formData, {
    headers: {
      'Content-Type': 'application/form-data'
    }}
  );
}
// 验证码
export const verify = (data) => common.post("/check_sms", data);
// 重制密码
export const reset = (data) => common.post("/reset", data);
// 登陆
export const login = (info) => admin.post("/login", info);
// 登出
export const logout = () => admin.post("/logout");
// 推广
export const getAdvertList = (query) => admin.get("/advert", { params: query });
export const addAdvert = (advert) => admin.post("/advert", advert);
export const editAdvert = (advert) => admin.put(`/advert/${advert._id}`, advert);
export const deleteAdvert = (id) => admin.delete(`/advert/${id}`);
// 设置
export const getSetting = (query) => admin.get("/setting", {params: query});
export const editSetting = (setting) => admin.put(`/setting`, setting);
// 获取用户列表
export const getUserList = (query) => admin.get("/user", { params: query });
// 获取用户信息
export const getUser = (id) => admin.get("/user/" + id);
// 修改用户信息
export const updatePassword = (password) => admin.post("/update_password", password);
// 修改用户信息
export const updateProfile = (profile) => admin.post("/update_profile", profile)

// 获取角色列表
export const getRoleList = (query) => admin.get("/role", { params: query });
// 获取权限列表
export const getPermissionList = (query) => admin.get("/permission", { params: query });
// 获取话题列表
export const getTopicList = (query) => admin.get("/topic", {params: query});
// 通知
export const getNoticeList = (query) => admin.get("/notice", {params: query});
export const addNotice = (data) => admin.post("/notice", data);
export const deleteNotice = (id) => admin.delete(`/notice/${id}`);
export const editNotice = (id, data) => admin.put(`/notice/${id}`, data);
// 获取公告列表
export const getAnnouncementList = (query) => admin.get("/announcement", {params: query});
export const deleteAnnouncement = (id) => admin.delete("/announcement/" + id);
export const addAnnouncement = (data) => admin.post("/announcement", data)
export const updateAnnouncement = (id, data) => admin.put("/announcement/" + id, data);

export const getGoodList = (query) => admin.get("/goods", {params: query});
// 获取分类列表
export const getCategoryList = (query) => admin.get("/category", {params: query});
// 添加分类
export const addCategory = (data) => admin.post("/category", data);
export const deleteCategory = (id) => admin.delete(`/category/${id}`);
export const editCategory = (id, data) => admin.delete(`/category/${id}`, data);


// 获取热搜列表
export const getHotSearchList = () => admin.get("/hot_search");
export const getHotPostList = () => admin.get("/hot_post");

// 举报信息
export const getReportList = () => admin.get("/report");

// 帖子
export const getPostList = (query) => admin.get("/post", {params: query});
export const deletePost = (id) => admin.delete("/post/" + id);
export const addPost = (data) => admin.post("/post", data)
export const updatePost = (id, data) => admin.put("/post/" + id, data);
