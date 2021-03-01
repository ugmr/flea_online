import { common, admin } from "./http";
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
// 登陆
export const login = (info) => admin.post("/login", info);
// 登出
export const logout = () => admin.post("/logout");
// 获取推广列表
export const getAdvertList = (query) => admin.get("/advert", { params: query });
// 添加推广
export const addAdvert = (advert) => admin.post("/advert", advert);
// 修改推广
export const editAdvert = (advert) => admin.put(`/advert/${advert._id}`, advert);
// 删除推广
export const deleteAdvert = (id) => admin.delete(`/advert/${id}`);
// 获取设置
export const getSetting = () => admin.get("/setting");
// 修改设置
export const editSetting = (setting) => admin.put(`/setting`, setting);
// 获取用户列表
export const getUserList = (query) => admin.get("/user", { params: query });
// 获取角色列表
export const getRoleList = (query) => admin.get("/role", { params: query });
// 获取权限列表
export const getPermissionList = (query) => admin.get("/permission", { params: query });
// 获取话题列表
export const getTopicList = (query) => admin.get("/topic", {params: query});
// 获取通知列表
export const getNoticeList = (query) => admin.get("/notice", {params: query});
// 添加通知
export const addNotice = (data) => admin.post("/notice", data);
// 删除通知
export const deleteNotice = (id) => admin.delete(`/notice/${id}`);
// 修改通知
export const eidtNotice = (id, data) => admin.put(`/notice/${id}`, data);
// 获取公告列表
export const getAnnouncementList = (query) => admin.get("/announcement", {params: query});
// 添加公告

export const getGoodList = (query) => admin.get("/goods", {params: query});

// 获取分类列表
export const getCategoryList = (query) => admin.get("/category", {params: query});
// 添加分类
export const addCategory = (data) => admin.post("/category", data);
export const deleteCategory = (id) => admin.delete(`/category/${id}`);
export const editCategory = (id, data) => admin.delete(`/category/${id}`, data);
