"use strict";

var alert = {
  type: 'info',
  text: '',
  autoclose: false,
  success: function success(text) {
    var autoclose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.type = 'success';
    this.text = text;
    this.autoclose = autoclose;
    this.showAlert();
  },
  danger: function danger(text) {
    var autoclose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.type = 'danger';
    this.text = text;
    this.autoclose = autoclose;
    this.showAlert();
  },
  showAlert: function showAlert() {
    var _this = this;

    var html = "\n        <div class=\"".concat(this.type, "\" id=\"alert\">\n            <p>").concat(this.text, "</p>\n            ").concat(this.autoclose === false ? "<button type=\"button\" onclick=\"alert.closeAlert()\">&times</button>" : '', "\n        </div>");

    if (document.getElementById("alert") !== null) {
      this.closeAlert();
    }

    document.querySelector("body").insertAdjacentHTML('afterbegin', html);

    if (this.autoclose) {
      setTimeout(function () {
        _this.closeAlert();
      }, 3000);
    }
  },
  closeAlert: function closeAlert() {
    document.getElementById("alert").remove();
  }
};