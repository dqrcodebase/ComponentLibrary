
(function (params) {
    const showNum = 4
    let showArr = []
    let awaitArr = []

    // 公共方法
    class Together {
        constructor(params) {
            this.params = params
            this.type = params.type
            this.user = params.user
            this.name = params.name
            this.giftId = params.giftId
            this.giftType = params.giftType
            this.element = $(`<div type="${params.type}" user="${params.user}"></div>`)
            this.time = null
        }

        remove() {
            this.time = setTimeout(() => {
              console.log(showArr)
                this.element.remove()
                showArr.forEach((ele,index,arr) => {
                  if(ele.giftId == this.giftId && this.user == ele.user){
                    console.log(index)
                    arr.splice(index,1)
                  }
                })
                if(awaitArr.length > 0) {
                  console.log(awaitArr)
                  filtration(awaitArr.shift())
                }
            }, this.params.time)
        }

        clearTime() {
            clearTimeout(this.time)
            this.remove()
        }
    }

    // 坐骑
    class Mount extends Together {
        constructor(params) {
            super(params)
            this.params = params
            this.create()
            this.remove()
        }
        create() {
            const ele = `${this.params.name}`
            this.element.append(ele)
            const warp = $('#wrap')
            warp.append(this.element)
        }

    }

    // 普通礼物
    class Common extends Together {
      constructor(params) {
            super(params)
            this.params = params
            this.num = params.num
            this.create()
            this.remove()

        }
        create() {
            const ele = `<span>${this.params.name}</span>
                        <span class="num">${this.params.num}</span>
                        <span>${this.params.giftType}</span>`
            this.element.append(ele)
            const warp = $('#wrap')
            this.element.clearTime = this.clearTime
            warp.append(this.element)
        }
        changeNum(params) {
          this.num += params.num
          this.element.children('.num').eq(0).text(this.num)
        }
    }

    // 会员礼物
    class VIP extends Together {
      constructor(params) {
            super(params)
            this.params = params
            this.num = params.num
            this.create()
            this.remove()

        }
        create() {
            const ele = `<span>${this.params.name}</span>
                        <span class="num">${this.params.num}</span>
                        <span>${this.params.giftType}</span>`
            this.element.append(ele)
            const warp = $('#wrap')
            warp.append(this.element)
        }
        changeNum(params) {
          this.num += params.num
          this.element.children('.num').eq(0).text(this.num)
        }
    }

    // 豪华礼物
    class Luxury extends Together {
      constructor(params) {
            super(params)
            this.params = params
            this.num = params.num
            this.create()
            this.remove()

        }
        create() {
            const ele = `<span>${this.params.name}</span>
                        <span class="num">${this.params.num}</span>
                        <span>${this.params.giftType}</span>`
            this.element.append(ele)
            const warp = $('#wrap')
            warp.append(this.element)
        }
        changeNum(params) {
          this.num += params.num
          this.element.children('.num').eq(0).text(this.num)
        }
    }

    // 判断是否连击
    function isDouble(params) {
      let doubleEle = null
      showArr.forEach((ele) => {
        if (params.giftType == ele.giftType && params.type == ele.type && params.user == ele.user) {
                ele.clearTime()
                ele.changeNum(params)
                doubleEle = ele
            }
      })
        return doubleEle
    }

    // 筛选
    function filtration(params) {
      
        if (isDouble(params)) {
          return
        } else if(showArr.length < showNum){
            
            switch(params.type){
                case '1': // 坐骑
                    showArr.push(new Mount(params))
                    break
                case '2': // 普通礼物
                    showArr.push(new Common(params))
                    break
                case '3': // vip礼物
                    showArr.push(new VIP(params))
                    break
                case '4': // 豪华礼物
                    showArr.push(new Luxury(params))
                    break
            }
        }else{
          awaitArr.push(params)
        }
    }
    window.filtration = filtration
})()

const mount1 = {
    type: "1", 
    user: '45255', 
    name:'mount',
    giftType:'1',
    giftId:'1',
    time: 6000
}

const mount2 = {
    type: "1", 
    user: '45255', 
    name:'mount',
    giftType:'2',
    giftId:'2',
    time: 6000
}
const mount3 = {
    type: "1", 
    user: '45255', 
    name:'mount',
    giftType:'3',
    giftId:'3',
    time: 6000
}
const mount4 = {
    type: "1", 
    user: '45255', 
    name:'mount',
    giftType:'4',
    giftId:'4',
    time: 6000
}

const common1 = {
    type: "2", 
    user: '45255', 
    name:'common',
    time: 7000,
    giftType:'1',
    giftId:'5',
    num: 4
}

const common2 = {
    type: "2", 
    user: '45255', 
    name:'common',
    time: 7000,
    giftType:'2',
    giftId:'6',
    num: 4
}

const common3 = {
    type: "2", 
    user: '45255', 
    name:'common',
    time: 7000,
    giftType:'3',
    giftId:'7',
    num: 4
}

const vip1 = {
    type: "3", 
    user: '45255', 
    name:'vip',
    time: 4000,
    giftType:'1',
    giftId:'8',
    num: 5
}

const vip2 = {
    type: "3", 
    user: '45255', 
    name:'vip',
    time: 4000,
    giftType:'2',
    giftId:'9',
    num: 5
}

const vip3 = {
    type: "3", 
    user: '45255', 
    name:'vip',
    time: 4000,
    giftType:'3',
    giftId:'10',
    num: 5
}

const luxury1 = {
    type: "4", 
    user: '45255', 
    name:'luxury',
    time: 8000,
    giftType:'1',
    giftId:'11',
    num: 3
}

const luxury2 = {
    type: "4", 
    user: '45255', 
    name:'luxury',
    time: 8000,
    giftType:'2',
    giftId:'12',
    num: 3
}
const luxury3 = {
    type: "4", 
    user: '45255', 
    name:'luxury',
    time: 8000,
    giftType:'3',
    giftId:'13',
    num: 3
}
$('#mount1').click(function (params) {
    filtration(mount1)
})

$('#mount2').click(function (params) {
    filtration(mount2)
})

$('#mount3').click(function (params) {
    filtration(mount3)
})
$('#mount4').click(function (params) {
    filtration(mount4)
})
$('#common1').click(function (params) {
    filtration(common1)
})
$('#common2').click(function (params) {
    filtration(common2)
})
$('#common3').click(function (params) {
    filtration(common3)
})
$('#vip1').click(function (params) {
    filtration(vip1)
})
$('#vip2').click(function (params) {
    filtration(vip2)
})
$('#vip3').click(function (params) {
    filtration(vip3)
})
$('#luxury1').click(function (params) {
    filtration(luxury1)
})
$('#luxury2').click(function (params) {
    filtration(luxury2)
})
$('#luxury3').click(function (params) {
    filtration(luxury3)
})
