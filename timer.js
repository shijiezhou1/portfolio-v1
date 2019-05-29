function datetime_to_unix(datetime) {
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
}

function unix_to_datetime(unix) {
    var now = new Date(parseInt(unix) * 1000);
    return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

var datetime = '2012-11-16 10:36:50';
var unix = datetime_to_unix(datetime);
document.write(datetime + ' 转换后的时间戳为: ' + unix + ' ');

var unix = 1353033300;
var datetime = unix_to_datetime(unix);
document.write(unix + ' 转换后的日期为: ' + datetime);

document.getElementById("ans").innerHTML = unix + ' 转换后的日期为: ' + datetime;