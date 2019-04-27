function changeColor( _width , _height , str  , ctx , imgData) {
    console.log(imgData);
    let imageData =imgData;
    let data = imgData.data;
    switch (str) {
        case "灰度":
            for(var i = 0; i < data.length; i+=4) {
                var grey = (data[i] + data[i+1] + data[i+2]) / 3;
                data[i] = data[i+1] = data[i+2] = grey;
            }
            break;
        case "黑白":
            for(var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i+1] + data[i+2]) / 3;
                data[i] = data[i+1] = data[i+2] = avg >= 100 ? 255 : 0;
            }
            break;
        case "反向":
            for(var i = 0; i < data.length; i+= 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            break;
        case "去色":
            for(var i = 0; i < data.length; i++) {
                var avg = Math.floor((Math.min(data[i], data[i+1], data[i+2]) + Math.max(data[i], data[i+1], data[i+2])) / 2 );
                data[i] = data[i+1] = data[i+2] = avg;
            }
            break;
        case "单色":
            for(var i = 0; i < imgData.height * imgData.width; i++) {
                data[i*4 + 2] = 0;
                data[i*4 + 1] = 0;
            }
            break;
        case "高斯":
            function gaussBlur(imgData, radius, sigma) {
            var pixes = imgData.data,
                height = imgData.height,
                width = imgData.width,
                radius = radius || 5;
            sigma = sigma || radius / 3;

            var gaussEdge = radius * 2 + 1;

            var gaussMatrix = [],
                gaussSum = 0,
                a = 1 / (2 * sigma * sigma * Math.PI),
                b = -a * Math.PI;

            for(var i = -radius; i <= radius; i++) {
                for(var j = -radius; j <= radius; j++) {
                    var gxy = a * Math.exp((i * i + j * j) * b);
                    gaussMatrix.push(gxy);
                    gaussSum += gxy;
                }
            }
            var gaussNum = (radius + 1) * (radius + 1);
            for(var i = 0; i < gaussNum; i++) {
                gaussMatrix[i] /= gaussSum;
            }

            for(var x = 0; x < width; x++) {
                for(var y = 0; y < height; y++) {
                    var r = g = b = 0;
                    for(var i = -radius; i<=radius; i++) {
                        var m = handleEdge(i, x, width);
                        for(var j = -radius; j <= radius; j++) {
                            var mm = handleEdge(j, y, height);
                            var currentPixId = (mm * width + m) * 4;
                            var jj = j + radius;
                            var ii = i + radius;
                            r += pixes[currentPixId] * gaussMatrix[jj * gaussEdge + ii];
                            g += pixes[currentPixId + 1] * gaussMatrix[jj * gaussEdge + ii];
                            b += pixes[currentPixId + 2] * gaussMatrix[jj * gaussEdge + ii];
                        }
                    }
                    var pixId = (y * width + x) * 4;

                    pixes[pixId] = ~~r;
                    pixes[pixId + 1] = ~~g;
                    pixes[pixId + 2] = ~~b;
                }
            }
            imgData.data = pixes;
            return imgData;
        }
            gaussBlur(imgData,8,2);
            function handleEdge(i, x, w) {
            var m = x + i;
            if(m < 0) {
                m = -m;
            } else if(m >= w) {
                m = w + i -x;
            }
            return m;
        }
            break;
        case "怀旧":
            for(var i = 0; i < imgData.height * imgData.width; i++) {
                var r = imgData.data[i*4],
                    g = imgData.data[i*4+1],
                    b = imgData.data[i*4+2];

                var newR = (0.393 * r + 0.769 * g + 0.189 * b);
                var newG = (0.349 * r + 0.686 * g + 0.168 * b);
                var newB = (0.272 * r + 0.534 * g + 0.131 * b);
                var rgbArr = [newR, newG, newB].map((e) => {
                    return e < 0 ? 0 : e > 255 ? 255 : e;
                });
                [imgData.data[i*4], imgData.data[i*4+1], imgData.data[i*4+2]] = rgbArr;
            }
            break;
        case "熔铸":
            for(var i = 0; i < imgData.height * imgData.width; i++) {
                var r = imgData.data[i*4],
                    g = imgData.data[i*4+1],
                    b = imgData.data[i*4+2];

                var newR = r * 128 / (g + b + 1);
                var newG = g * 128 / (r + b + 1);
                var newB = b * 128 / (g + r + 1);
                var rgbArr = [newR, newG, newB].map((e) => {
                    return e < 0 ? 0 : e > 255 ? 255 : e;
                });
                [imgData.data[i*4], imgData.data[i*4+1], imgData.data[i*4+2]] = rgbArr;
            }
            break;
        case "冰冻":
            for(var i = 0; i < imgData.height * imgData.width; i++) {
                var r = imgData.data[i*4],
                    g = imgData.data[i*4+1],
                    b = imgData.data[i*4+2];

                var newR = (r - g -b) * 3 /2;
                var newG = (g - r -b) * 3 /2;
                var newB = (b - g -r) * 3 /2;
                var rgbArr = [newR, newG, newB].map((e) => {
                    return e < 0 ? 0 : e > 255 ? 255 : e;
                });
                [imgData.data[i*4], imgData.data[i*4+1], imgData.data[i*4+2]] = rgbArr;
            }
            break;
        case "连环画":
            for(var i = 0; i < imgData.height * imgData.width; i++) {
                var r = imgData.data[i*4],
                    g = imgData.data[i*4+1],
                    b = imgData.data[i*4+2];

                var newR = Math.abs(g - b + g + r) * r / 256;
                var newG = Math.abs(b -g + b + r) * r / 256;
                var newB =  Math.abs(b -g + b + r) * g / 256;
                var rgbArr = [newR, newG, newB];
                [imgData.data[i*4], imgData.data[i*4+1], imgData.data[i*4+2]] = rgbArr;
            }
            break;
        case "褐色":
            for (var i = 0; i < imgData.height * imgData.width; i++) {
                var r = imgData.data[i * 4],
                    g = imgData.data[i * 4 + 1],
                    b = imgData.data[i * 4 + 2];

                var newR = r * 0.393 + g * 0.769 + b * 0.189;
                var newG = r * 0.349 + g * 0.686 + b * 0.168;
                var newB =  r * 0.272 + g * 0.534 + b * 0.131;
                var rgbArr = [newR, newG, newB];
                [imgData.data[i * 4], imgData.data[i * 4 + 1], imgData.data[i * 4 + 2]] = rgbArr;
            }
            break;
        case  "复古":
            var d = imageData.data;
            for (var i = 0; i < d.length; i += 4) {
                var r = d[i];
                var g = d[i + 1];
                var b = d[i + 2];
                d[i] = (r * 0.393)+(g * 0.769)+(b * 0.189);

            }
            break;
        case  "浮雕":
            var w = imageData.width, h = imageData.height;
            for (var i=h; i>0; i--) {  // 行
                for (var j=w; j>0; j--) {  // 列
                    for (var k=0; k<3; k++) {
                        var num = (i*w + j)*4 + k;
                        var numUp = ((i-1)*w+j)*4 + k;
                        var numDown = ((i+1)*w+j)*4 + k;
                        data[num] = data[num]-data[numUp-4]+128;
                    }
                }
            }
            break;
        case "雾化":
            var w = imageData.width,h = imageData.height;
            for (var i=h; i>0; i--) {  // 行
                for (var j=w; j>0; j--) {  // 列
                    var num = (i*w + j)*4;
                    if (Math.random()<0.5) {
                        data[num] = 255;
                        data[num+1] = 255;
                        data[num+2] = 255;
                    }
                }
            }
            break;
        case "毛玻璃":
            var w = imgData.width, h = imgData.height;

            for ( var i = 0; i < h; i++) {
                for ( var j = 0; j < w; j++) {
                    for (var k = 0; k<3; k++) {
                        // Index of the pixel in the array
                        var num = (i*w + j) * 4 + k;

                        var rand = Math.floor(Math.random()*10)%3;
                        var num2 = ((i+rand)*w + (j+rand)) * 4 + k;

                        data[num] = data[num2]
                    }
                }
            }
            break;
        case "马赛克":
            function mosaic(mosaic,size){
            var w = imageData.width, h = imageData.height;
            var data = imageData.data;

            for(var i=1; i<h-1; i+=size){
                for(var j=1; j<w-1; j+=size){

                    var num = (i*w + j) * 4;
                    for (var dx=0; dx<size; dx++) {
                        for (var dy=0; dy<size; dy++) {
                            var x = i + dx;
                            var y = j + dy;
                            var p1 = (x*w + y)*4;

                            data[p1+0] = data[num+0];
                            data[p1+1] = data[num+1];
                            data[p1+2] = data[num+2];
                        }
                    }
                }
            }
        }
            mosaic(mosaic,6)
            break;
    }
    ctx.putImageData(imgData,0,0)
}
