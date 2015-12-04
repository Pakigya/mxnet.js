var mx = require("./mxnet_predict.js");
var model = require("./model/inception-bn-model.json");
var cat_encoded = require("./data/cat.base64.json");
console.log(cat_encoded.length);
var decode = mx.base64Decode(cat_encoded);
var decoded = new Float32Array(decode.buffer);
console.log("hh");
var cat = mx.ndarray(decoded, [1, 3, 224, 224]);
console.log("hh");
pred = new mx.Predictor(model, {'data': [1, 3, 224, 224]});
pred.setinput('data', cat);
pred.forward();
out = pred.output(0);
max_index = 0;
for (var i = 0; i < out.data.length; ++i) {
  if (out.data[max_index] < out.data[i]) max_index = i;
}
console.log('Top-1: ' + model.synset[max_index] + ', value=' + out.data[max_index]);
pred.destroy();
