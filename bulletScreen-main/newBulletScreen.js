(function () {
    class ShowBullet {
        style(bullet_ele, speed, startTop, zIndex) {
            const bullet_wrap_width = $('#players').width()
            const bullet_ele_height = $(bullet_ele).outerHeight()
            const bullet_ele_width = $(bullet_ele).outerWidth()
            const top = this.getRandom(startTop, 4) * bullet_ele_height + 40
            const transitionEvent = this.whichTransitionEvent();
            $(bullet_ele).css({
                top: top,
                transition: `all ${speed}s linear`,
                transform: `translateX(-${bullet_ele_width}px)`,
                zIndex: zIndex
            })
            transitionEvent && bullet_ele.on(transitionEvent, function () {
                bullet_ele.remove();
            });
        }
        //随机获取高度
        getRandom(start, end) {
            var lineSun = Math.floor((end - start))
            return Math.floor(Math.random() * lineSun + start);
        }
        // 兼容性回调,判断transtion是否执行完成
        whichTransitionEvent() {
            var t,
                el = document.createElement('surface'),
                transitions = {
                    'transition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'MozTransition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd'
                }
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }
    }

    // 文字弹幕
    class TextBullet extends ShowBullet {
        constructor(item) {
            super()
            this.content = item.ct // 文字内容
            this.textBullet = item
            this.textColor = ''

            this.createEle()
        }
        createEle() {
            const speed = this.getSpeend(this.content)
            const text_bullet = $(`<div class="text_bullet">${this.content}</div>`)
            const player_width = $('#players').outerWidth()
            let bColor = 'transparent';
            let danColor = ''
            if (this.textBullet.isself == 1) {
                bColor = '#ffb93b';
            }
            if (this.textBullet.guard_type != 0) { // 守护弹幕字体颜色
                danColor = '#FFB93B'
            } else if (this.textBullet.vip_type == 1) { // 会员弹幕字体颜色
                danColor = 'red'
            } else { // 普通用户弹幕字体颜色
                danColor = '#ffffff'
            }
            $('#players').append(text_bullet)
            text_bullet.css({
                color: danColor,
                border: `1px solid ${bColor}`,
                transform: `translateX(${player_width}px)`,
                textShadow: '#000 0 0 1px, #000 0 0 1px, #000 0 0 1px'
            })
            this.style(text_bullet, speed, 0, 1)
        }
        // 普通弹幕飘屏时间
        // msg 弹幕内容
        //  算法  一个字符飘屏时间为15s 每多一个字符减少0.3s
        //  @returns {速度}
        getSpeend(msg) {
            const length = msg.length;//弹幕字符长度
            const defaultTime = 15; //单字符时间
            const DchangeTime = 0.3;//变化时间
            return defaultTime - (length - 1) * DchangeTime;
        }
    }

    // 坐骑飘窗
    class VehicleBullet extends ShowBullet {
        constructor(item) {
            super()
            this.car_swf = item.car_swf // 坐骑背景
            this.car_words = item.car_words // 坐骑内容
            this.car_bgc = item.car_bgc //坐骑背景
            this.user_nicename = item.user_nicename //用户名

            this.createEle()
        }
        createEle() {
            const speed = 10
            const player_width = $('#players').outerWidth()
            let vehicleHtml = $(`<div class="vehicle" style="background:url(${this.car_bgc}) 100% 100%/100% 100% no-repeat">
                                    <div class="vehicle-wrap">
                                        <img src="${this.car_swf}" alt="">
                                    </div>
                                    <span class="user-name">${this.user_nicename}</span>
                                    <span>骑着${this.car_words}驾临直播间！</span>
                                </div>`);
            $('#players').append(vehicleHtml)
            vehicleHtml.css("transform", `translateX(${player_width}px)`);
            this.style(vehicleHtml, speed, 1, 10)
        }
    }

    // 礼物飘窗
    class GiftBullet extends ShowBullet {
        constructor(item, element) {
            super()
            this.item = item
            this.element = element
            // 礼物属性
            this.giftProperty = {
                time: null, // 定时器
                judgeTimeStop: true //是否在连击时间内
            }
            this.judgeGiftType()
        }
        judgeGiftType() {
            // 将礼物数量变为一个数组
            const numArr = this.item.giftnum.toString().split('')
            const player_width = $('#players').outerWidth()
            let danmu = $(`<div class="gift-danmu" style="background:url(${this.element.comboscreen_pcimg}) 100% 100%/100% 100% no-repeat"></div>`);
            let giftHtml = ''
            let numHtml = ''
            let speed = this.element.comboscreen_time
            let zIndex = 0

            numArr.forEach((ele) => {
                numHtml += `<div class="gift-num"><img src="/public/new/image/show/bulletScreen/${ele}.png" alt=""></div>`
            })
            if (this.element.type == 1) {
                giftHtml = this.creatLuxuryGiftEle(numHtml)
                zIndex = 15
            } else {
                giftHtml = this.creatCommonGiftEle(numHtml)
                zIndex = 5
            }
            danmu.html(giftHtml)
            $('#players').append(danmu)
            danmu.css("transform", `translateX(${player_width}px)`);
            this.style(danmu, speed, 1, zIndex)
        }
        // 创建普通礼物
        creatCommonGiftEle(numHtml) {
            const giftHtml = `<span class="user-name">${this.item.uname}</span>
                            <span class="send">送出</span>
                            <span>${this.element.giftname}</span>
                            <div class="gift-img-wrap">
                                <div class="gift-img">
                                    <img src="${this.element.gifticon}" alt="">
                                </div>
                            </div>
                            <div class="ride"><img src="/public/new/image/show/bulletScreen/ride.png" alt=""></div>
                            <div class="gift-num-wrap">
                                ${numHtml}
                            </div>`
            return giftHtml
        }
        // 创建豪华礼物
        creatLuxuryGiftEle(numHtml) {
            const giftHtml = `<div class="user-img">
                                    <img src="${this.item.uhead}" alt="">
                                </div>
                                <div >
                                    <div class="user-name">${this.item.uname}</div>
                                    <div>
                                        <span class="send">送出</span>
                                        <span>${this.element.giftname}</span>
                                    </div>
                                </div>
                                <div class="gift-img-wrap">
                                    <div class="gift-img">
                                        <img src="${this.element.gifticon}" alt="">
                                    </div>
                                </div>
                                <div class="ride"><img src="/public/new/image/show/bulletScreen/ride.png" alt=""></div>
                                <div class="gift-num-wrap">
                                    ${numHtml}
                                </div>`
            return giftHtml
        }

    }
    // 全平台通知
    class PlatformBullet extends ShowBullet {
        constructor(item) {
            super()
            this.item = item
            this.creatEle()
        }
        creatEle() {
            const speed = this.item.allscreen_time
            const player_width = $('#players').outerWidth()
            let PlatformBulletHtml = $(`<div class="platform-bullet" style="background:url(${this.item.giftbg}) 100% 100%/100% 100% no-repeat">
                                            <div class="gift-img-wrap"><img src="${this.item.giftimg}" alt=""></div>
                                            <div class="give-msg">
                                                <span class="active-msg">${this.item.sendname}</span>
                                                <span>在</span>
                                                <span class="active-msg">${this.item.toname}</span>
                                                <span>的直播间送出</span>
                                                <span class="active-msg">${this.item.giftname}</span>
                                                <span class="active-msg">X</span>
                                                <span class="active-msg">${this.item.giftnums}</span>
                                            </div>
                                            <a href="${this.item.roomnum}" class="to-live" target="_blank">
                                                <div>去围观</div>
                                            </a>
                                        </div>`)
            $('#players').append(PlatformBulletHtml)
            PlatformBulletHtml.css("transform", `translateX(${player_width}px)`);
            this.style(PlatformBulletHtml, speed, 1, 15)
        }
    }

    // 判断礼物是否达到飘屏条件
    const judgeGiftEvent = {
        giftProperty: {
            time: null, // 定时器
            judgeTimeStop: true //是否在连击时间内
        },
        // 判断是否连击
        judgeDoubleHandle(item) {
            clearTimeout(this.giftProperty.time)
            // this.giftProperty.giftid 是否为第一次送礼  
            // this.giftProperty.judgeTimeStop 是否还在连击状态
            // this.giftProperty.giftid == item.giftid &&  this.giftProperty.uid == item.uid 上次送礼的是否为同一个人和同一件礼物

            if (this.giftProperty.giftid && this.giftProperty.judgeTimeStop && this.giftProperty.giftid == item.giftid && this.giftProperty.uid == item.uid) {
                this.giftProperty.giftnum += item.giftnum
                this.giftProperty.time = setTimeout(() => {
                    this.judgeChatShowDoubleHit()
                    this.judgeGiftFlutter()
                }, 3000)
            } else {
                this.judgeChatShowDoubleHit()
                this.judgeGiftFlutter()
                this.giftProperty = {
                    judgeTimeStop: true,
                    ...item
                }
                this.giftProperty.time = setTimeout(() => {
                    this.judgeChatShowDoubleHit()
                    this.judgeGiftFlutter()
                }, 3000)
            }
        },
        // 判断是否达到飘屏条件
        judgeGiftFlutter() {
            _DATA.gifts.forEach(element => {
                if (element.id == this.giftProperty.giftid) {
                    if (element.comboscreen_num <= this.giftProperty.giftnum && element.comboscreen_num != 0) {
                        // 达到飘屏数量
                        new GiftBullet(this.giftProperty, element)
                    }
                    if (element.allscreen_num <= this.giftProperty.giftnum && element.allscreen_num != 0) {
                        // 达到全平台通知数量
                        if (_DATA.user && _DATA.user.id == this.giftProperty.uid) {
                            let msg = {
                                retcode: "000000",
                                retmsg: "ok",
                                msg: [
                                    {
                                        _method_: "Giftsystem",
                                        senduid: this.giftProperty.uid,
                                        touid: this.giftProperty.roomnum,
                                        giftimg: element.gifticon,
                                        sendname: this.giftProperty.uname,
                                        toname: this.giftProperty.anchor_name,
                                        giftnums: this.giftProperty.giftnum,
                                        roomnum: this.giftProperty.roomnum,
                                        giftbg: element.allscreen_img,
                                        giftname: element.giftname,
                                        allscreen_time:element.allscreen_time
                                    }
                                ]
                            }
                            Socket.emitData('systemadmin', JSON.stringify(msg));
                        }
                    }
                    this.giftProperty = {}
                }
            });
        },
        // 判断是否在聊天框展示连击
        judgeChatShowDoubleHit() {
            _DATA.gifts.forEach(element => {
                if (element.id == this.giftProperty.giftid) {
                    if (element.comboshow_num <= this.giftProperty.giftnum && element.comboshow_num != 0) {
                        if (_DATA.user && _DATA.user.id == this.giftProperty.uid) {
                            let msg = {
                                retcode: "000000",
                                retmsg: "ok",
                                msg: [
                                    {
                                        _method_: "GiftEndNotice",
                                        senduid: this.giftProperty.uid,
                                        touid: this.giftProperty.roomnum,
                                        giftimg: element.gifticon,
                                        sendname: this.giftProperty.uname,
                                        toname: this.giftProperty.anchor_name,
                                        giftnums: this.giftProperty.giftnum,
                                        roomnum: this.giftProperty.roomnum,
                                        giftbg: element.allscreen_img,
                                        giftname: element.giftname,
                                        comboscreen_appimg: element.comboscreen_appimg,
                                        comboshow_num: element.comboshow_num,
                                        comboscreen_num: element.comboscreen_num
                                        
                                    }
                                ]
                            }
                            Socket.emitData('broadcast', JSON.stringify(msg));
                        }
                    }
                }
            })
        }
    }

    const bulletScreen = {
        TextBullet: TextBullet,
        VehicleBullet: VehicleBullet,
        GiftBullet: GiftBullet,
        PlatformBullet: PlatformBullet,
        judgeGiftEvent: judgeGiftEvent
    }
    window.bulletScreen = bulletScreen
})()



