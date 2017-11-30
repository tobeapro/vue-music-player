<template lang="pug">
  div(id="home",class="home")
    div(class="home-default",v-if="musicList.length===0",ref="home")
      div(class="home-text") Welcome
      canvas(:width="homeWidth",:height="homeHeight",ref="myCanvas")
    ul(class="music-ul",v-if="musicList.length!==0")
      li(v-for="(value,index) in musicList",class="music-li",@click="playMusic(value)")
        span(v-text="index+1",class="music-li-index")
        span(class="music-li-img")
          img(:src="value.img")
        span(v-text="value.name",class="music-li-name")
        span(v-text="value.singer",class="music-li-singer")
</template>

<script>
  import qs from 'qs'
  export default{
    name: 'home',
    data () {
     return {
       musicUrl: '',
       homeWidth: document.body.clientWidth,
       homeHeight: document.body.clientHeight - 152,
       ballNum: 16,
       ballTime: 20,
       ballRadius: 6,
       ballSpeed: 6,
       balls: [],
       colors: ['#46dede', '#1ec864', '#ee1482', '#2b235e', '#ffc864', '#40c381', '#050bfa', '#64fa64', '#00ffff', '#ffc300']
     }
    },
    mounted () {
      if (this.musicList.length !== 0) {
        return
      } else {
        window.onresize = () => {
          return (() => {
            this.homeWidth = document.body.clientWidth
            this.homeHeight = document.body.clientHeight - 152
          })()
        }
        this.actionBall()
      }
    },
    watch: {
      homeWidth (val) {
        this.homeWidth = val
      },
      homeHeight (val) {
        this.homeHeight = val
      }
    },
    computed: {
      myCanvas () {
         return this.$refs.myCanvas
      },
      musicList () {
        return this.$store.state.audio.searchMusicList
      }
    },
    methods: {
      actionBall () {
        this.drawBall(this.myCanvas)
        setInterval(() => {
          this.animateBall(this.myCanvas)
        }, this.ballTime)
      },
      createBall (w, h, colors, radius, speed) {
        let obj = {}
        obj.x = Math.random() * w
        obj.y = Math.random() * h
        obj.color = colors[Math.floor(Math.random() * colors.length)]
        obj.radius = Math.floor(Math.random() * radius + radius)
        obj.Vx = Math.floor(2 * Math.random() * speed - speed) === 0 ? speed : Math.floor(2 * Math.random() * speed - speed)
        obj.Vy = Math.floor(2 * Math.random() * speed - speed) === 0 ? speed : Math.floor(2 * Math.random() * speed - speed)
        return obj
      },
      drawBall (el) {
        this.balls = []
        for (let i = 0; i < this.ballNum; i++) {
          this.balls.push(new this.createBall(this.homeWidth, this.homeHeight, this.colors, this.ballRadius, this.ballSpeed))
        }
        let ele = el.getContext('2d')
        ele.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
        for (let i = 0; i < this.balls.length; i++) {
          ele.beginPath()
          ele.fillStyle = this.balls[i].color
          ele.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, 2 * Math.PI)
          ele.fill()
          ele.closePath()
        }
      },
      animateBall (el) {
        let ele = el.getContext('2d')
        ele.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
        for (let i = 0; i < this.balls.length; i++) {
          this.balls[i].x += this.balls[i].Vx
          this.balls[i].y += this.balls[i].Vy
          this.balls[i].x < 0 || this.balls[i].x > this.myCanvas.width ? this.balls[i].Vx = -this.balls[i].Vx : this.balls[i].Vx = this.balls[i].Vx
          this.balls[i].y < 0 || this.balls[i].y > this.myCanvas.height ? this.balls[i].Vy = -this.balls[i].Vy : this.balls[i].Vy = this.balls[i].Vy
          ele.beginPath()
          ele.fillStyle = this.balls[i].color
          ele.arc(this.balls[i].x + this.balls[i].Vx, this.balls[i].y + this.balls[i].Vy, this.balls[i].radius, 0, 2 * Math.PI)
          ele.fill()
          ele.closePath()
        }
      },
      playMusic (val) {
        this.$store.state.audio.audioElement.setAttribute('src', val.url)
        this.$store.dispatch('play_newMusic', val)
        this.$axios.post('/db/musicList/save', qs.stringify(val))
          .then(res => {
            if (res.status === 200) {
              console.log('添加成功')
            }
            if (res.status === 202) {
              console.log('已存在')
            }
            if (res.status === 500) {
              console.log('添加失败')
            }
          })
          .catch(res => {
            console.log(res)
          })
//        window.localStorage.setItem('musicList', JSON.stringify(this.$store.state.audio.musicList))
      }
    }
  }
</script>

<style lang="scss">
  .home {
    position:fixed;
    top:102px;
    left:0;
    right:0;
    bottom:50px;
    overflow-y:auto;
    background:url("../../static/bg2.png") center -30px no-repeat;
    .home-default{
      position:relative;
      height:100%;
      font-size:30px;
      font-weight:bold;
      text-align:center;
      background:#fff;
      overflow:hidden;
      .home-text{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      }
    }
    .music-ul {
      border-top:1px solid #ccc;
      border-bottom:2px solid #dc0000;
      .music-li {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        &:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }
        &:hover {
          color: #fff;
          background: #2d8cf0;
          transition: .6s;
          img {
            opacity: 1 !important;
          }
        }
        .music-li-index {
          display: inline-block;
          vertical-align: top;
          flex: 1;
          text-align: center;
        }
        .music-li-img {
          display: inline-block;
          flex: 2;
          img {
            width: 40px;
            height: 40px;
            opacity: .8;
          }
        }
        .music-li-name {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
        .music-li-singer {
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 8;
        }
      }
    }
    .ivu-page{
      padding-left:40px;
      padding-top:6px;
    }
  }
</style>
