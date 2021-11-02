$(
    function () {
        $('#link_reg').on('click', function () {
            $('.login-box').hide()
            $('.reg-box').show()
        })

        $('#link_login').on('click', function () {
            $('.login-box').show()
            $('.reg-box').hide()
        })

        var form = layui.form
        var layer = layui.layer
        form.verify({
            pwd: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            repwd: function (value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return ('两次密码不一致')
                }
            }
        })

        $('#form-reg').on('submit', function (e) {
            e.preventDefault()
            var data = {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            }
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: data,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    $('#link_login').click()
                }
            })
            // $.post('http://api-breakingnews-web.itheima.net/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
            //     if (res.status !== 0) {
            //         return console.log(res.message);
            //     }
            //     console.log(res.message);
            // })
        })

        $('#form_login').on('submit', function (e) {
            e.preventDefault()
            var data = $(this).serialize()
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: data,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    localStorage.setItem('token', res.token)
                    // console.log(res.token);
                    location.href = '/index.html'
                }
            })
        })
    }
)

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE4NjcsInVzZXJuYW1lIjoiY2hlbmZnIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MzU4MTg1NTcsImV4cCI6MTYzNTg1NDU1N30.PHgc6PhZElw6gc2TijGcFwVpcUu4DM1MJwuutCRKomg