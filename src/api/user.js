import request from "@/utils/request";

export function login(data){
    return request({
        url:'/authorizations',
        method:'post',
        data
    })
}
/**
 * 发送验证码
 */
export const getSmsCode = mobile => {
    return request({
        url:`/sms/codes/${mobile}`,
        method:'get'
    })
}