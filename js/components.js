/* 轮播 by keyu-children 2019-08-21 */
Vue.component('u-swiper', {
    data() {
        return {
            current: 0,
            downX: 0 //按下那一点的x坐标
        }
    },
    props: {
        duration: {
            type: String,
            default: 3000 //毫秒
        },
        auto_play: {
            type: Boolean,
            default: true
        },
        index: {
            type: String,
            default: 0
        },
        height: {
            type: String,
            default: 200
        },
        title: {
            type: String,
        },
        list: {
            type: Object,
            default: []
        },
        bg_type: {
            type: String,
            default: "contain"
        },
        is_slide: {
            type: Boolean,
            default: true
        }
    },
    template: `
                <div class="u-swiper-box">
                    <div class="u-swiper-img" :style="{height:resetSwiper.height}" ref="uSwiperImg">
                        <div v-for="(item,index) in list"
                            @click="tod(item,index)"
                            @touchstart="mouseDownStart"
                            @touchend="mouseUpEnd"
                            :class="{active:current == index}" 
                            :key="item" 
                            :style="{
                                        width:resetSwiper.width,
                                        position:resetSwiper.position,
                                        top:resetSwiper.top,
                                        height:resetSwiper.height,
                                        backgroundSize:resetSwiper.backgroundSize,
                                        backgroundImage:'url(' + item.picurl + ')',
                                        backgroundRepeat:'no-repeat',
                                        backgroundPosition:'top center',
                                 }"
                        >
                        </div>
                    </div>
                    <div class="u-swiper-control">
                        <div class="prev fa" @click="control('prev')" v-show="btn_control.is_prev" :style="{height:btn_control.height}"></div>
                        <div class="next fa" @click="control('next')" v-show="btn_control.is_next" :style="{height:btn_control.height}"></div>
                    </div>
                    <div class="u-swiper-itemcnt">
                        <div class="u-swiper-item" v-for="(item,index) in list">
                            <span :class="{active:current == index}" @click="handleClick(item,index)"></span>
                        </div>
                    </div>
                </div>
                `,
    mounted() {
        this.current = this.index;
        if (this.auto_play == true) {
            console.log("自动播放模式")
            this.autoPlay();
        } else {
            console.log("！自动播放模式")
        }
    },
    methods: {
        mouseUpEnd(e) {
            //is_slide == true 开启滑动功能
            if (this.is_slide == true) {
                let pageX = e.changedTouches[0].pageX;
                //记录用户按下去哪一点的坐标，如果比哪一点的x坐标小，就是左滑，大就是右滑动
                if (this.downX > pageX) {
                    this.current++;
                    //如果滑倒了最后一张，在滑就显示第一张
                    if (this.current > this.list.length - 1) {
                        this.current = 0;
                    }
                } else {
                    //如果向右滑到了第一张，在滑就显示最后一张
                    this.current--;
                    if (this.current < 0) {
                        this.current = this.list.length - 1;
                    }
                }
            } else {
                return false;
            }
        },
        mouseDownStart(e) {
            if (this.is_slide == true) {
                e.stopPropagation();
                //鼠标按下 记录按下点的x坐标
                if (e.touches.length == 1) {
                    this.downX = e.changedTouches[0].pageX;
                }
            } else {
                return false;
            }

        },
        control(type) {
            if (type == 'prev') {
                this.current--;
            } else {
                this.current++;
            }
        },
        tod(item, index) {
            index = this.current;
            item = this.list[index];
            this.$emit('handleimg', item, index)
        },
        handleClick(item, index) {
            //注册click事件 不要用驼峰 我被坑了一下的
            this.current = index; //设置点击的小圆点对象为当前选中状态
            this.$emit('handleclick', item, index);
        },
        //自动播放方法
        autoPlay() {
            //console.log(this.current, this.list.length);
            let timer = null;
            if (this.current > this.list.length - 1) {
                // clearTimeout(timer)
                this.current = 0;
                this.autoPlay();
            } else {
                timer = setTimeout(() => {
                    this.current++;
                    this.autoPlay();
                }, this.duration)
            }
        }
    },
    computed: {
        //上一张下一张按钮控制
        btn_control() {
            let is_prev = true; //为true为显示
            let is_next = true;
            this.current == 0 ? is_prev = false : true;
            this.current == this.list.length - 1 ? is_next = false : true;
            return {
                height: this.height + 'px',
                is_next,
                is_prev
            }
        },
        resetSwiper() {
            let obj = {
                position: "absolute",
                top: 0 + 'px',
                width: "100%",
                height: this.height + 'px',
                backgroundColor: this.bg_color,
                backgroundRepeat: "no-repeat",
                backgroundSize: this.bg_type
            }
            return obj
        }
    }

})
