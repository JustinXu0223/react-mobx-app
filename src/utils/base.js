/**
 * @component base.js
 * @description 基础方法库
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import moment from 'moment';
import { NativeModules, Platform } from 'react-native';
import { pinyin } from './pinyin';

export const formatDateType = 'YYYY-MM-DD';
// 格式化
export function formatDateByMoment(str, formatType = 'YYYY-MM-DD HH:mm:ss') {
  if (!str) return null;
  if (typeof str === 'string') {
    if (Number.isNaN(Number(str))) return str;
    str = Number(str);
  }
  return moment(str).format(formatType);
}

// nav go back
export function nativeGoBack() {
  try {
    NativeModules.system.navTo('BACK');
  } catch (e) {
    console.log("system don't support navTo");
  }
}

// call telPhone
export function nativeCallPhone(telPhone) {
  console.log(`@phone:${telPhone}`);
  if (!telPhone) return;
  try {
    NativeModules.system.call(telPhone);
  } catch (e) {
    console.log("system don't support call");
  }
}

// 递归生产二维数组
export function getArrayByPid(list = [], pid) {
  return list.filter(obj => obj.parentId === pid).map(obj => ({
    ...obj,
    children: getArrayByPid(list, obj.id),
  }));
}

// 格式化团队list
export function formatMemberList(list) {
  if (!Array.isArray(list)) {
    throw new Error('params must be array');
  }
  if (!list.length) return list;
  return list.filter(value => !!value.userId).map((value) => {
    if (!value.userName && (value.firstName || value.lastName)) {
      value.userName = `${value.lastName}${value.firstName}`;
    }
    const nameChar = pinyin.getFullChars(value.userName);
    const sortLetters = pinyin.getCamelChars(nameChar).substring(0, 1).toUpperCase();
    if (/^[A-Z]$/.test(sortLetters)) {
      value.sortLetters = sortLetters;
    } else {
      value.sortLetters = '#';
    }
    value.actived = false;
    return value;
  });
}

/**
 * 对象转换成 key value数组
 * @param {*} obj
 */
export const mapToArray = (obj, name = 'name') => Object.keys(obj).map(key => ({ key, [name]: obj[key] }));


// 格式化地址
export function formatLocationMap(location = {}, needAddress = true) {
  if (!Object.keys(location).length || !location) return null;
  const {
    // countryName,
    address,
    provinceName,
    cityName,
    districtName,
  } = location;
  const list = [];
  // if (countryName) list.push(countryName);
  if (provinceName) list.push(provinceName);
  if (cityName) list.push(cityName);
  if (districtName) list.push(districtName);
  if (address && needAddress) list.push(address);
  if (!list.length) return null;
  return list.join('-');
}

// 兼容TextInput value 不识别number
export function formatNumberToString(obj) {
  const hashMap = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'number') {
      hashMap[key] = String(obj[key]);
    } else {
      hashMap[key] = obj[key];
    }
  });
  return hashMap;
}

// 处理image格式
export function formatPickerImage(image) {
  const { path = '' } = image;
  return {
    file: {
      uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
      type: 'multipart/form-data',
      name: path.substr(path.lastIndexOf('/') + 1),
    },
    path,
  };
}

// 去除object中的'', null
export function filterObject(obj) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key] && obj[key] !== 0) {
      delete obj[key];
    }
  });
  return obj;
}
