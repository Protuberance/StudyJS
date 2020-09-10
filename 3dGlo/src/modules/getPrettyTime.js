const getPrettyTime = (stringTime) => {
    const _stringTime = stringTime.toString();
    if (_stringTime.length < 2) {
        return '0' + _stringTime;
    } else {
        return _stringTime;
    }
};
export default getPrettyTime;