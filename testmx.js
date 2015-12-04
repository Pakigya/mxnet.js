var mx = require("./mxnet_predict.js");
var pre = require("./mxnet_preproc_node.js");
var model = require("./model/inception-bn-model.json");
var cat_encoded = require("./data/cat.base64.json");

var decoded = new Float32Array(mx.base64Decode(cat_encoded).buffer);
var cat = mx.ndarray(decoded, [1, 3, 224, 224]);
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
