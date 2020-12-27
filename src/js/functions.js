$(function () {
    // console.log(99);
    var _body = $("body");


    _body.on('keyup keydown click', '#password', function (e) {
        var _this = $(this);
        var _val = _this.val();
        var _input = $("#input").trigger("click");

        if ($.trim(_val))
            _input.removeAttr("disabled");
        else
            _input.attr("disabled", 1);

    });


    _body.on('keyup keydown click', '#input', function (e) {
        var _this = $(this);
        var _val = _this.val();
        var _password = $('#password').val();
        var _output = $("#output");
        var _test = $("#test");

        if (!$.trim(_val)) {
            _output.html("");
            _test.html("");
            return;
        }

        if (!$.trim(_password)) {
            _this.attr("disabled", 1);
            return;
        }



        // xipEncode(_val);
        var encode = xipEncode(_val, _password);
        _output.html(encode);
        _test.html(xipDecode(encode, _password));
        // console.log(xipDecode(encode));


        // console.log(_password);
        // console.log(_val);


    });








    _body.on('click', '#show-password', function (e) {
        var _this = $(this);
        var _password = $('#password');

        if (_password.hasClass('show-password')) {

            _this.find('.show').show();
            _this.find('.hide').hide();


            _password
                .attr('type', 'password')
                .removeClass('show-password');
        } else {


            _this.find('.show').hide();
            _this.find('.hide').show();

            _password
                .attr('type', 'text')
                .addClass('show-password');
        }





    });




    _body.on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });

});


function xipEncode(_val, _password, _repeat) {
    if (!_val || !_password) return;
    _repeat = _repeat || ".";

    var _array = _val.split("");
    var _passArray = _password.split("");



    var _return = "";
    var passIndex = 0;
    var passIndexReverse = (_passArray.length) - 1;


    for (var index = 0; index < _array.length; index++) {
        if (passIndex >= _passArray.length) passIndex = 0;
        if (passIndexReverse < 0) passIndexReverse = (_passArray.length) - 1;

        // console.log(_array[index].charCodeAt());
        // console.log(String.fromCharCode(_array[index].charCodeAt()));



        // console.log(_array[index].charCodeAt());
        // console.log(_passArray[passIndex]);
        // console.log((_array[index].charCodeAt()) * 1 + _passArray[passIndex]);

        // console.log(typeof _array[index].charCodeAt());
        // console.log(typeof _passArray[passIndex]);

        // _return += parseInt(_array[index].charCodeAt()) + parseInt(_passArray[passIndex]);

        _return += (_array[index].charCodeAt() + _passArray[passIndex].charCodeAt() + _passArray[passIndexReverse].charCodeAt());


        // console.log(_array[index].charCodeAt());
        // console.log(_passArray[passIndex].charCodeAt());
        // console.log(_passArray[passIndexReverse].charCodeAt());
        /* 
                var _encoded = _array[index].charCodeAt();
                _encoded += _passArray[passIndex].charCodeAt();
                _encoded += _passArray[passIndexReverse].charCodeAt();
                // console.log(_encoded);

                _return += _encoded;
         */


        _return += _repeat;



        // console.log(_passArray[passIndex]);



        passIndex++;
        passIndexReverse--;
    }


    return _return.replace(/\.$/gi, '');
}


function xipDecode(_val, _password, _repeat) {
    if (!_val || !_password) return;
    _repeat = _repeat || ".";
    // console.log(_val.match(/[0-9]+\./g));

    var _array = _val.split(_repeat);
    var _passArray = _password.split("");


    var _return = "";
    var passIndex = 0;
    var passIndexReverse = (_passArray.length) - 1;

    for (var index = 0; index < _array.length; index++) {
        if (passIndex >= _passArray.length) passIndex = 0;
        if (passIndexReverse < 0) passIndexReverse = (_passArray.length) - 1;
        // console.log(_array[index].charCodeAt());
        // console.log(String.fromCharCode(_array[index].charCodeAt()));
        // _return += String.fromCharCode(1 * (_array[index] - _passArray[passIndex]));
        _return += String.fromCharCode(1 * (_array[index] - _passArray[passIndex].charCodeAt() - _passArray[passIndexReverse].charCodeAt()));
        // _return += String.fromCharCode(parseInt((_array[index]) - parseInt(_passArray[passIndex])));

        // console.log(_passArray[passIndex]);

        passIndex++;
        passIndexReverse--;
    }


    return _return;
}