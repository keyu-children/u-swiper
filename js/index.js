let vm = new Vue({
    el: "#index",
    data() {
        return {
            title: "index",
            current: 0,
            banner: [
                {
                    id:0,
                    picurl:'https://pics.lvjs.com.cn/pics/super/2019/08/1564713770_94290.jpg'
                },
                {
                    id:1,
                    picurl:'https://pics.lvjs.com.cn/pics/super/2019/07/1562064573_85348.jpg'
                },
                {
                    id:2,
                    picurl:'https://pics.lvjs.com.cn/pics/super/2019/05/1558348575_68295.jpg'
                }
           ]
        }
    },
    mounted() {
        this.getBanner();
    },
    methods: {
        //ajax 获取轮播
        getBanner() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/banner.php');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // console.log(xhr)
                    if (xhr.status === 200) {
                        let obj = xhr.response;
                        obj = JSON.parse(obj);
                        this.banner = obj.list;
                        console.log(xhr.statusText);
                    } else {
                        console.log(xhr.statusText);
                        //alert(xhr.statusText)
                    }
                }
            }
            xhr.send();
        },
        //点击圆点切换事件
        dotOpt(item, index) {
            console.log(item,index)
        },
        //点击图片跳转事件
        toDetails(item) {
            console.log(item);
        },
        //点击轮播事件
        toBanner(item, index) {
            console.log(item,index)
        }
    }
}) 