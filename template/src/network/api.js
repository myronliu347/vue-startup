import http from './http';

export async function getIndex () {
    const res = await network.get({
        url: `/api/v1/auth/captcha`,
        data: {}
    });
    return res;
}
