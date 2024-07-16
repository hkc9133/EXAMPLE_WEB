export const userNicknameVal = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{4,12}$/;
export const userIdVal = /^[A-Za-z]{1}[a-z0-9]{5,11}$/;
export const userPasswordVal = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
export const emailVal = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const onlyNumber = /^\d+$/;
export const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
