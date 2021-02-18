
(function (params) {
    class style {

    }

    // 公共方法
    class Together {
        constructor(params) {
            this.params = params
            this.element = $(`<div></div>`)
            this.time = null

            this.remove()
        }

        remove() {
            this.time = setTimeout((params) => {
                this.element.remove()
            }, this.params.time)
        }

        clearTiem() {
            clearTimeout(this.time)
            this.time = setTimeout(() => {
                this.element.remove()
            }, this.params.time)
        }
    }

    // 坐骑
    class Mount extends Together {
        constructor(params) {
            super(params)
            this.params = params
            this.type = params.type
            this.user = params.user
            this.create()
        }
        create() {
            this.element.attr('type', this.type)
            this.element.attr('user', this.user)
            this.element.append('坐骑')
            const warp = $('#wrap')
            warp.append(this.element)
        }
    }

    // 普通礼物
    class Common extends Together {
        create() {
            this.element.prop('type', '1')
            this.element.prop('user', '45255')

            const ele = `<div type="1" user="45255">ele</div>`
            this.element.append(ele)
            const warp = $('#wrap')
            warp.append(this.element)
        }
    }

    // 会员礼物
    class VIP extends Together {
        create() {
            this.element.append('坐骑')
            const warp = $('#wrap')
            warp.append(this.element)
        }
    }

    // 豪华礼物
    class Luxury extends Together {
        create() {
            this.element.append('坐骑')
            const warp = $('#wrap')
            warp.append(this.element)
        }
    }

    // 判断是否连击
    function isDouble(params) {
        const child = $('#wrap').children()
        let doubleEle = null
        child.each(function (index, domEle) {
            const type = $(domEle).attr('type')
            const user = $(domEle).attr('user')
            if (params.type == type && params.user == user) {
                doubleEle = domEle
            }
        })
        return doubleEle
    }

    // 筛选
    function filtration(params) {
        if (isDouble(params)) {
            const doubleEle = $(isDouble(params))
            doubleEle.text('doubleEle')
        } else {
            switch(params.type){
                case '1': // 坐骑
                    new Mount(params)
                    break
                case '2': // 普通礼物
                    new Common(params)
                    break
                case '3': // vip礼物
                    new VIP(params)
                    break
                case '4': // 豪华礼物
                    new Luxury(params)
                    break
            }
        }
    }
    window.filtration = filtration
})()

const mount = {
    type: "1", 
    user: '45255', 
    time: 6000
}

const common = {
    type: "2", 
    user: '45255', 
    time: 3000
}

const vip = {
    type: "3", 
    user: '45255', 
    time: 4000
}
const luxury = {
    type: "4", 
    user: '45255', 
    time: 8000
}

$('button').click(function (params) {
    filtration(mount)
})
