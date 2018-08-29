const validateRegu = {
  phone:/^1[34578][0-9]{9}$/, 
  password:/^(?![^\d]+$)(?![^a-zA-Z]+$)[\da-zA-Z!.#$%^&*=_~@]{6,16}$/,
  code:/^[0-9]{6}$/,
  website:/^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
}

export default function Validate(type, s) {
  var regu = validateRegu[type];
  var re = new RegExp(regu);
  return re.test(s);
}