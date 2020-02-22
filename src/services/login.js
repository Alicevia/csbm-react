import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  console.log(params)
  return request('api/register/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
